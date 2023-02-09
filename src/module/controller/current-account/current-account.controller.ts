import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { currentAccountInput } from '../../input/current-account/current-account.input';
import { basicInfoSchema, currentAccountSchema } from '../../schema/current-account/current-account.schema';
import { CurrentAccountService } from '../../service/current-account/current-account.service';

@ApiTags('current-account')
@Controller('current-account')
export class CurrentAccountController {
  constructor(private readonly currentAccountService: CurrentAccountService) {}

  @Post('/')
  public async create(@Body() body: currentAccountInput): Promise<currentAccountSchema> {
    return this.currentAccountService.create(body);
  }

  @Get('/basic-info/:accountId')
  @ApiParam({ name: 'accountId', type: 'number', description: '1' })
  public async findAccountBasicInfo(@Param() params): Promise<basicInfoSchema> {
    return this.currentAccountService.basicInfo(params.accountId);
  }
}
