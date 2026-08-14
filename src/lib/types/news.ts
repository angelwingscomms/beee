export interface LedgerRow {
  p: string;      // left column: place number, or a category label
  n: string;      // player name, with any FIDE title
  c: string;      // three-letter country code
  v: string;      // score
  w?: boolean;    // marks the one highlighted row
}

export interface FactRow {
  l: string;      // label
  v: string;      // value
}

export type NewsBlock =
  | { k: 'p'; t: string }
  | { k: 'h'; t: string }
  | { k: 'q'; t: string; a: string }
  | { k: 'l'; t: string; r: LedgerRow[] }
  | { k: 'n'; n: string; d: string; t: string }
  | { k: 'f'; r: FactRow[] };

export interface NewsSource {
  t: string;      // source title
  u: string;      // source url
}

export interface NewsPost {
  s: string;      // slug
  t: string;      // headline
  k: string;      // kicker
  x: string;      // dek
  m: string;      // meta description
  d: string;      // published date, ISO yyyy-mm-dd
  a: string;      // byline
  r: number;      // read minutes
  b: NewsBlock[]; // body
  o: NewsSource[];
  u?: string;     // hero image path
}
