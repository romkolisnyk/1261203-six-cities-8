import { applyMiddleware, createStore } from '@reduxjs/toolkit';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { offersReducer } from './reducer';
import { createAPI } from '../api/api';
import { fetchOffersAction } from './api-actions';

const api = createAPI();

export const store = createStore(offersReducer, composeWithDevTools(applyMiddleware(thunk.withExtraArgument(api))));

(store.dispatch)(fetchOffersAction());
