import { offers } from '../mocks/offers';
import { State } from '../types/state';
import { Actions, ActionType} from '../types/action';
import { City } from '../const';

const initialState = {
  city: City.Amsterdam,
  offers,
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
