import {AuthorizationStatus, NameSpace} from '../../const';
import {State} from '../../types/state';
import {UserData} from '../../types/user-data';

export const getAuthorizationStatus = (state: State): AuthorizationStatus => state[NameSpace.USER].authorizationStatus;
export const getUsername = (state: State): UserData['email'] => state[NameSpace.USER].username;
