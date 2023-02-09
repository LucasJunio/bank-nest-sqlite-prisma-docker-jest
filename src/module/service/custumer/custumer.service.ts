import { Injectable } from '@nestjs/common';
import { CustumerRepository } from 'src/module/repository/custumer/custumer.repository';
import { custumerSchema } from 'src/module/schema/custumer/custumer.schema';

@Injectable()
export class CustumerService {
  constructor(private readonly custumerRepository: CustumerRepository) {}

  public async findOne(id: number): Promise<custumerSchema> {
    return await this.custumerRepository.findOne(id);
  }
}
