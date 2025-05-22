import {ApiData} from '../../types/state';
import {Offer} from '../../types/offer';
import {apiData, loadOffers} from './api-data';
import {
  fetchNearOffersAction,
  fetchOfferAction,
  fetchOffersAction,
  getFavoriteOffersAction,
  getReviewsAction, postFavoriteAction, postReviewAction
} from '../api-actions';
import {Review} from '../../types/review';
import {offers} from '../../mocks/offers';
import {reviews} from '../../mocks/reviews';

const offersList: Offer[] = [offers[0]];
const reviewsList: Review[] = [reviews[0]];

describe('Reducer api-data', () => {
  const state: ApiData = {
    offers: [],
    offer: null,
    nearbyOffers: [],
    favoriteOffers: [],
    reviews: [],
    isDataLoading: false,
    isOfferLoading: false,
    isFavoriteOffersLoading: false
  };

  it('without additional parameters should return initial state', () => {
    expect(apiData.reducer(undefined, {type: 'UNKNOWN_ACTION'}))
      .toEqual(state);
  });

  it('should be able to fetch offers', () => {
    expect(apiData.reducer(state, {type: fetchOffersAction.pending.type}))
      .toEqual({...state, isDataLoading: true});

    expect(apiData.reducer(state, {type: fetchOffersAction.fulfilled.type}))
      .toEqual({...state, isDataLoading: false});

    expect(apiData.reducer(state, {type: fetchOfferAction.rejected.type}))
      .toEqual({...state, isDataLoading: false});
  });

  it('should be able to fetch offer', () => {
    const offer: Offer = {
      bedrooms: 3,
      city: {
        location: {
          latitude: 52.3909553943508,
          longitude: 4.85309666406198,
          zoom: 10
        },
        name: 'Amsterdam'
      },
      description: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
      goods: [
        'Heating'
      ],
      host: {
        avatarUrl: 'img/1.png',
        id: 3,
        isPro: true,
        name: 'Angelina'
      },
      id: 10,
      images: [
        'img/apartment-01.jpg'
      ],
      isFavorite: true,
      isPremium: true,
      location: {
        latitude: 52.35514938496378,
        longitude: 4.673877537499948,
        zoom: 8
      },
      maxAdults: 4,
      previewImage: 'img/apartment-01.jpg',
      price: 120,
      rating: 4.8,
      title: 'Beautiful & luxurious studio at great location',
      type: 'apartment'
    };

    expect(apiData.reducer(state, {type: fetchOfferAction.pending.type}))
      .toEqual({...state, isOfferLoading: true});

    expect(apiData.reducer(state,
      {
        type: fetchOfferAction.fulfilled.type,
        payload: offer
      }))
      .toEqual({...state, offer: offer});

    expect(apiData.reducer(state, {type: fetchOffersAction.rejected.type}))
      .toEqual({...state, isOfferLoading: false});
  });


  it('should be able to load offers', () => {

    expect(apiData.reducer(
      state,
      {
        type: loadOffers,
        payload: offersList
      }))
      .toEqual({...state, offers: offersList});
  });

  it('should be able to get reviews', () => {


    expect(apiData.reducer(
      state,
      {
        type: getReviewsAction.fulfilled.type,
        payload: reviewsList
      }))
      .toEqual({...state, reviews: reviewsList});
  });

  it('should be able to get favorite offers', () => {
    expect(apiData.reducer(state, {type: getFavoriteOffersAction.pending.type}))
      .toEqual({...state, isFavoriteOffersLoading: true});

    expect(apiData.reducer(
      state,
      {
        type: getFavoriteOffersAction.fulfilled.type,
        payload: offersList
      }))
      .toEqual({...state, isFavoriteOffersLoading: false, favoriteOffers: offersList});

    expect(apiData.reducer(state, {type: getFavoriteOffersAction.rejected.type}))
      .toEqual({...state, isFavoriteOffersLoading: false});
  });

  it('should be able to fetch near offers', () => {
    expect(apiData.reducer(
      state,
      {
        type: fetchNearOffersAction.fulfilled.type,
        payload: offersList
      }
    ))
      .toEqual({...state, nearbyOffers: offersList});
  });

  it('should be able to update reviews after post', () => {
    expect(apiData.reducer(
      state,
      {
        type: postReviewAction.fulfilled.type,
        payload: reviewsList
      }
    ))
      .toEqual({...state, reviews: reviewsList});
  });

  it('should be able to mark offer as favorite', () => {
    const stateLocal: ApiData = {
      offers: [{...offersList[0]}],
      offer: null,
      nearbyOffers: [],
      favoriteOffers: [],
      reviews: [],
      isDataLoading: false,
      isOfferLoading: false,
      isFavoriteOffersLoading: false
    };
    expect(apiData.reducer(
      stateLocal,
      {
        type: postFavoriteAction.fulfilled.type,
        payload: {...offersList[0], isFavorite: true}
      }
    ))
      .toEqual({
        offers: [{...offersList[0], isFavorite: true}],
        offer: null,
        nearbyOffers: [],
        favoriteOffers: [{...offersList[0], isFavorite: true}],
        reviews: [],
        isDataLoading: false,
        isOfferLoading: false,
        isFavoriteOffersLoading: false
      });

    stateLocal.offers = [{...offersList[0], isFavorite: true }];
    stateLocal.favoriteOffers = [{...offersList[0], isFavorite: true}];

    expect(apiData.reducer(
      stateLocal,
      {
        type: postFavoriteAction.fulfilled.type,
        payload: {...offersList[0], isFavorite: false}
      }
    ))
      .toEqual({
        offers: [{...offersList[0], isFavorite: false}],
        offer: null,
        nearbyOffers: [],
        favoriteOffers: [],
        reviews: [],
        isDataLoading: false,
        isOfferLoading: false,
        isFavoriteOffersLoading: false
      });
  });
});

