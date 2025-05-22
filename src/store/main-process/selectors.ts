import {State} from '../../types/state';
import {NameSpace, SortType} from '../../const';
import {City} from '../../types/offer';

export const getSortType = (state: State): SortType => state[NameSpace.MAIN].sortType;
export const getCity = (state: State): City => state[NameSpace.MAIN].city;
