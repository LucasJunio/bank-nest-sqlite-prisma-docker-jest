import { transactionSchema } from '../transaction/transaction.schema';

export class currentAccountSchema {
  id: number;
  total: number;
  createdAt: Date;
  custumerId: number;
}

export class basicInfoSchema {
  name: string;
  surname: string;
  balance: number;
  transactions: transactionSchema[];
}
