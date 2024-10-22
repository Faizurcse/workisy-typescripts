import { Request } from 'express';
export interface TokenPayload {
  userId?: string;
}
export interface RequestWithPayload extends Request {
  payload?: TokenPayload;
}
