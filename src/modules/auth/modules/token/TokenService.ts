import TokenApiRepository from './repositories/TokenApiRepository';
import TokenLocalRepository from './repositories/TokenLocalRepository';

export default class TokenService {
  tokenLocal: TokenLocalRepository;
  tokenApi: TokenApiRepository;

  constructor() {
    this.tokenLocal = new TokenLocalRepository();
    this.tokenApi = new TokenApiRepository();
  }

  saveToken = (token: string) => {
    this.tokenApi.setAccessToken(token);

    return this.tokenLocal.set(token);
  };

  deleteToken = () => {
    this.tokenApi.clearAccessToken();

    return this.tokenLocal.removeAll();
  };

  getToken = async () => {
    const token = await this.tokenLocal.get();
    this.tokenApi.setAccessToken(token);

    return token;
  };
}
