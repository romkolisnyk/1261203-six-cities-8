import { createStore } from '@reduxjs/toolkit';
import { composeWithDevTools } from 'redux-devtools-extension';
import { offersReducer } from './reducer';

export const store = createStore(offersReducer, composeWithDevTools());
