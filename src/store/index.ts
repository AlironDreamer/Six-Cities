import {configureStore} from '@reduxjs/toolkit';
import {createAPI} from '../services/api';
import history from '../browser-history';
import {rootReducer} from './root-reducer';
import {checkAuthAction, fetchOffersAction, getFavoriteOffersAction} from './api-actions';

export const api = createAPI();

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    thunk: {
      extraArgument: {
        api,
        history
      },
    }
  }),
});

store.dispatch(fetchOffersAction());
store.dispatch(checkAuthAction());
store.dispatch(getFavoriteOffersAction());

export default store;
