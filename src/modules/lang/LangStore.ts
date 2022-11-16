import {makeAutoObservable} from 'mobx';
import * as RNLocalize from 'react-native-localize';

import LangService from './LangService';
import {LangType, ILangs} from './types/Lang';

export class LangStore {
  lang: LangType = LangType.EN;
  langs: ILangs[] = [
    {title: 'English', lang: LangType.EN},
    {title: 'Русский', lang: LangType.RU},
  ];

  private langService: LangService;

  constructor() {
    makeAutoObservable(this);

    this.langService = new LangService();
  }

  changeLang = async (lang: LangType) => {
    this.setLang(lang);
    await this.langService.changeLang(lang);
  };

  sync = async () => {
    let lang = await this.langService.getLang();

    if (!lang) {
      const systemLang = RNLocalize.getLocales();
      lang = this.langs.find(
        item => item.lang === systemLang[0].languageCode,
      )?.lang;
    }

    await this.changeLang(lang ?? LangType.EN);
  };

  private setLang = (lang: LangType) => {
    this.lang = lang;
  };
}
