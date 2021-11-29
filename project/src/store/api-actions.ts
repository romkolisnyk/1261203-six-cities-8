import {toast} from 'react-toastify';
import {AxiosError} from 'axios';
import {setUserData, loadOffers, redirectToRoute, requireAuthorization, requireLogout, loadOffer} from './action';
import {APIRoute, AppRoute, AuthorizationStatus, AUTH_TOKEN_KEY_NAME} from '../const';
import {Offer, OfferFromServer} from '../types/offer';
import {ThunkActionResult} from '../types/action';
import {Adapter} from '../utils/adapter';
import {AuthData} from '../types/auth-data';

export const fetchOffersAction = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const { data } = await api.get(APIRoute.GetOffers);
    const offers = data.map((offer: OfferFromServer) => Adapter.offerToClient(offer));
    dispatch(loadOffers(offers));
  };

export const fetchOfferAction = (id: Offer['id']): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const { data } = await api.get(`/hotels/${id}`);
    const offer = Adapter.offerToClient(data);
    dispatch(loadOffer(offer));
  };

export const checkAuthAction = (): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    try {
      const response = await api.get(APIRoute.Login);
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
      dispatch(setUserData(Adapter.userDataToClient(response.data)));
    } catch(error) {
      if ((error as AxiosError).response) {
        toast.info((error as AxiosError).response?.data.error);
      } else {
        toast.info((error as Error).message);
      }
    }
  };

export const loginAction = ({login: email, password}: AuthData): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    try {
      const {data: {token}} = await api.post<{token: string}>(APIRoute.Login, {email, password});
      localStorage.setItem(AUTH_TOKEN_KEY_NAME, token);
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
      const response = await api.get(APIRoute.Login);
      dispatch(redirectToRoute(AppRoute.Root));
      dispatch(setUserData(Adapter.userDataToClient(response.data)));
    } catch (error) {
      toast.info((error as Error).message);
    }
  };

export const logoutAction = (): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    await api.delete(APIRoute.Logout);
    localStorage.removeItem(AUTH_TOKEN_KEY_NAME);
    dispatch(requireLogout());
  };
