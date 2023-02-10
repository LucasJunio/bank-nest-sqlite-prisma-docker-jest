import { BadRequestException, forwardRef, Inject, Injectable } from '@nestjs/common';
import { currentAccountInput } from '../../input/current-account/current-account.input';
import { CurrentAccountRepository } from '../../repository/current-account/current-account.repository';
import { basicInfoSchema, currentAccountSchema } from '../../schema/current-account/current-account.schema';
import { createAccountValidation } from '../../validators/current-account';
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
    const { error } = await createAccountValidation.validate(params);
    if (error) throw new BadRequestException(error.message);
    const data = this.checkInitialCredit(params);
    const { id, createdAt, custumerId } = await this.currentAccountRepository.create(data);
    const { value: total } =
      params.initialCredit !== 0
        ? await this.transactionService.create({
            currentAccountId: id,
            value: params.initialCredit,
          })
        : { value: 0 };

    return { id, total, custumerId, createdAt };
  }

  public async update(data: currentAccountInput): Promise<currentAccountSchema> {
    return this.currentAccountRepository.update(data);
  }

  public async findOne(id: number): Promise<currentAccountSchema> {
    return this.currentAccountRepository.findOne(id);
  }

  public async basicInfo(accountId: number): Promise<basicInfoSchema> {
    const { total: balance, custumerId } = await this.findOne(accountId);
    const { name, surname } = await this.custumerService.findOne(custumerId);
    const transactions = await this.transactionService.findAll(accountId);
    return { name, surname, balance, transactions };
  }

  private checkInitialCredit(params: currentAccountInput): currentAccountInput {
    const { initialCredit, ...data } = params;
    if (initialCredit < 0) throw new BadRequestException('Cannot create a account with initial credit equal zero (0).');
    return data;
  }
}
