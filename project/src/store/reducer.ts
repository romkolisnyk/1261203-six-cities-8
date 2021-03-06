import {State} from '../types/state';
import {Actions, ActionType} from '../types/action';
import {AuthorizationStatus, CityName} from '../const';

const initialState = {
  currentCityName: CityName.Paris,
  offers: [],
  authorizationStatus: AuthorizationStatus.NoAuth,
  userData: null,
  currentOffer: null,
  currentOfferComments: [],
  offersNearby: [],
  offerLoading: true,
};

export const reducer = (state: State = initialState, action: Actions): State => {
  switch (action.type) {
    case ActionType.ChangeCity:
      return {...state, currentCityName: action.payload};
    case ActionType.LoadOffers:
      return {...state, offers: action.payload};
    case ActionType.RequireAuthorization:
      return {...state, authorizationStatus: action.payload};
    case ActionType.RequireLogout:
      return {...state, authorizationStatus: AuthorizationStatus.NoAuth};
    case ActionType.SetUserData:
      return {...state, userData: action.payload};
    case ActionType.LoadCurrentOffer:
      return {...state, currentOffer: action.payload};
    case ActionType.LoadCurrentOfferComments:
      return {...state, currentOfferComments: action.payload};
    case ActionType.LoadOffersNearby:
      return {...state, offersNearby: action.payload};
    case ActionType.OfferLoading:
      return {...state, offerLoading: action.payload};
    default: return state;
  }
};
