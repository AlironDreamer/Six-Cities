import {MainProcess} from '../../types/state';
import {NameSpace, SortType} from '../../const';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {City} from '../../types/offer';

const initialState: MainProcess = {
  city: {
    name: 'Paris',
    location: {
      latitude: 48.85661,
      longitude: 2.351499,
      zoom: 13
    }
  },
  sortType: SortType.Popular
};

export const mainProcess = createSlice({
  name: NameSpace.MAIN,
  initialState,
  reducers: {
    setCity: (state: MainProcess, action: PayloadAction<City>) => {
      state.city = action.payload;
    },
    changeSortType: (state: MainProcess, action: PayloadAction<SortType>) => {
      state.sortType = action.payload;
    }
  },
});

export const {setCity, changeSortType} = mainProcess.actions;
