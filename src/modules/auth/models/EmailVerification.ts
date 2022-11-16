import { jsonProperty, Serializable } from 'ts-serializable';

import { Nullable } from '../../../base/types/BaseTypes';

export class EmailVerification extends Serializable {
  @jsonProperty(String, null) status: Nullable<string> = null;
  @jsonProperty(String, null) expiredAt: Nullable<string> = null;
  @jsonProperty(String, null) token: Nullable<string> = null;
}
