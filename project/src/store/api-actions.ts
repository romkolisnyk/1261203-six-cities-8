import { loadOffers } from './action';
import { APIRoute } from '../const';
import { OfferFromServer } from '../types/offer';
import { ThunkActionResult } from '../types/action';
import { Adapter } from '../utils/adapter';

export const fetchOffersAction = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const { data } = await api.get(APIRoute.GetOffers);
    const offers = data.map((offer: OfferFromServer) => Adapter.offerToClient(offer));
    dispatch(loadOffers(offers));
  };
