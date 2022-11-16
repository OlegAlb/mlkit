import AbstractLocalRepository from '../../../../../base/db/AbstractLocalRepository';
import { LocalClientTypes } from '../../../../../base/db/LocalClientTypes';

export default class TokenLocalRepository extends AbstractLocalRepository {
  constructor() {
    super(LocalClientTypes.encryptedStorage);
  }

  tableName(): string {
    return 'accessToken';
  }
}
