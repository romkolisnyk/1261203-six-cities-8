import { Offer } from './offer';
import { AuthorizationStatus, CityName } from '../const';
import { User } from './user';

export type State = {
  currentCityName: CityName,
  offers: Offer[],
  offer: Offer | null,
  authorizationStatus: AuthorizationStatus,
  userData: User | null,
};
