import { NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';

export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log({
      message: `Requete reçue: ${req.method} on ${req.url}`,
      date: new Date(),
      data: req.body,
    });
    next();
  }
}
