import { jsonProperty, Serializable } from 'ts-serializable';

import { Nullable } from '../../../base/types/BaseTypes';

export default class ResetPasswordDto extends Serializable {
  @jsonProperty(String, null) code: Nullable<string> = null;
  @jsonProperty(String, null) token: Nullable<string> = null;
  @jsonProperty(String, null) password: Nullable<string> = null;
  @jsonProperty(String, null) confirmPassword: Nullable<string> = null;
}
