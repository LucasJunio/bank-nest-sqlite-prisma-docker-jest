export class transactionSchema {
  id?: number;
  currentAccountId: number;
  createdAt: Date;
  value: number;
  type: string;
}
