import { Transaction } from './transaction.object';

export interface Tcsa {
  id: number;
  accountName: string;
  collectionName: string;
  terminalDate: string;
  accountNumber: string;
  transactions: Transaction[];
}
