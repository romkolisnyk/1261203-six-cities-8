import { State } from '../types/state';
import { Actions, ActionType} from '../types/action';
import { CityName } from '../const';

const initialState = {
  currentCityName: CityName.Paris,
  offers: [],
};

export const offersReducer = (state: State = initialState, action: Actions): State => {
  switch (action.type) {
    case ActionType.ChangeCity:
      return {...state, currentCityName: action.payload};
    case ActionType.LoadOffers:
      return {...state, offers: action.payload};
    default: return state;
  }
};
