import {toast} from 'react-toastify';
import {getUserData, loadOffers, redirectToRoute, requireAuthorization, requireLogout} from './action';
import {APIRoute, AppRoute, AuthorizationStatus} from '../const';
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
      const { data } = await api.get(APIRoute.Login);
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
      dispatch(getUserData(data));
    } catch {
      toast.info('Please, log in :)');
    }
  };

export const loginAction = ({login: email, password}: AuthData): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    const {data: {token}} = await api.post<{token: Token}>(APIRoute.Login, {email, password});
    saveToken(token);
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
    dispatch(redirectToRoute(AppRoute.Root));
  };

export const logoutAction = (): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    await api.delete(APIRoute.Logout);
    removeToken();
    dispatch(requireLogout());
  };
