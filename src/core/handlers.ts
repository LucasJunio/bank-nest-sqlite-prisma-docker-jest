import { HttpStatus, Res } from '@nestjs/common';
import { Response } from 'express';

export class Handlers {
  public static onSuccess(@Res() res: Response, data: any): Response {
    return res.status(HttpStatus.OK).json(data);
  }

  public static onCreate(@Res() res: Response, data: any): Response {
    return res.status(HttpStatus.CREATED).json(data);
  }

  public static onError(@Res() res: Response, err: any): Response {
    const { name, message, stack, status } = err;
    if (status) {
      return res.status(status).json({ name, message, stack });
    } else {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ name, message, stack });
    }
  }
}

export default new Handlers();
