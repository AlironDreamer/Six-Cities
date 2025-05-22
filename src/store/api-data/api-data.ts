import {NameSpace} from '../../const';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ApiData} from '../../types/state';
import {
  fetchNearOffersAction,
  fetchOfferAction,
  fetchOffersAction, getFavoriteOffersAction,
  getReviewsAction, postFavoriteAction,
  postReviewAction
} from '../api-actions';
import {Offer} from '../../types/offer';

const initialState: ApiData = {
  offers: [],
  offer: null,
  nearbyOffers: [],
  favoriteOffers: [],
  reviews: [],
  isDataLoading: false,
  isOfferLoading: false,
  isFavoriteOffersLoading: false
};

export const apiData = createSlice({
  name: NameSpace.API,
  initialState,
  reducers: {
    loadOffers: (state: ApiData, action: PayloadAction<Offer[]>) => {
      state.offers = action.payload;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchOffersAction.pending, (state) => {
        state.isDataLoading = true;
      })
      .addCase(fetchOffersAction.fulfilled, (state) => {
        state.isDataLoading = false;
      })
      .addCase(fetchOffersAction.rejected, (state) => {
        state.isDataLoading = false;
      })
      .addCase(fetchOfferAction.pending, (state) => {
        state.isOfferLoading = true;
      })
      .addCase(fetchOfferAction.fulfilled, (state, action) => {
        state.offer = action.payload;
        state.isOfferLoading = false;
      })
      .addCase(fetchOfferAction.rejected, (state) => {
        state.isOfferLoading = false;
      })
      .addCase(getReviewsAction.fulfilled, (state, action) => {
        state.reviews = action.payload;
      })
      .addCase(getFavoriteOffersAction.pending, (state) => {
        state.isFavoriteOffersLoading = true;
      })
      .addCase(getFavoriteOffersAction.rejected, (state) => {
        state.isFavoriteOffersLoading = false;
      })
      .addCase(getFavoriteOffersAction.fulfilled, (state, action) => {
        state.favoriteOffers = action.payload;
        state.isFavoriteOffersLoading = false;
      })
      .addCase(fetchNearOffersAction.fulfilled, (state, action) => {
        state.nearbyOffers = action.payload;
      })
      .addCase(postReviewAction.fulfilled, (state, action) => {
        state.reviews = action.payload;
      })
      .addCase(postFavoriteAction.fulfilled, (state, action) => {
        const updatedOffer = action.payload;
        state.offers = state.offers.map((offer) => offer.id === updatedOffer.id ? updatedOffer : offer);
        if (state.nearbyOffers) {
          state.nearbyOffers = state.nearbyOffers.map((nearbyOffer) => nearbyOffer.id === updatedOffer.id ? updatedOffer : nearbyOffer);
        }
        if (state.offer && state.offer.id === updatedOffer.id) {
          state.offer = updatedOffer;
        }
        if (updatedOffer.isFavorite) {
          state.favoriteOffers = state.favoriteOffers.concat(updatedOffer);
        } else {
          state.favoriteOffers = state.favoriteOffers.filter((favoriteOffer) => favoriteOffer.id !== updatedOffer.id);
        }
      });
  }
});

export const {loadOffers} = apiData.actions;
