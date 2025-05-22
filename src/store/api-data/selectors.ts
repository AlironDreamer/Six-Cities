import {State} from '../../types/state';
import {Offer} from '../../types/offer';
import {Comparator, NameSpace} from '../../const';
import {Review} from '../../types/review';
import {getCity, getSortType} from '../main-process/selectors';
import {createSelector} from '@reduxjs/toolkit';

export const getOffers = (state: State): Offer[] => state[NameSpace.API].offers;
export const getOffer = (state: State): Offer | null => state[NameSpace.API].offer;
export const getIsDataLoading = (state: State): boolean => state[NameSpace.API].isDataLoading;
export const getIsOfferLoading = (state: State): boolean => state[NameSpace.API].isOfferLoading;
export const getNearbyOffers = (state: State): Offer[] => state[NameSpace.API].nearbyOffers;
export const getReviews = (state: State): Review[] => state[NameSpace.API].reviews;
export const getFavoriteOffers = (state: State): Offer[] => state[NameSpace.API].favoriteOffers;
export const getIsFavoriteOffersLoading = (state: State): boolean => state[NameSpace.API].isFavoriteOffersLoading;

export const selectOffers = createSelector(
  [getOffers, getCity, getSortType],
  (offers, city, sortType) => offers.filter((offer) => offer.city.name === city.name).sort(Comparator[sortType])
);
