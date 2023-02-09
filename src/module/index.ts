import { CurrentAccountController } from './controller/current-account/current-account.controller';
import { TransactionController } from './controller/transaction/transaction.controller';
import { CurrentAccountRepository } from './repository/current-account/current-account.repository';
import { CurrentAccountService } from './service/current-account/current-account.service';
import { TransactionService } from './service/transaction/transaction.service';

export const controllers = [TransactionController, CurrentAccountController];
export const services = [TransactionService, CurrentAccountService];
export const repositories = [CurrentAccountRepository];
