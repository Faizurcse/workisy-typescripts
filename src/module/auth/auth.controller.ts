import { NextFunction, Request, Response } from 'express';
import AuthService from './auth.service';
import { CheckErrors, ErrorValidations, DataResponse } from '../../utils/common';
import { ApiMessage } from '../../utils/messages';
// import TokenService from '../../services/token.service';

class AuthController {
  private authService = new AuthService();
  // private tokenService = new TokenService();
  public adminLogin = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let checkErrorExist = CheckErrors(req);
      if (checkErrorExist) return ErrorValidations(res, req, 422);
      const data = await this.authService.adminLogin(req.body);
      DataResponse(req, res, 200, ApiMessage.success, data);
    } catch (error) {
      next(error);
    }
  };
  public adminSignup = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let checkErrorExist = CheckErrors(req);
      if (checkErrorExist) return ErrorValidations(res, req, 422);
      const data = await this.authService.adminSignup(req.body);
      DataResponse(req, res, 200, ApiMessage.success, data);
    } catch (error) {
      next(error);
    }
  };
}

export default AuthController;
