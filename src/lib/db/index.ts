// All Qdrant operations must use wait: true

import { collection, default_user_fields } from '$lib/constants';
import type { User } from '$lib/types';
import { embed } from '$lib/util/embed';
import { get_qdrant } from '$lib/db/get_qdrant';

// ponytail: inlined former $lib/util/new_id shim (was one line of randomUUID).
export const new_id = (): string => crypto.randomUUID();

export type PayloadFilter = Record<string, unknown>;

export async function getfirst<T>(
  filters: PayloadFilter
): Promise<T | null> {
  const results = await search_by_payload<T>(
    filters,
    [],
    1
  );
  if (results.length > 0) {
    return results[0];
  }
  return null;
}

// Utility functions

export const set = async (
  id: string,
  payload: Record<string, unknown>
) => {
  const q = await get_qdrant();
  await q.setPayload(collection, {
    wait: true,
    payload,
    points: [id]
  });
};

// Database operations wrapper
export async function edit_point<
  T extends Record<string, unknown>
>(i: string, data: T): Promise<T & { i: string }> {
  const vector = new Array(3072).fill(0);
  const q = await get_qdrant();

  await q.setPayload(collection, {
    points: [i],
    payload: data,
    wait: true
  });

  await q.updateVectors(collection, {
    points: [{ id: i, vector }]
  });

  return { ...data, i };
}

export async function create<T extends { s: string }>(
  payload: T,
  string_to_embed?: string,
  i?: string
): Promise<string> {
  const id = i || new_id();

  let vector: number[] = [];

  if (string_to_embed) {
    vector = await embed(string_to_embed, false);
  } else {
    vector = new Array(3072).fill(0);
  }

  const q = await get_qdrant();
  await q.upsert(collection, {
    points: [
      {
        id,
        payload,
        vector
      }
    ],
    wait: true
  });

  return id;
}

export const format_filter = (
  must?:
    | Record<string, unknown>
    | Array<Record<string, unknown>>,
  must_not?:
    | Record<string, unknown>
    | Array<Record<string, unknown>>
) => {
  const normalize = (
    input?:
      | Record<string, unknown>
      | Array<Record<string, unknown>>
  ) => {
    if (!input) return undefined;
    if (Array.isArray(input)) return input;
    return Object.entries(input)
      .filter(
        ([, v]) =>
          v !== undefined && v !== null && v !== ''
      )
      .map(([k, v]) => {
        if (typeof v === 'object' && v !== null) {
          const o = v as Record<string, unknown>;
          if (
            'match' in o ||
            'range' in o ||
            'in' in o ||
            'is_null' in o ||
            'has_id' in o
          ) {
            return { key: k, ...(o as object) };
          }
        }
        return { key: k, match: { value: v } };
      });
  };

  const result: Record<string, unknown> = {};
  const m = normalize(must);
  if (m && m.length) result.must = m;
  const mn = normalize(must_not);
  if (mn && mn.length) result.must_not = mn;
  return result;
};

export async function count(
  filter: PayloadFilter
): Promise<number> {
  try {
    const q = await get_qdrant();
    const result = await q.count(collection, {
      filter: format_filter(filter),
      exact: true
    });
    return result.count;
  } catch (error) {
    console.error('Error in count:', error);
    console.error('arg:', filter);
    throw error;
  }
}

export async function search_by_payload<T>(
  filter: PayloadFilter,
  with_payload?: string[] | boolean,
  limit?: number,
  order_by?: string | Record<string, string>
): Promise<T[]> {
  const actual_limit = limit || 144;
  try {
    let results;
    const q = await get_qdrant();

    // If ordering is requested, use search with a dummy vector
    // Otherwise, use scroll for better performance
    if (order_by) {
      // Create a dummy vector for payload-only search
      const dummyVector = new Array(3072).fill(0);
      const orderByObj =
        typeof order_by === 'string'
          ? { key: order_by }
          : order_by;

      results = await q.search(collection, {
        vector: dummyVector,
        limit: actual_limit,
        with_payload,
        filter: format_filter(filter),
        with_vector: false,
        ...(orderByObj && { order_by: orderByObj })
      });
    } else {
      results = await q.scroll(collection, {
        filter: format_filter(filter),
        limit: actual_limit,
        with_payload,
        with_vector: false
      });
    }

    // console.debug('search_by_payload results', results);

    // Handle both search and scroll result formats
    const points =
      'points' in results ? results.points : results;
    return points.map((point) => ({
      ...(point.payload as T),
      i: point.id
    }));
  } catch (error) {
    console.error(
      'Error in search_by_payload:',
      error
    );
    console.error(
      'arg:',
      filter,
      with_payload,
      limit,
      order_by
    );
    throw error;
  }
}

export async function search_by_vector<T>({
  vector,
  limit = 54,
  with_payload,
  filter,
  with_vector = false
}: {
  vector: number[];
  with_payload?: string[];
  limit?: number;
  filter?: {
    must: Record<string, unknown>;
    must_not?: Record<string, unknown>;
  };
  with_vector?: boolean;
}): Promise<T[]> {
  const searchParams: Record<string, unknown> = {
    vector,
    limit,
    with_payload,
    with_vector
  };

  if (filter) {
    searchParams.filter = format_filter(
      filter.must,
      filter.must_not
    );
  }
  const q = await get_qdrant();
  const results = await q.search(
    collection,
    searchParams as {
      vector:
        | number[]
        | { name: string; vector: number[] };
      limit?: number;
      with_payload?: boolean | string[];
      with_vector?: boolean;
      filter?: Record<string, unknown>;
    }
  );

  return results.map((point) => {
    const result: any = {
      ...(point.payload as T),
      i: point.id,
      score: point.score
    };
    if (with_vector && point.vector) {
      result.vector = point.vector;
    }
    return result;
  });
}

export async function get<T>(
  id: string,
  payload?: string[] | string | boolean,
  with_vector?: boolean
): Promise<T | null> {
  try {
    const q = await get_qdrant();
    const result = await q.retrieve(collection, {
      ids: [id],
      with_payload:
        typeof payload === 'string'
          ? [payload]
          : payload,
      with_vector
    });
    if (payload === 'ps' && result.length > 0) {
      const psList = result[0].payload
        ?.ps as unknown as PushSubscription[];
      if (psList && Array.isArray(psList)) {
        const now = Date.now();
        const expiredCount = psList.filter((s) => {
          const exp = (s as any).expirationTime;
          return (
            typeof exp === 'number' &&
            exp > 0 &&
            exp < now
          );
        }).length;
      }
    }

    if (result.length > 0) {
      const res = result[0].payload as T & {
        vector: number[];
      };
      if (
        with_vector &&
        Array.isArray(result[0].vector)
      ) {
        res.vector = result[0]
          .vector as unknown as number[];
      } else if (
        payload &&
        result[0].payload &&
        typeof payload === 'string'
      ) {
        return result[0].payload[payload] as T;
      }
      return res;
    }
    return null;
  } catch {
    return null;
  }
}

export async function delete_by_id(
  id: string
): Promise<void> {
  const q = await get_qdrant();
  await q.delete(collection, {
    points: [id],
    wait: true
  });
}

export async function update_point<T>(
  id: string,
  data: Partial<T>
): Promise<void> {
  const existing = await get<T>(id);
  if (!existing) {
    throw new Error('Document not found');
  }

  await edit_point(id, { ...existing, ...data });
}

export const exists = async (
  i: string
): Promise<boolean> => {
  return !!(await get(i, []));
};

// Get username from their ID
export async function get_username_from_id(
  userId: string
): Promise<string> {
  const user = await get<{ u?: string }>(userId);

  if (user && user.u) {
    return user.u;
  }

  // If user not found, return Unknown User
  return 'Unknown User';
}

export const find_user_by_tag = async (t: string) => {
  return (
    await search_by_payload<User>({ s: 'u', t }, default_user_fields)
  )[0];
};

export const find_user_by_email = async (
  e: string
) => {
  return (
    await search_by_payload<User>({ s: 'u', e })
  )[0];
};

export async function find_or_create_player_user(email: string, name: string, password_hash?: string, phones?: string[]): Promise<string> {
  console.log(`[find_or_create_player_user] START email=${email} name="${name}" has_password_hash=${!!password_hash}`);
  const existing = await find_user_by_email(email) as (User & { i: string }) | undefined;
  if (existing) {
    console.log(`[find_or_create_player_user] Existing user found id=${existing.i} classifications=${JSON.stringify(existing.c || [])}`);
    const c = existing.c?.includes('rpb') ? existing.c : [...(existing.c || []), 'rpb'];
    // ponytail: backfill the parent phone from the registration the first time we see it.
    const patch: Partial<User> = { c, e: existing.e, s: 'u' };
    if (phones?.length && !existing.ph?.length) patch.ph = phones;
    await edit_point(existing.i, patch);
    console.log(`[find_or_create_player_user] END (reused) id=${existing.i}`);
    return existing.i;
  }
  const user_id = new_id();
  console.log(`[find_or_create_player_user] No existing user , creating new player id=${user_id} c=['rpb'] password_set=${!!password_hash}`);
  const u: User = { s: 'u', e: email, d: Date.now(), c: ['rpb'] };
  if (password_hash) u.p = password_hash;
  if (phones?.length) u.ph = phones;
  await create(u, undefined, user_id);
  console.log(`[find_or_create_player_user] END (created) id=${user_id}`);
  return user_id;
}

export const delete_ = async (
  id: string
): Promise<void> => {
  const q = await get_qdrant();
  await q.delete(collection, {
    wait: true,
    points: [id]
  });
};
