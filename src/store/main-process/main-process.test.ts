import {changeSortType, mainProcess, setCity} from './main-process';
import {SortType} from '../../const';
import {cities} from '../../mocks/cities';

describe('Reducer: main-process', () => {
  const state = {
    city: cities[0],
    sortType: SortType.Popular
  };

  const getInitialState = (overrides = {}) => ({
    ...state,
    ...overrides,
  });

  it('without additional parameters should return initial state', () => {
    expect(mainProcess.reducer(undefined, {type: 'UNKNOWN_ACTION'}))
      .toEqual(state);
  });

  it('should set city to the state', () => {
    const newCity = {
      name: 'Cologne',
      location: {
        latitude: 50.938361,
        longitude: 6.959974,
        zoom: 13
      }
    };

    const expectedState = getInitialState({
      city: newCity
    });

    expect(mainProcess.reducer(
      state,
      {
        type: setCity,
        payload: newCity
      }))
      .toEqual(expectedState);
  });

  it('should change sort type to the state', () => {
    const expectedState = getInitialState({
      sortType: SortType.TopRated
    });

    expect(mainProcess.reducer(
      state,
      {
        type: changeSortType,
        payload: SortType.TopRated
      }))
      .toEqual(expectedState);
  });
});
