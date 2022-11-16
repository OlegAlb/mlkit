import { jsonProperty, Serializable } from 'ts-serializable';

import { Nullable } from '../../../base/types/BaseTypes';

export default class ConfirmCodeDto extends Serializable {
  @jsonProperty(String, null) code: Nullable<string> = null;
  @jsonProperty(String, null) token: Nullable<string> = null;
}
