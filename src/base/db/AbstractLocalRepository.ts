import ILocalClient from './ILocalClient';
import { LocalClientTypes } from './LocalClientTypes';
import EncryptedStorageClient from './localStorage/EncryptedStorageClient';
import LocalStorageClient from './localStorage/LocalStorageClient';

export default abstract class AbstractLocalRepository {
  localClient!: ILocalClient;

  private static clients = {
    [LocalClientTypes.localStorage]: new LocalStorageClient(),
    [LocalClientTypes.encryptedStorage]: new EncryptedStorageClient(),
  };

  constructor(localClientType = LocalClientTypes.localStorage) {
    this.setLocalClient(AbstractLocalRepository.clients[localClientType]);
  }

  setLocalClient = (localClient: ILocalClient) => {
    this.localClient = localClient;
  };

  abstract tableName(): string;

  get = async () => {
    return await this.localClient.get(this.tableName());
  };

  set = async (data: any) => {
    return await this.localClient.set(this.tableName(), data);
  };

  update = async (data: any) => {
    return await this.localClient.update(this.tableName(), data);
  };

  removeAll = async () => {
    return await this.localClient.removeAll(this.tableName());
  };
}
