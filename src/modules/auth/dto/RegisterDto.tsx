import { jsonProperty, Serializable } from 'ts-serializable';

import { Nullable } from '../../../base/types/BaseTypes';

export default class RegisterDto extends Serializable {
  @jsonProperty(String, null) firstName: Nullable<string> = null;
  @jsonProperty(String, null) lastName: Nullable<string> = null;
  @jsonProperty(String, null) companyName: Nullable<string> = null;
  @jsonProperty(String, null) phone: Nullable<string> = null;
  @jsonProperty(String, null) email: Nullable<string> = null;
  @jsonProperty(String, null) gender: Nullable<string> = null;
  @jsonProperty(String, null) password: Nullable<string> = null;
  @jsonProperty(String, null) confirmPassword: Nullable<string> = null;
}
