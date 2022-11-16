import { jsonProperty, Serializable } from 'ts-serializable';

import { Nullable } from '../../../base/types/BaseTypes';

export class AuthAccess extends Serializable {
  @jsonProperty(String, null) type: Nullable<string> = null;
  @jsonProperty(String, null) accessToken: Nullable<string> = null;
}
