import { CurrentAccountController } from './controller/current-account/current-account.controller';
import { CustumerController } from './controller/custumer/custumer.controller';
import { TransactionController } from './controller/transaction/transaction.controller';
import { CurrentAccountRepository } from './repository/current-account/current-account.repository';
import { CustumerRepository } from './repository/custumer/custumer.repository';
import { TransactionRepository } from './repository/transaction/transaction.repository';
import { CurrentAccountService } from './service/current-account/current-account.service';
import { CustumerService } from './service/custumer/custumer.service';
import { TransactionService } from './service/transaction/transaction.service';

export const controllers = [TransactionController, CurrentAccountController, CustumerController];
export const services = [CurrentAccountService, TransactionService, CustumerService];
export const repositories = [CurrentAccountRepository, CustumerRepository, TransactionRepository];
