import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
@Injectable()
export class ErrorMiddlewareMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction, err?: any) {
    console.error(err); // Log the error for debugging purposes

    const statusCode = err?.status || 500;
    const message = err?.message || 'Internal server error';

    res.status(statusCode).json({
      message,
      statusCode,
    });
  }
}
