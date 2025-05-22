import {createAPI} from '../services/api';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import {Action, ThunkDispatch} from '@reduxjs/toolkit';
import {State} from '../types/state';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {APIRoute} from '../const';
import {
  checkAuthAction,
  fetchNearOffersAction,
  fetchOfferAction,
  fetchOffersAction,
  getFavoriteOffersAction,
  getReviewsAction,
  postFavoriteAction,
  postReviewAction
} from './api-actions';
import {History} from 'history';
import {AxiosInstance} from 'axios';
import {Offer} from '../types/offer';
import {loadOffers} from './api-data/api-data';
import {setCity} from './main-process/main-process';
import {Review} from '../types/review';
import {offers} from '../mocks/offers';
import {reviews} from '../mocks/reviews';

const review: Review = reviews[0];
const offer: Offer = offers[1];

describe('Async actions', () => {
  const api = createAPI();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument({api})];
  const mockStore = configureMockStore<
    State,
    Action,
    ThunkDispatch<State, { api: AxiosInstance; history: History}, Action>
  >(middlewares);

  it ('checkAuthAction should be fullfilled when server returns 200', async () => {
    const store = mockStore();
    mockAPI.onGet(APIRoute.Login).reply(200, []);
    expect(store.getActions()).toEqual([]);

    await store.dispatch(checkAuthAction());

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      checkAuthAction.pending.type,
      checkAuthAction.fulfilled.type,
    ]);
  });

  it ('checkAuthAction should be rejected when server returns 401', async () => {
    const store = mockStore();
    mockAPI.onGet(APIRoute.Login).reply(401, []);
    expect(store.getActions()).toEqual([]);

    await store.dispatch(checkAuthAction());
    const actions = store.getActions().map(({ type }) => type);
    expect(actions).toEqual([
      checkAuthAction.pending.type,
      checkAuthAction.rejected.type,
    ]);
  });

  it ('fetchOffersAction should be fulfilled when server returns 200', async () => {
    const store = mockStore({
      API: {
        offers: [offer]
      }
    });
    mockAPI.onGet(APIRoute.Offers).reply(200, [offer]);
    expect(store.getActions()).toEqual([]);

    await store.dispatch(fetchOffersAction());

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      fetchOffersAction.pending.type,
      loadOffers.type,
      setCity.type,
      fetchOffersAction.fulfilled.type,
    ]);
  });

  it ('fetchOffersAction should be rejected when server returns 404', async () => {
    const store = mockStore();
    mockAPI.onGet(APIRoute.Offers).reply(404);
    expect(store.getActions()).toEqual([]);

    await store.dispatch(fetchOffersAction());

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      fetchOffersAction.pending.type,
      fetchOffersAction.rejected.type,
    ]);
  });

  it ('fetchOfferAction should be fulfilled when server returns 200', async () => {
    const store = mockStore();
    mockAPI.onGet(`${APIRoute.Offers}/${offer.id}`).reply(200, offer);
    expect(store.getActions()).toEqual([]);

    await store.dispatch(fetchOfferAction(offer.id));
    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      fetchOfferAction.pending.type,
      fetchOfferAction.fulfilled.type,
    ]);
  });

  it ('fetchOfferAction should be rejected when server returns 404', async () => {
    const store = mockStore();
    mockAPI.onGet(`${APIRoute.Offers}/${offer.id}`).reply(404);
    expect(store.getActions()).toEqual([]);

    await store.dispatch(fetchOfferAction(offer.id));
    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      fetchOfferAction.pending.type,
      fetchOfferAction.rejected.type,
    ]);
  });

  it ('fetchNearOfferAction should be fulfilled when server returns 200', async () => {
    const store = mockStore();
    mockAPI.onGet(`${APIRoute.Offers}/${offer.id}/nearby`).reply(200, [offer]);
    expect(store.getActions()).toEqual([]);

    await store.dispatch(fetchNearOffersAction(offer.id));
    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      fetchNearOffersAction.pending.type,
      fetchNearOffersAction.fulfilled.type,
    ]);
  });

  it ('getFavoriteOffersAction should be fulfilled when server returns 200', async () => {
    const store = mockStore();
    mockAPI.onGet(APIRoute.Favorite).reply(200, [offer]);
    expect(store.getActions()).toEqual([]);

    await store.dispatch(getFavoriteOffersAction());

    const actions = store.getActions().map(({ type }) => type);
    expect(actions).toEqual([
      getFavoriteOffersAction.pending.type,
      getFavoriteOffersAction.fulfilled.type,
    ]);
  });

  it ('getFavoriteOffersAction should be rejected when server returns 404', async () => {
    const store = mockStore();
    mockAPI.onGet(APIRoute.Favorite).reply(404);
    expect(store.getActions()).toEqual([]);

    await store.dispatch(getFavoriteOffersAction());

    const actions = store.getActions().map(({ type }) => type);
    expect(actions).toEqual([
      getFavoriteOffersAction.pending.type,
      getFavoriteOffersAction.rejected.type,
    ]);
  });

  it ('getReviewsAction should be fulfilled when server returns 200', async () => {
    const store = mockStore();
    mockAPI.onGet(`${APIRoute.Reviews}/${offer.id}`).reply(200, [review]);
    expect(store.getActions()).toEqual([]);

    await store.dispatch(getReviewsAction(offer.id));

    const actions = store.getActions().map(({ type }) => type);
    expect(actions).toEqual([
      getReviewsAction.pending.type,
      getReviewsAction.fulfilled.type,
    ]);
  });

  it ('postReviewAction should be fulfilled when server returns 200', async () => {
    const store = mockStore();
    const mockReview = {
      id: offer.id,
      reviewBase: {
        comment: '',
        rating: 3.3
      }
    };
    mockAPI.onPost(`${APIRoute.Reviews}/${offer.id}`).reply(200, [review]);
    expect(store.getActions()).toEqual([]);

    await store.dispatch(postReviewAction(mockReview));

    const actions = store.getActions().map(({ type }) => type);
    expect(actions).toEqual([
      postReviewAction.pending.type,
      postReviewAction.fulfilled.type,
    ]);
  });

  it ('postFavoriteAction should be fulfilled when server returns 200', async () => {
    const store = mockStore();
    const favoriteActionData = {
      id: offer.id,
      status: 1
    };
    mockAPI.onPost(`${APIRoute.Favorite}/${favoriteActionData.id}/${favoriteActionData.status}`).reply(200, [{...offer, isFavorite: true}]);
    expect(store.getActions()).toEqual([]);

    await store.dispatch(postFavoriteAction(favoriteActionData));

    const actions = store.getActions().map(({ type }) => type);
    expect(actions).toEqual([
      postFavoriteAction.pending.type,
      postFavoriteAction.fulfilled.type,
    ]);
  });
});
