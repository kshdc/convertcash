export interface Transaction {
  id: number;
  user_id: number;
  payment_type: string;
  payment_codes: string;
  payment_date: string;
  payment_status: string;
  payment_value: number;
  final_amount: number;
  receiver_address: string;
  payment_method: 'crypto' | 'paypal';
  crypto_type?: string;
}

export interface StatusUpdateResponse {
  message: string;
  xpAdded: number;
  newRank: string | null;
}