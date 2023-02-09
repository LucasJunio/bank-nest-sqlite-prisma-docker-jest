import { PrismaClient } from '@prisma/client';
import { currentAccountInput } from '../../input/current-account/current-account.input';
import { currentAccountSchema } from '../../schema/current-account/current-account.schema';

const prisma = new PrismaClient();

export class CurrentAccountRepository {
  public async create(data: currentAccountInput): Promise<currentAccountSchema> {
    return prisma.currentAccount.create({ data });
  }
}
