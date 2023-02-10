import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { Handlers } from 'src/core/handlers';
import { currentAccountInput } from '../../input/current-account/current-account.input';
import { CurrentAccountService } from '../../service/current-account/current-account.service';

@ApiTags('current-account')
@Controller('current-account')
export class CurrentAccountController {
  constructor(private readonly currentAccountService: CurrentAccountService) {}

  @Post('/')
  @ApiBody({ type: currentAccountInput })
  public async create(@Res() res: Response, @Body() body: currentAccountInput): Promise<Response> {
    try {
      const data = await this.currentAccountService.create(body);
      return Handlers.onCreate(res, data);
    } catch (error) {
      return Handlers.onError(res, error);
    }
  }

  @Get('/basic-info/:accountId')
  @ApiParam({ name: 'accountId', type: 'number', description: '1' })
  public async findAccountBasicInfo(@Res() res: Response, @Param() params): Promise<Response> {
    try {
      const data = await this.currentAccountService.basicInfo(parseInt(params.accountId));
      return Handlers.onSuccess(res, data);
    } catch (error) {
      return Handlers.onError(res, error);
    }
  }
}
