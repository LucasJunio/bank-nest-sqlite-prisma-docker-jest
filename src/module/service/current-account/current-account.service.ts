import { Injectable } from '@nestjs/common';
import { currentAccountInput } from '../../input/current-account/current-account.input';
import { CurrentAccountRepository } from '../../repository/current-account/current-account.repository';
import { currentAccountSchema } from '../../schema/current-account/current-account.schema';

@Injectable()
export class CurrentAccountService {
  constructor(private readonly currentAccountRepository: CurrentAccountRepository) {}
  public async create(params: currentAccountInput): Promise<currentAccountSchema> {
    const data = this.checkInitialCredit(params);
    return await this.currentAccountRepository.create(data);
  }

  private checkInitialCredit(params: currentAccountInput): currentAccountInput {
    const { initialCredit, ...data } = params;
    data.total = initialCredit !== 0 ? initialCredit : 0;
    return data;
  }
}
