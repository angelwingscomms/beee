export interface Payout {
  s: 'po';
  reg_id: string;
  partner_id: string;
  ac: string;
  amt: number;
  ref?: string;
  tr?: string;
  d: number;
  st: 'r' | 's' | 'f' | 'p' | 'b' | 'v'; // r=pending, s=success, f=failed, p=processing, b=blocked_self, v=reversed
  at?: number; // retry attempt count
  err?: string;
}
