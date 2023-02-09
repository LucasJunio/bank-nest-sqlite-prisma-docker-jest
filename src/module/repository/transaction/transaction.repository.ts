import { PrismaClient } from '@prisma/client';
import { transactionInput } from 'src/module/input/transaction/transaction.input';
import { transactionSchema } from 'src/module/schema/transaction/transaction.schema';

const prisma = new PrismaClient();

export class TransactionRepository {
  public async create(data: transactionInput): Promise<transactionSchema> {
    return await prisma.transaction.create({ data });
  }
  public async findAll(currentAccountId: number): Promise<transactionSchema[]> {
    return await prisma.transaction.findMany({
      where: {
        currentAccountId,
      },
    });
  }
}
