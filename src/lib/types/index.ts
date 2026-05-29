export interface User {
  s: string; // type/tenant (e.g., 'u' user, 'se' session, 'm' message, 'n' notif sub)
  t: string; // tag
  p: string; // password hash
  e: string; // email
}