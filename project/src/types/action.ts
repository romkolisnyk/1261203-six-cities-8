import { ThunkAction } from 'redux-thunk';
import { AxiosInstance } from 'axios';
import {
  changeCity,
  loadOffers,
  requireAuthorization,
  requireLogout,
  setUserData,
  redirectToRoute,
  loadCurrentOffer,
  loadCurrentOfferComments,
  loadOffersNearby,
  offerLoading
} from '../store/action';
import { State } from './state';

export enum ActionType {
  ChangeCity = 'city/change',
  LoadOffers = 'offers/load',
  RequireAuthorization = 'user/requireAuthorization',
  RequireLogout = 'user/requireLogout',
  RedirectToRoute = 'user/redirectToRoute',
  SetUserData = 'user/getData',
  LoadCurrentOffer = 'currentOffer/load',
  LoadCurrentOfferComments = 'currentOfferComments/load',
  LoadOffersNearby = 'offersNearby/load',
  OfferLoading = 'currentOffer/loading',
}

export type Actions =
  | ReturnType<typeof changeCity>
  | ReturnType<typeof loadOffers>
  | ReturnType<typeof requireAuthorization>
  | ReturnType<typeof requireLogout>
  | ReturnType<typeof redirectToRoute>
  | ReturnType<typeof setUserData>
  | ReturnType<typeof loadCurrentOffer>
  | ReturnType<typeof loadCurrentOfferComments>
  | ReturnType<typeof loadOffersNearby>
  | ReturnType<typeof offerLoading>;

export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Actions>;
