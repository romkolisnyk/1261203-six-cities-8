import { Offer } from './offer';
import { AuthorizationStatus, CityName } from '../const';
import { User } from './user';
import { Comment } from './comment';

export type State = {
  currentCityName: CityName,
  offers: Offer[],
  authorizationStatus: AuthorizationStatus,
  userData: User | null,
  currentOffer: Offer | null,
  currentOfferComments: Comment[],
  offersNearby: Offer[],
};
