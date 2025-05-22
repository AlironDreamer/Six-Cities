import {AppDispatch, State} from '../types/state';
import {cityNames} from '../const';
import {CityName} from '../types/cityName';
import {getOffers} from './api-data/selectors';
import {setCity} from './main-process/main-process';

export const initializeStartDataThunk = () => (
  dispatch: AppDispatch,
  getState: () => State
): void => {
  const state: State = getState();
  const city = getOffers(state).find((offer) => offer.city.name === cityNames[0])?.city;
  if (city) {
    dispatch(setCity(city));
  }
};

export const changeCityThunk = (city: CityName) => (
  dispatch: AppDispatch,
  getState: () => State
): void => {
  const state: State = getState();
  const currentCity = getOffers(state).find((offer) => offer.city.name === city)?.city || {
    name: 'Paris',
    location: {
      latitude: 48.85661,
      longitude: 2.351499,
      zoom: 13
    }
  };
  dispatch(setCity(currentCity));
};
