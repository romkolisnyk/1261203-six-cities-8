import { ThunkAction } from 'redux-thunk';
import { AxiosInstance } from 'axios';
import {
  changeCity,
  loadOffers,
  loadOffer,
  requireAuthorization,
  requireLogout,
  setUserData,
  redirectToRoute
} from '../store/action';
import { State } from './state';

export enum ActionType {
  ChangeCity = 'city/change',
  LoadOffers = 'offers/load',
  LoadOffer = 'offer/load',
  RequireAuthorization = 'user/requireAuthorization',
  RequireLogout = 'user/requireLogout',
  RedirectToRoute = 'user/redirectToRoute',
  SetUserData = 'user/getData',
}

export type Actions =
  | ReturnType<typeof changeCity>
  | ReturnType<typeof loadOffers>
  | ReturnType<typeof loadOffer>
  | ReturnType<typeof requireAuthorization>
  | ReturnType<typeof requireLogout>
  | ReturnType<typeof redirectToRoute>
  | ReturnType<typeof setUserData>;

export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Actions>;
