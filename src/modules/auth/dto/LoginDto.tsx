import { jsonProperty, Serializable } from 'ts-serializable';

import { Nullable } from '../../../base/types/BaseTypes';

export default class LoginDto extends Serializable {
  @jsonProperty(String, null) email: Nullable<string> = null;
  @jsonProperty(String, null) password: Nullable<string> = null;
}
