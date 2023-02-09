import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { currentAccountInput } from '../../input/current-account/current-account.input';
import { currentAccountSchema } from '../../schema/current-account/current-account.schema';
import { CurrentAccountService } from '../../service/current-account/current-account.service';

@ApiTags('current-account')
@Controller('current-account')
export class CurrentAccountController {
  constructor(private readonly currentAccountService: CurrentAccountService) {}

  @Post('/')
  public async create(@Body() body: currentAccountInput): Promise<currentAccountSchema> {
    return this.currentAccountService.create(body);
  }
}
