import { Injectable } from '@nestjs/common';
import { custumerSchema } from 'src/module/schema/custumer/custumer.schema';
import { CustumerRepository } from '../../repository/custumer/custumer.repository';

@Injectable()
export class CustumerService {
  constructor(private readonly custumerRepository: CustumerRepository) {}

  public async findOne(id: number): Promise<custumerSchema> {
    return await this.custumerRepository.findOne(id);
  }
}
