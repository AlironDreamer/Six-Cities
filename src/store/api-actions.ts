import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, State} from '../types/state';
import {AxiosError, AxiosInstance} from 'axios';
import {Offer} from '../types/offer';
import {APIRoute, AppRoute} from '../const';
import {initializeStartDataThunk} from './thunks';
import {AuthData} from '../types/auth-data';
import {UserData} from '../types/user-data';
import {dropToken, saveToken} from '../services/token';
import type {History} from 'history';
import {Review, ReviewBase} from '../types/review';
import {StatusCodes} from 'http-status-codes';
import {loadOffers} from './api-data/api-data';

type Extra = {
  api: AxiosInstance;
  history: History;
}

export const fetchOffersAction = createAsyncThunk<Offer[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: Extra;
}>(
  'api/fetchOffers',
  async (_arg, {dispatch, extra}) => {
    const {api} = extra;
    const {data} = await api.get<Offer[]>(APIRoute.Offers);
    dispatch(loadOffers(data));
    dispatch(initializeStartDataThunk());
    return data;
  }
);

export const fetchOfferAction = createAsyncThunk<Offer, Offer['id'], { extra: Extra }>(
  'api/fetchOffer',
  async (offerID, {extra}) => {
    const {api, history} = extra;
    const route = `${APIRoute.Offers}/${offerID}`;
    try {
      const {data} = await api.get<Offer>(route);
      return data;
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response?.status === StatusCodes.NOT_FOUND) {
        history.push(AppRoute.NotFound);
      }
      return Promise.reject(error);
    }
  }
);

export const fetchNearOffersAction = createAsyncThunk<Offer[], Offer['id'], { extra: Extra }>(
  'api/fetchNearOffers',
  async (offerID, {extra}) => {
    const {api} = extra;
    const route = `${APIRoute.Offers}/${offerID}/nearby`;
    const {data} = await api.get<Offer[]>(route);
    return data;
  }
);

export const checkAuthAction = createAsyncThunk<UserData, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: Extra;
}>(
  'user/checkAuth',
  async (_arg, {extra}) => {
    const {api} = extra;
    const {data} = await api.get<UserData>(APIRoute.Login);
    return data;
  }
);

export const loginAction = createAsyncThunk<string, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: Extra;
}>(
  'user/login',
  async ({login: email, password}, {extra}) => {
    const {api, history} = extra;
    const {data: {email: userEmail, token}} = await api.post<UserData>(APIRoute.Login, {email, password});
    saveToken(token);
    history.back();
    return userEmail;
  }
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: Extra;
}>(
  'user/logout',
  async (_arg, {extra}) => {
    const {api} = extra;
    await api.delete(APIRoute.Logout);
    dropToken();
  }
);

export const getFavoriteOffersAction = createAsyncThunk<Offer[], void, {extra: Extra}>(
  'api/getFavoriteOffers',
  async (_arg, {extra}) => {
    const {api} = extra;
    const {data} = await api.get<Offer[]>(APIRoute.Favorite);
    return data;
  }
);

export const getReviewsAction = createAsyncThunk<Review[], Offer['id'], {extra: Extra}>(
  'api/getReviews',
  async (offerID, {extra}) => {
    const {api} = extra;
    const reviewsRoute = `${APIRoute.Reviews}/${offerID}`;
    const {data} = await api.get<Review[]>(reviewsRoute);
    return data;
  }
);

export const postReviewAction = createAsyncThunk<Review[],
  {
    id: number;
    reviewBase: ReviewBase;
  },
  {extra: Extra}
>(
  'api/postReview',
  async (review, {extra}) => {
    const {api} = extra;
    const route = `${APIRoute.Reviews}/${review.id}`;
    const reviewBase = review.reviewBase;
    const {data} = await api.post<Review[]>(route, {...reviewBase});
    return data;
  }
);

export const postFavoriteAction = createAsyncThunk<Offer,
  {
    id: number;
    status: number;
  },
  {extra: Extra}
>(
  'api/postFavorite',
  async (offerData, {extra}) => {
    const {api, history} = extra;
    const route = `${APIRoute.Favorite}/${offerData.id}/${offerData.status}`;
    try {
      const {data} = await api.post<Offer>(route);
      return data;
    } catch (err) {
      const axiosError = err as AxiosError;
      if (axiosError.response?.status === StatusCodes.UNAUTHORIZED) {
        history.push(AppRoute.Login);
      }
      return Promise.reject(err);
    }
  }
);
