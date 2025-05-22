import {Offer} from '../../types/offer';
import {UserData} from '../../types/user-data';
import {Review} from '../../types/review';
import {createAPI} from '../../services/api';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import {APIRoute, AppRoute, AuthorizationStatus, cityNames, NameSpace, SortType} from '../../const';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import App from './app';
import history from '../../browser-history';
import {render, screen} from '@testing-library/react';

const user: UserData = {
  id: 1,
  email: 'Oliver.conner@gmail.com',
  name: 'Oliver.conner',
  avatarUrl: 'https://10.react.htmlacademy.pro/static/avatar/5.jpg',
  isPro: false,
  token: 'T2xpdmVyLmNvbm5lckBnbWFpbC5jb20='
};

const offersList: Offer[] = [{
  bedrooms: 3,
  city: {
    name: cityNames[0],
    location: {
      latitude: 48.85661,
      longitude: 2.351499,
      zoom: 13
    }
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
}];

const reviews: Review[] = [{
  'comment': 'A quiet cozy and picturesque retreat that hides behind a river with the unique lightness of Amsterdam.',
  'date': 'Mon Feb 03 2025 15:32:09 GMT+0300 (Москва, стандартное время)',
  'id': 1,
  'rating': 4,
  'user': {
    'avatarUrl': 'img/avatar-max.jpg',
    'id': 1,
    'isPro': false,
    'name': 'Oliver.conner'
  }
}];

const api = createAPI();
const mockAPI = new MockAdapter(api);
const middlewares = [thunk.withExtraArgument({api})];

mockAPI
  .onGet(`${APIRoute.Offers}/${offersList[0].id}`)
  .reply(200, offersList[0]);

const mockStore = configureMockStore(middlewares);

const authorizedStore = mockStore({
  [NameSpace.USER]: {
    authorizationStatus: AuthorizationStatus.Auth,
    username: user.email,
  },
  [NameSpace.MAIN]: {
    city: {
      name: cityNames[0],
      location: {
        latitude: 48.85661,
        longitude: 2.351499,
        zoom: 13
      }
    },
    sortType: SortType.Popular
  },
  [NameSpace.API]: {
    offers: offersList,
    offer: offersList[0],
    nearbyOffers: [],
    favoriteOffers: offersList,
    reviews: reviews,
    isDataLoading: false,
    isOfferLoading: false,
    isFavoriteOffersLoading: false
  }
});

const unauthorizedStore = mockStore({
  [NameSpace.USER]: {
    authorizationStatus: AuthorizationStatus.NoAuth,
    username: '',
  },
  [NameSpace.MAIN]: {
    city: {
      name: cityNames[0],
      location: {
        latitude: 48.85661,
        longitude: 2.351499,
        zoom: 13
      }
    },
    sortType: SortType.Popular
  },
  [NameSpace.API]: {
    offers: offersList,
    offer: offersList[0],
    nearbyOffers: [],
    favoriteOffers: offersList,
    reviews: reviews,
    isDataLoading: false,
    isOfferLoading: false,
    isFavoriteOffersLoading: false
  }
});

const fakeApp = (
  <Provider store={authorizedStore}>
    <App/>
  </Provider>
);

describe('Application routing', () => {
  it('should render "Main" when user navigates to "/"', () => {
    history.push(AppRoute.Root);

    render(fakeApp);

    expect(screen.getByText(user.email)).toBeInTheDocument();
    expect(screen.getByText(/Sign Out/i)).toBeInTheDocument();
    expect(screen.getByText(`1 place to stay in ${cityNames[0]}`)).toBeInTheDocument();
    expect(screen.getAllByText(SortType.Popular)[0]).toBeInTheDocument();
    expect(screen.getByText('Premium')).toBeInTheDocument();
    expect(screen.getByText(offersList[0].title)).toBeInTheDocument();
  });

  it('should render "Login" when user navigates to "/login"', () => {
    history.push(AppRoute.Login);
    render(
      <Provider store={unauthorizedStore}>
        <App/>
      </Provider>
    );

    expect(screen.getByRole('heading', {level: 1})).toHaveTextContent('Sign in');
    expect(screen.getByPlaceholderText(/Email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('should render "Favorites" when user navigates to "/favorites"', () => {
    history.push(`${AppRoute.Favorites}`);

    render(fakeApp);

    expect(screen.getByText(offersList[0].title)).toBeInTheDocument();
    expect(screen.getByText(offersList[0].type)).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveClass('place-card__bookmark-button--active');
    expect(screen.getByRole('img', { name: 'Place image' })).toHaveAttribute('src', offersList[0].previewImage);
  });

  it('should render "NotFound" when user navigates to "/not-exists"', () => {
    history.push('/not-found');

    render(fakeApp);

    expect(screen.getByText(/Ошибка 404. Страница не существует/i)).toBeInTheDocument();
  });

  it('should render "Property" when user navigates to "/offer/:id"', () => {
    history.push(`${AppRoute.Property}/${offersList[0].id}`);

    render(fakeApp);

    expect(screen.getByText(offersList[0].title)).toBeInTheDocument();
    expect(screen.getByText(offersList[0].description)).toBeInTheDocument();
    expect(screen.getByText(offersList[0].type)).toBeInTheDocument();
  });
});
