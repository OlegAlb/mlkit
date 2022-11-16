import { modelFactory } from '../../base/ModelFactory';
import ConfirmCodeDto from './dto/ConfirmCodeDto';
import ForgotPasswordDto from './dto/ForgotPasswordDto';
import LoginDto from './dto/LoginDto';
import ResetPasswordDto from './dto/ResetPasswordDto';
import { AuthAccess } from './models/AuthAccess';
import { EmailVerification } from './models/EmailVerification';
import AuthApiRepository from './repositories/AuthApiRepository';

export default class AuthService {
  authApi: AuthApiRepository;

  constructor() {
    this.authApi = new AuthApiRepository();
  }

  register = async (postData: any): Promise<AuthAccess> => {
    const { data } = await this.authApi.register(postData);

    return modelFactory.create<AuthAccess>(AuthAccess, data?.data);
  };

  login = async (dto: LoginDto): Promise<AuthAccess> => {
    const { data } = await this.authApi.login(dto);

    return modelFactory.create<AuthAccess>(AuthAccess, data?.data);
  };

  logout = async () => {
    const { data } = await this.authApi.logout();

    return data;
  };

  resetPassword = async (dto: ResetPasswordDto) => {
    const { data } = await this.authApi.resetPassword(dto);

    return data;
  };

  sendConfirmCode = async (dto: ForgotPasswordDto) => {
    const { data } = await this.authApi.sendConfirmCode(dto);

    return modelFactory.create<EmailVerification>(EmailVerification, data?.data);
  };

  confirmCode = async (dto: ConfirmCodeDto) => {
    const { data } = await this.authApi.confirmCode(dto);

    return modelFactory.create<EmailVerification>(EmailVerification, data?.data);
  };
}
