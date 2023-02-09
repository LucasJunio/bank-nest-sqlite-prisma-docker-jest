import { PrismaClient } from '@prisma/client';
import { currentAccountInput } from '../../input/current-account/current-account.input';
import { currentAccountSchema } from '../../schema/current-account/current-account.schema';

const prisma = new PrismaClient();

export class CurrentAccountRepository {
  public async create(data: currentAccountInput): Promise<currentAccountSchema> {
    return await prisma.currentAccount.create({ data });
  }

  public async update(data: currentAccountInput): Promise<currentAccountSchema> {
    const { id, total, custumerId } = data;
    return await prisma.currentAccount.update({
      where: {
        id,
      },
      data: {
        custumerId,
        total,
      },
    });
  }

  public async findOne(id: number): Promise<currentAccountSchema> {
    return await prisma.currentAccount.findUnique({
      where: {
        id,
      },
    });
  }
}
