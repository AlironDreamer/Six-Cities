import {CSSProperties} from 'react';
import {Offer} from './types/offer';

export enum AppRoute {
  Root = '/',
  Login = '/login',
  Favorites = '/favorites',
  NotFound = '/not-found',
  Property = '/offer'
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum SortType {
  Popular = 'Popular',
  ExpensiveFirst = 'Price: high to low',
  CheapFirst = 'Price: low to high',
  TopRated = 'Top rated first'
}

export enum APIRoute {
  Offers = '/hotels',
  Login = '/login',
  Logout = '/logout',
  Reviews = '/comments',
  Favorite = '/favorite'
}

export enum NameSpace {
  API = 'API',
  USER = 'USER',
  MAIN = 'MAIN'
}

export const Comparator: {
  [key in SortType]: (a: Offer, b: Offer) => number;
} = {
  [SortType.Popular]: () => 0,
  [SortType.ExpensiveFirst]: (a, b) => b.price - a.price,
  [SortType.CheapFirst]: (a, b) => a.price - b.price,
  [SortType.TopRated]: (a, b) => b.rating - a.rating,
};

export const pluralize = (str: string, count: number) => count === 1 ? str : `${str}s`;

export const cityNames = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'] as const;

export const STARS_COUNT = 5;

export const URL_MARKER_DEFAULT = '/img/pin.svg';

export const URL_MARKER_CURRENT = '/img/pin-active.svg';

export const spinnerOverride: CSSProperties = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
};

export const INVALID_PASSWORD_MESSAGE = 'Password should contains at least one letter and digit';
