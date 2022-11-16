import { rootStore } from '../../../base/RootStore';

export default class AuthHelper {
  static clearStore = async () => {
    rootStore.userStore.resetUser();

    rootStore.eventsStore.resetOptions();
    rootStore.eventsStore.resetCreatedEvents();
    rootStore.eventsStore.resetOptionCount();
    rootStore.eventsStore.resetJoinedEvents();

    rootStore.promotionStore.resetOptions();
    rootStore.promotionStore.resetCreatedPromotions();
    rootStore.promotionStore.resetSecuredPromotions();

    await rootStore.apiUrlStore.resetApiUrl();

    setTimeout(async () => {
      await rootStore.apiUrlStore.setApiBaseUrl(rootStore.apiUrlStore.getDefaultApiUrl()!);
    }, 10);
  };
}
