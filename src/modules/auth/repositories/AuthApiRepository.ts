import AbstractApiRepository from '../../../base/api/AbstractApiRepository';
import ConfirmCodeDto from '../dto/ConfirmCodeDto';
import ForgotPasswordDto from '../dto/ForgotPasswordDto';
import LoginDto from '../dto/LoginDto';
import RegisterDto from '../dto/RegisterDto';
import ResetPasswordDto from '../dto/ResetPasswordDto';

export default class AuthApiRepository extends AbstractApiRepository {
  register = (dto: RegisterDto) => {
    return this.apiClient.post({
      url: `/auth/registration`,
      data: dto,
    });
  };

  login = (dto: LoginDto) => {
    return this.apiClient.post({
      url: `/auth/login`,
      data: dto,
    });
  };

  logout = () => {
    return this.apiClient.post({
      url: `/auth/logout`,
    });
  };

  sendConfirmCode = (dto: ForgotPasswordDto) => {
    return this.apiClient.post({
      url: `/auth/send-email-code`,
      data: dto,
    });
  };

  confirmCode = (dto: ConfirmCodeDto) => {
    return this.apiClient.post({
      url: `/auth/confirm-code`,
      data: dto,
    });
  };

  resetPassword = (dto: ResetPasswordDto) => {
    return this.apiClient.post({
      url: `/auth/reset-password`,
      data: dto,
    });
  };
}
