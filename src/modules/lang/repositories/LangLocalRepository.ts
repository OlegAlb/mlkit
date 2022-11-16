import AbstractLocalRepository from '../../../base/db/AbstractLocalRepository';

export default class LangLocalRepository extends AbstractLocalRepository {
  tableName(): string {
    return 'lang';
  }
}
