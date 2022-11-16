import { jsonProperty, Serializable } from 'ts-serializable';

import { Nullable } from '../../../base/types/BaseTypes';

export default class ForgotPasswordDto extends Serializable {
  @jsonProperty(String, null) email: Nullable<string> = null;
  @jsonProperty(String, null) type: Nullable<string> = 'forgot_password';
}
