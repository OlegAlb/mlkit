import { makeAutoObservable, set } from 'mobx';

import { Dto } from '../../base/Dto';
import AxiosClient from '../../base/api/axios/AxiosClient';
import { Nullable } from '../../base/types/BaseTypes';
import AuthService from './AuthService';
import ConfirmCodeDto from './dto/ConfirmCodeDto';
import ForgotPasswordDto from './dto/ForgotPasswordDto';
import LoginDto from './dto/LoginDto';
import RegisterDto from './dto/RegisterDto';
import ResendCodeDto from './dto/ResendCodeDto';
import ResetPasswordDto from './dto/ResetPasswordDto';
import { ConfirmCodeForm, ConfirmCodeFormFields } from './forms/ConfirmCodeForm';
import { ErrorForm, ErrorFormFields, IErrorFromParam } from './forms/ErrorForm';
import { ForgotPasswordForm, ForgotPasswordFormFields } from './forms/ForgotPasswordForm';
import { LoginForm, LoginFormFields } from './forms/LoginForm';
import { RegistrationForm, RegistrationFormFields } from './forms/RegistrationForm';
import { SetPasswordForm, SetPasswordFormFields } from './forms/SetPasswordForm';
import TokenService from './modules/token/TokenService';

export class AuthStore {
  registrationLoader: boolean = false;
  authLoader: boolean = false;
  accessToken: Nullable<string> = null;

  loginForm = LoginForm;
  forgotPasswordForm = ForgotPasswordForm;
  confirmCodeForm = ConfirmCodeForm;
  setPasswordForm = SetPasswordForm;
  registrationForm = RegistrationForm;
  errorForm = ErrorForm;

  private authService: AuthService;
  private tokenService: TokenService;

  constructor() {
    makeAutoObservable(this);
    this.authService = new AuthService();
    this.tokenService = new TokenService();
  }

  getToken = async () => {
    const token = await this.tokenService.getToken();
    this.setToken(token);

    return token;
  };

  register = () => {
    const dto = Dto.populate(RegisterDto, this.registrationForm);

    this.setRegistrationLoading(true);

    return this.authService
      .register(dto)
      .then(result => {
        const { accessToken } = result;

        if (accessToken) {
          this.setToken(accessToken);
          this.tokenService.saveToken(accessToken);
        }

        return true;
      })
      .catch(error => {
        let { errors } = error?.response?.data || {};

        if (error.response.status === AxiosClient.UNPROCESSABLE_ENTITY) {
          this.setErrors(errors);
        }

        return false;
      })
      .finally(() => {
        this.setAuthLoading(false);
      });
  };

  login = () => {
    const dto = Dto.populate(LoginDto, this.loginForm);

    this.setAuthLoading(true);

    return this.authService
      .login(dto)
      .then(result => {
        const { accessToken } = result;

        if (accessToken) {
          this.setToken(accessToken);
          this.tokenService.saveToken(accessToken);
        }

        return true;
      })
      .catch(error => {
        let { errors, message } = error?.response?.data || {};

        if (['User not found', 'User is inactive'].includes(message)) {
          errors = { ...errors, email: [message] };
        }

        if (message === 'Wrong password, try again') {
          errors = { ...errors, password: [message] };
        }

        this.setErrors(errors);

        return false;
      })
      .finally(() => {
        this.setAuthLoading(false);
      });
  };

  sendConfirmCode = () => {
    const dto = Dto.populate(ForgotPasswordDto, this.forgotPasswordForm);

    return this.authService
      .sendConfirmCode(dto)
      .then(result => {
        this.changeConfirmCodeForm(ConfirmCodeFormFields.token, result.token);

        return true;
      })
      .catch(error => {
        const { errors } = error?.response?.data || {};

        if (error.response.status === AxiosClient.UNPROCESSABLE_ENTITY) {
          this.setErrors(errors);
        }

        return false;
      })
      .finally(() => {
        this.setAuthLoading(false);
      });
  };

  resendConfirmCode = () => {
    const dto = Dto.populate(ResendCodeDto, this.confirmCodeForm);

    return this.authService
      .sendConfirmCode(dto)
      .then(result => {
        this.changeConfirmCodeForm(ConfirmCodeFormFields.token, result.token);

        return true;
      })
      .catch(error => {
        const { errors } = error?.response?.data || {};

        if (error.response.status === AxiosClient.UNPROCESSABLE_ENTITY) {
          this.setErrors(errors);
        }

        return false;
      })
      .finally(() => {
        this.setAuthLoading(false);
      });
  };

  confirmCode = () => {
    const dto = Dto.populate(ConfirmCodeDto, this.confirmCodeForm);

    return this.authService
      .confirmCode(dto)
      .then(result => {
        this.changeSetPasswordForm(SetPasswordFormFields.token, result.token);

        return true;
      })
      .catch(error => {
        let { errors, message } = error?.response?.data || {};

        if (error.response.status === AxiosClient.UNPROCESSABLE_ENTITY) {
          if (['Wrong code'].includes(message)) {
            errors = { ...errors, code: [message] };
          }

          this.setErrors(errors);
        }

        return false;
      });
  };

  resetPassword = async () => {
    const dto = Dto.populate(ResetPasswordDto, this.setPasswordForm);

    return this.authService
      .resetPassword(dto)
      .then(result => {
        return true;
      })
      .catch(error => {
        let { errors, message } = error?.response?.data || {};

        if (error.response.status === AxiosClient.UNPROCESSABLE_ENTITY) {
          if (['User not found', 'User is inactive'].includes(message)) {
            errors = { ...errors, email: [message] };
          }

          this.setErrors(errors);
        }

        return false;
      })
      .finally(() => {
        this.setAuthLoading(false);
      });
  };

  logout = async () => {
    this.setAuthLoading(true);

    return this.authService
      .logout()
      .then(() => {
        return true;
      })
      .catch(() => {
        return false;
      })
      .finally(async () => {
        await this.tokenService.deleteToken();

        this.deleteToken();
        this.setAuthLoading(false);
      });
  };

  setAuthLoading = (value: boolean) => {
    this.authLoader = value;
  };

  setRegistrationLoading = (value: boolean) => {
    this.registrationLoader = value;
  };

  setToken = (token: string) => {
    this.accessToken = token;
  };

  deleteToken = () => {
    this.accessToken = null;
  };

  setErrors = (errors: Nullable<IErrorFromParam>) => {
    if (errors) {
      Object.keys(errors).forEach(key => {
        this.changeErrorForm(key as ErrorFormFields, errors[key]);
      });
    }
  };

  changeLoginForm = (key: LoginFormFields, value: any) => {
    set(this.loginForm, key, value);
  };

  resetLoginForm = () => {
    this.loginForm = LoginForm;
  };

  changeForgotPasswordForm = (key: ForgotPasswordFormFields, value: any) => {
    set(this.forgotPasswordForm, key, value);
  };

  resetForgotPasswordForm = () => {
    this.forgotPasswordForm = ForgotPasswordForm;
  };

  changeConfirmCodeForm = (key: ConfirmCodeFormFields, value: any) => {
    set(this.confirmCodeForm, key, value);
  };

  resetConfirmCodeForm = () => {
    this.confirmCodeForm = ConfirmCodeForm;
  };

  changeSetPasswordForm = (key: SetPasswordFormFields, value: any) => {
    set(this.setPasswordForm, key, value);
  };

  resetSetPasswordForm = () => {
    this.setPasswordForm = SetPasswordForm;
  };

  changeRegistrationForm = (key: RegistrationFormFields, value: any) => {
    set(this.registrationForm, key, value);
  };

  resetRegistrationForm = () => {
    this.registrationForm = RegistrationForm;
  };

  changeErrorForm = (key: ErrorFormFields, value: any) => {
    set(this.errorForm, key, value);
  };

  removeError = (key: ErrorFormFields) => {
    set(this.errorForm, key, []);
  };

  resetErrorForm = () => {
    this.errorForm = ErrorForm;
  };
}
