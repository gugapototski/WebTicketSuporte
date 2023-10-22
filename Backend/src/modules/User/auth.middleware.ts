import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException('Token não fornecido');
    }

    jwt.verify(token, 'secretpassword', (err, decoded) => {
      if (err) {
        throw new UnauthorizedException('Token inválido');
      } else {
        next();
      }
    });
  }
}
