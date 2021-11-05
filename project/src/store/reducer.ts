import { State } from '../types/state';
import { Actions, ActionType} from '../types/action';
import { CityName } from '../const';

const initialState = {
  city: {
    name: CityName.Paris,
    location: {
      latitude: 48.85661,
      longitude: 2.351499,
      zoom: 13,
    },
  },
  offers: [],
};

export const offersReducer = (state: State = initialState, action: Actions): State => {
  switch (action.type) {
    case ActionType.ChangeCity:
      return {...state, city: action.payload};
    case ActionType.LoadOffers:
      return {...state, offers: action.payload};
    default: return state;
  }
};
