import {store} from '../store';
import {AuthorizationStatus, SortType} from '../const';
import {UserData} from './user-data';
import {City, Offer} from './offer';
import {Review} from './review';

export type ApiData = {
  offers: Offer[];
  offer: Offer | null;
  nearbyOffers: Offer[];
  favoriteOffers: Offer[];
  reviews: Review[];
  isDataLoading: boolean;
  isOfferLoading: boolean;
  isFavoriteOffersLoading: boolean;
};

export type MainProcess = {
  city: City;
  sortType: SortType;
}

export type UserProcess = {
  authorizationStatus: AuthorizationStatus;
  username: UserData['email'];
};

export type State = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
