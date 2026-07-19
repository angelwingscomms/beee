export interface User {
  s: 'u';
  e: string;    // email (unique identifier across products)
  p?: string;   // bcrypt password hash (null for Google-only users)
  n?: string;   // display name
  pic?: string; // Google profile picture URL
  ph?: string;  // phone number
  c?: string[]; // classifications: 'fab' (partner), 'rpb' (player)
  ac?: string;  // partner code (sqids)
  ba?: string;  // bank account number
  bn?: string;  // bank name
  bk?: string;  // bank code
  d: number;    // date joined (Date.now())
}
