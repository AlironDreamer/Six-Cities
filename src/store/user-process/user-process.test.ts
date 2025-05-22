import {UserProcess} from '../../types/state';
import {AuthorizationStatus} from '../../const';
import {userProcess} from './user-process';
import {checkAuthAction, loginAction, logoutAction} from '../api-actions';

describe('Reducer: user-process', () => {
  const state: UserProcess = {
    authorizationStatus: AuthorizationStatus.Unknown,
    username: '',
  };

  it('without additional parameters should return initial state', () => {
    expect(userProcess.reducer(undefined, {type: 'UNKNOWN_ACTION'}))
      .toEqual(state);
  });

  it('should set authorizationStatus to AUTH if user is authorized', () => {
    expect(userProcess.reducer(state,
      {
        type: checkAuthAction.fulfilled.type,
        payload: {email: 'aliron@gmail.com'}
      }))
      .toEqual({authorizationStatus: AuthorizationStatus.Auth, username: 'aliron@gmail.com'});
  });

  it('should set authorizationStatus to NO_AUTH if user is not authorized', () => {
    expect(userProcess.reducer(state,
      {
        type: checkAuthAction.rejected.type,
      }))
      .toEqual({...state, authorizationStatus: AuthorizationStatus.NoAuth});
  });

  it('should set authorizationStatus to AUTH after successful authorization', () => {
    expect(userProcess.reducer(state,
      {
        type: loginAction.fulfilled.type,
        payload: 'aliron@gmail.com'
      }))
      .toEqual({authorizationStatus: AuthorizationStatus.Auth, username: 'aliron@gmail.com'});
  });

  it('should set authorizationStatus to NO_AUTH after failed authorization', () => {
    expect(userProcess.reducer(state,
      {
        type: loginAction.rejected.type,
      }))
      .toEqual({...state, authorizationStatus: AuthorizationStatus.NoAuth});
  });

  it('should set authorizationStatus to NO_AUTH after logout', () => {
    expect(userProcess.reducer(state,
      {
        type: logoutAction.fulfilled.type,
      }))
      .toEqual({...state, authorizationStatus: AuthorizationStatus.NoAuth});
  });
});
