import {Localization} from './LangAdapter';
import LangLocalRepository from './repositories/LangLocalRepository';
import {LangType} from './types/Lang';

export default class LangService {
  langLocal: LangLocalRepository;

  constructor() {
    this.langLocal = new LangLocalRepository();
  }

  changeLang = async (lang: LangType) => {
    await this.langLocal.set(lang);

    if (lang) {
      await Localization.changeLanguage(lang);
    }
  };

  getLang = async () => {
    return await this.langLocal.get();
  };
}
