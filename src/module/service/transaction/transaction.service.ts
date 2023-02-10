import { BadRequestException, forwardRef, Inject, Injectable } from '@nestjs/common';
import { transactionInput } from 'src/module/input/transaction/transaction.input';
import { TransactionRepository } from 'src/module/repository/transaction/transaction.repository';
import { transactionSchema } from 'src/module/schema/transaction/transaction.schema';
import { CurrentAccountService } from '../current-account/current-account.service';

@Injectable()
export class TransactionService {
  constructor(
    private readonly transactionRepository: TransactionRepository,
    @Inject(forwardRef(() => CurrentAccountService))
    private readonly currentAccountService: CurrentAccountService,
  ) {}

  public async create(params: transactionInput): Promise<transactionSchema> {
    const { value, currentAccountId } = params;
    if (value === 0) throw new BadRequestException('Cannot make a transaction with value equal zero (0).');
    const type = this.typeTransaction(value);
    let { total } = await this.currentAccountService.findOne(currentAccountId);
    await this.currentAccountService.update({ id: currentAccountId, total: total + value });
    return await this.transactionRepository.create({ type, ...params });
  }

  public async findAll(accountId: number): Promise<transactionSchema[]> {
    return await this.transactionRepository.findAll(accountId);
  }

  private typeTransaction(value: number): string {
    if (value > 0) return 'CREDIT';
    if (value < 0) return 'DEBIT';
  }
}
