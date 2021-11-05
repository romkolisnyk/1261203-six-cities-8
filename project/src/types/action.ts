import { ThunkAction } from 'redux-thunk';
import { AxiosInstance } from 'axios';
import { changeCity, loadOffers } from '../store/action';
import { State } from './state';

export enum ActionType {
  ChangeCity = 'city/change',
  LoadOffers = 'offers/load',
}

export type Actions = ReturnType<typeof changeCity> | ReturnType<typeof loadOffers>;

export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Actions>;
