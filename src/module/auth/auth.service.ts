import { compare, genSaltSync, hashSync } from 'bcrypt';
import createHttpError from 'http-errors';
import { Admin } from '../../interface/admin.interface';
import AdminSchema from '../../models/admin.model';
import TokenService from '../../services/token.service';
import { ApiMessage } from '../../utils/messages';

class AuthService {
  tokenService = new TokenService();

  public async adminLogin(body: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const { email, password } = body;
        if (Object.keys(body).length == 0) throw new createHttpError.NotAcceptable(ApiMessage.emptybody);
        const user: Admin = await AdminSchema.findOne({ email: email }).select('-__v');
        if (!user) throw new createHttpError.NotAcceptable(ApiMessage.usernotfound);
        const isMatch = await compare(password, user.password);
        if (!isMatch) throw new createHttpError.NotAcceptable(ApiMessage.passwordnotvalid);
        const accessToken: string = await this.tokenService.signAccessToken(user._id);
        const refreshToken: string = await this.tokenService.signRefreshToken(user._id);
        const data = { user: user, tokens: { accessToken: accessToken, refreshToken: refreshToken } };
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  }
  public async adminSignup(body: Admin): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        if (Object.keys(body).length == 0) throw new createHttpError.NotAcceptable(ApiMessage.emptybody);
        const { email, password } = body;
        const userExist = await AdminSchema.findOne({ email: email }).select('-__v');
        if (userExist) throw new createHttpError.NotAcceptable(ApiMessage.alreadyexist);
        const salt = genSaltSync(12);
        const hashedPassword = hashSync(password, salt);
        body['password'] = hashedPassword;
        await AdminSchema.validate(body);

        const result = await AdminSchema.create(body);
        
        const accessToken: string = await this.tokenService.signAccessToken(result._id);
        const refreshToken: string = await this.tokenService.signRefreshToken(result._id);
        const data = { user: result, tokens: { accessToken: accessToken, refreshToken: refreshToken } };
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  }
}

export default AuthService;
