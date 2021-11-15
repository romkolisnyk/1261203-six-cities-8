import { Offer } from './offer';
import { AuthorizationStatus, CityName } from '../const';

export type State = {
  currentCityName: CityName,
  offers: Offer[],
  authorizationStatus: AuthorizationStatus,
  userEmail: string,
};
