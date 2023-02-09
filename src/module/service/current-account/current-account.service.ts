import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { currentAccountInput } from '../../input/current-account/current-account.input';
import { CurrentAccountRepository } from '../../repository/current-account/current-account.repository';
import { basicInfoSchema, currentAccountSchema } from '../../schema/current-account/current-account.schema';
import { CustumerService } from '../custumer/custumer.service';
import { TransactionService } from '../transaction/transaction.service';

@Injectable()
export class CurrentAccountService {
  constructor(
    private readonly currentAccountRepository: CurrentAccountRepository,
    private readonly custumerService: CustumerService,
    @Inject(forwardRef(() => TransactionService))
    private readonly transactionService: TransactionService,
  ) {}

  public async create(params: currentAccountInput): Promise<currentAccountSchema> {
    const data = this.checkInitialCredit(params);
    const { id, createdAt, custumerId } = await this.currentAccountRepository.create(data);
    const { value: total } = await this.transactionService.create({
      currentAccountId: id,
      value: params.initialCredit,
    });
    return { id, total, custumerId, createdAt };
  }

  public async update(data: currentAccountInput): Promise<currentAccountSchema> {
    return this.currentAccountRepository.update(data);
  }

  public async findOne(id: number): Promise<currentAccountSchema> {
    return this.currentAccountRepository.findOne(id);
  }

  public async basicInfo(accountId: number): Promise<basicInfoSchema> {
    // const { total: balance, custumerId } = this.findOne(accountId);
    // const { name, surname } = this.custumerService.findOne(custumerId);
    // const transactions = this.transactionService.findAll(accountId);
    // return { name, surname, balance, transactions };
    return;
  }

  private checkInitialCredit(params: currentAccountInput): currentAccountInput {
    const { initialCredit, ...data } = params;
    // TODO: throw error for negative initialCredit
    if (initialCredit < 0) {
    }
    return data;
  }
}
