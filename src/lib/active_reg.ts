// Pure helper: pick which registration is "active" for a parent account.
// `reg_ids` are the parent's paid registration point ids (in display order).
// `stored` is the id persisted in localStorage (may be stale/foreign/empty).
// Returns the stored id if still valid, else the first paid reg, else ''.
export function resolve_active_reg(reg_ids: string[], stored: string | null | undefined): string {
	const ids = reg_ids.filter(Boolean);
	if (stored && ids.includes(stored)) return stored;
	return ids[0] ?? '';
}
