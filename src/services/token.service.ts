import { NextFunction, Response } from 'express';
import createHttpError from 'http-errors';
import JWT from 'jsonwebtoken';
import { JWT_ACCESS_KEY, JWT_AT_EXPIRY, JWT_REFRESH_KEY, JWT_RT_EXPIRY } from '../config';
import { RequestWithPayload, TokenPayload } from '../interface/shared/request.interface';
import { ErrorResponse } from '../utils/common';
import { logger } from '../utils/logger';

class TokenService {
  secret = JWT_ACCESS_KEY;
  refreshSecret = JWT_REFRESH_KEY;
  public async signAccessToken(userId: any): Promise<string> {
    try {
      const payload = {
        userId: userId,
      };
      const options = {
        expiresIn: JWT_AT_EXPIRY || '1d',
        issuer: 'workisy',
      };
      const token = JWT.sign(payload, this.secret, options);
      return token;
    } catch (error) {
      console.error(error);
      logger.error(error);
    }
  }
  public async signRefreshToken(userId: any): Promise<string> {
    try {
      const payload = {
        userId: userId,
      };
      const options = {
        expiresIn: JWT_RT_EXPIRY || '7d',
        issuer: 'workisy',
      };
      const token = JWT.sign(payload, this.refreshSecret, options);
      return token;
    } catch (error) {
      console.error(error);
      logger.error(error);
    }
  }

  public verifyAccessToken() {
    return (req: RequestWithPayload, res: Response, next: NextFunction) => {
      if (!req.headers['authorization']) return ErrorResponse(res, 401, 'Unauthorized');
      const authHeader = req.headers['authorization'];
      const bearerToken = authHeader.split(' ');
      const token = bearerToken[1];
      JWT.verify(token, this.secret, (err: any, payload: TokenPayload) => {
        if (err) {
          const message = err.name === 'TokenExpiredError' ? 'Session Expired' : err.message;
          next(new createHttpError.Unauthorized(message!));
        }
        req.payload = payload;
        next();
      });
    };
  }
  public async verifyRefreshToken(token: string): Promise<TokenPayload> {
    return new Promise(async (resolve, reject) => {
      try {
        JWT.verify(token, this.refreshSecret, (err: any, payload: TokenPayload) => {
          if (err) {
            const message = err.name === 'TokenExpiredError' ? 'Session Expired' : err?.message || 'Unauthorized';
            return reject(new createHttpError.Unauthorized(message));
          }
          return resolve(payload);
        });
      } catch (error) {
        return reject(new Error('Unauthorized'));
      }
    });
  }
}

export default TokenService;
