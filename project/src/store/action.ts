import { ActionType } from '../types/action';
import { Offer } from '../types/offer';
import { CityName } from '../const';

export const changeCity = (cityName: CityName) => ({
  type: ActionType.ChangeCity,
  payload: cityName,
} as const);

export const loadOffers = (offers: Offer[]) => ({
  type: ActionType.LoadOffers,
  payload: offers,
} as const);
