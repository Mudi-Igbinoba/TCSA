export interface Transaction {
  id: number;
  senderName: string;
  transactionDate: Date | string;
  status: string;
  narration: string;
}
