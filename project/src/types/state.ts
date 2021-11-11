import { Offer } from './offer';
import { CityName } from '../const';

export type State = {
  currentCityName: CityName,
  offers: Offer[],
};
