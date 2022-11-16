import {
  getBuildNumber,
  getVersion,
  getUniqueId,
} from 'react-native-device-info';

export const appConfig = {
  apiUrl: __DEV__ ? '' : '',
  deviceId: await getUniqueId(),
  version: `${getVersion()} (${getBuildNumber()})`,
};
