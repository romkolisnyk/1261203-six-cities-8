import { changeCity, loadOffers } from '../store/action';

export enum ActionType {
  ChangeCity = 'offers/changeCity',
  LoadOffers = 'offers/loadOffers',
}

export type Actions = ReturnType<typeof changeCity> | ReturnType<typeof loadOffers>;
