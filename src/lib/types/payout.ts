export interface Payout {
  s: 'po';
  reg_id: string;
  aff_id: string;
  ac: string;
  amt: number;
  ref?: string;
  tr?: string;
  d: number;
  st: 'pending' | 'success' | 'failed';
  err?: string;
}
