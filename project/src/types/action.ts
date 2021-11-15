import { ThunkAction } from 'redux-thunk';
import { AxiosInstance } from 'axios';
import { changeCity, loadOffers, requireAuthorization, requireLogout } from '../store/action';
import { State } from './state';

export enum ActionType {
  ChangeCity = 'city/change',
  LoadOffers = 'offers/load',
  RequireAuthorization = 'user/requireAuthorization',
  RequireLogout = 'user/requireLogout',
}

export type Actions =
  | ReturnType<typeof changeCity>
  | ReturnType<typeof loadOffers>
  | ReturnType<typeof requireAuthorization>
  | ReturnType<typeof requireLogout>;

export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Actions>;
