import { ActionType } from '../types/action';
import { Offer, City } from '../types/offer';

export const changeCity = (cityName: City) => ({
  type: ActionType.ChangeCity,
  payload: cityName,
} as const);

export const loadOffers = (offers: Offer[]) => ({
  type: ActionType.LoadOffers,
  payload: offers,
} as const);
