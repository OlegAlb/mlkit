import AsyncStorage from '@react-native-async-storage/async-storage';

import ILocalClient from '../ILocalClient';

export default class LocalStorageClient implements ILocalClient {
  get = async (tableName: string): Promise<any> => {
    const data = await AsyncStorage.getItem(tableName);
    return data ? JSON.parse(data) : null;
  };

  set = async (tableName: string, data: any): Promise<any> => {
    return AsyncStorage.setItem(tableName, JSON.stringify(data));
  };

  update = async (tableName: string, data: any): Promise<any> => {
    let res = await this.get(tableName);

    if (res) {
      for (let k in data) {
        res[k] = data[k];
      }
    }

    return await this.set(tableName, res);
  };

  removeAll = async (tableName: string): Promise<any> => {
    return AsyncStorage.removeItem(tableName);
  };
}
