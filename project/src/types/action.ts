import { changeCity, loadOffers } from '../store/action';

export enum ActionType {
  ChangeCity = 'city/change',
  LoadOffers = 'offers/load',
}

export type Actions = ReturnType<typeof changeCity> | ReturnType<typeof loadOffers>;
