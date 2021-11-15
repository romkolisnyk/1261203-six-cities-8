import { ThunkDispatch } from 'redux-thunk';
import { AxiosInstance } from 'axios';
import { Actions, ActionType } from '../types/action';
import { Offer } from '../types/offer';
import { AuthorizationStatus, CityName } from '../const';
import { State } from '../types/state';

export const changeCity = (cityName: CityName) => ({
  type: ActionType.ChangeCity,
  payload: cityName,
} as const);

export const loadOffers = (offers: Offer[]) => ({
  type: ActionType.LoadOffers,
  payload: offers,
} as const);

export const requireAuthorization = (authStatus: AuthorizationStatus) => ({
  type: ActionType.RequireAuthorization,
  payload: authStatus,
} as const);

export const requireLogout = () => ({
  type: ActionType.RequireLogout,
} as const);

export type ThunkAppDispatch = ThunkDispatch<State, AxiosInstance, Actions>;
