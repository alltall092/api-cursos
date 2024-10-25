import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req:Request, res:Response, next:NextFunction) {

    const token = req.headers.authorization?.split('Bearer ')[1]; // Extract token from Authorization header
    if (token) {
      try {
        const decoded = jwt.verify(token, 'webtoken', { algorithms: ['HS512'] }); // Verify token using secret key and algorithm
        req['user'] = decoded; // Attach decoded user information to the request object
        next(); // Proceed to the next middleware or route handler
      } catch (error) {
        res.status(401).json({ message: 'Invalid token' }); // Return 401 Unauthorized if token is invalid
      }
    } else {
      res.status(401).json({ message: 'Unauthorized' }); // Return 401 Unauthorized if no token is provided
    }
  }
}
