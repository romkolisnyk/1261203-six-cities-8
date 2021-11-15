import {applyMiddleware, createStore} from '@reduxjs/toolkit';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import {reducer} from './reducer';
import {createAPI} from '../api/api';
import {checkAuthAction, fetchOffersAction} from './api-actions';
import {requireAuthorization, ThunkAppDispatch} from './action';
import {AuthorizationStatus} from '../const';

const api = createAPI(
  () => store.dispatch(requireAuthorization(AuthorizationStatus.NoAuth)),
);

export const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk.withExtraArgument(api))));

(store.dispatch)(fetchOffersAction());
(store.dispatch as ThunkAppDispatch)(checkAuthAction());
