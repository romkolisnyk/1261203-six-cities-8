import {loadOffers, requireAuthorization, requireLogout} from './action';
import {APIRoute, AuthorizationStatus} from '../const';
import {OfferFromServer} from '../types/offer';
import {ThunkActionResult} from '../types/action';
import {Adapter} from '../utils/adapter';
import {AuthData} from '../types/auth-data';
import {removeToken, saveToken, Token} from '../services/token';

export const fetchOffersAction = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const { data } = await api.get(APIRoute.GetOffers);
    const offers = data.map((offer: OfferFromServer) => Adapter.offerToClient(offer));
    dispatch(loadOffers(offers));
  };

export const checkAuthAction = (): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    try {
      await api.get(APIRoute.Login);
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
    } catch {
      // eslint-disable-next-line no-alert
      alert('Please, log in');
    }
  };

export const loginAction = ({login: email, password}: AuthData): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    const {data: {token}} = await api.post<{token: Token}>(APIRoute.Login, {email, password});
    saveToken(token);
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
  };

export const logoutAction = (): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    await api.delete(APIRoute.Logout);
    removeToken();
    dispatch(requireLogout());
  };
