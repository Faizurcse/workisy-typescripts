import { Router } from 'express';
import AuthController from './auth.controller';
import { Routes } from '../../interface/shared/routes.interface';
import { ApiV1 } from '../../utils/variable';

import TokenService from '../../services/token.service';

class AuthRoute implements Routes {
  public path = '/auth';
  public admin = '/admin';
  public router = Router();
  public authController = new AuthController();
  public tokenService = new TokenService();
  constructor() {
    this.initializeRoutes();
  }
  // admin
  private initializeRoutes() {
    this.router.post(
      `${ApiV1}${this.admin}${this.path}/login`,
      this.authController.adminLogin,
    );
    this.router.post(`${ApiV1}${this.admin}${this.path}/signup`, this.authController.adminSignup);

    //user
  }
}
export default AuthRoute;
