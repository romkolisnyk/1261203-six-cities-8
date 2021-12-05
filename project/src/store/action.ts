import { ThunkDispatch } from 'redux-thunk';
import { AxiosInstance } from 'axios';
import { Actions, ActionType } from '../types/action';
import { Offer } from '../types/offer';
import { AppRoute, AuthorizationStatus, CityName } from '../const';
import { State } from '../types/state';
import { User } from '../types/user';
import { Comment } from '../types/comment';

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

export const redirectToRoute = (url: AppRoute) => ({
  type: ActionType.RedirectToRoute,
  payload: url,
} as const);

export const setUserData = (userData: User) => ({
  type: ActionType.SetUserData,
  payload: userData,
} as const);

export const loadCurrentOffer = (offer: Offer) => ({
  type: ActionType.LoadCurrentOffer,
  payload: offer,
} as const);

export const loadCurrentOfferComments = (comments: Comment[]) => ({
  type: ActionType.LoadCurrentOfferComments,
  payload: comments,
} as const);

export const loadOffersNearby = (offers: Offer[]) => ({
  type: ActionType.LoadOffersNearby,
  payload: offers,
} as const);

export type ThunkAppDispatch = ThunkDispatch<State, AxiosInstance, Actions>;
