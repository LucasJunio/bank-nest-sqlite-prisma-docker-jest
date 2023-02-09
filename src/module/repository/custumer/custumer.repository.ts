import { PrismaClient } from '@prisma/client';
import { custumerSchema } from 'src/module/schema/custumer/custumer.schema';

const prisma = new PrismaClient();

export class CustumerRepository {
  public async findOne(id: number): Promise<custumerSchema> {
    return await prisma.custumer.findUnique({
      where: {
        id,
      },
    });
  }
}
