import {combineReducers} from '@reduxjs/toolkit';
import {NameSpace} from '../const';
import {apiData} from './api-data/api-data';
import {userProcess} from './user-process/user-process';
import {mainProcess} from './main-process/main-process';

export const rootReducer = combineReducers({
  [NameSpace.API]: apiData.reducer,
  [NameSpace.USER]: userProcess.reducer,
  [NameSpace.MAIN]: mainProcess.reducer,
});

