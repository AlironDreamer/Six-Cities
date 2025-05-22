import {useAppSelector} from '../../hooks/use-app-selector/useAppSelector';
import {AppRoute, AuthorizationStatus} from '../../const';
import {useAppDispatch} from '../../hooks/use-app-dispatch/useAppDispatch';
import {logoutAction} from '../../store/api-actions';
import {Link} from 'react-router-dom';
import React from 'react';
import {getAuthorizationStatus, getUsername} from '../../store/user-process/selectors';
import {getFavoriteOffers} from '../../store/api-data/selectors';

const Profile = (): JSX.Element => {
  const isLoggedIn = useAppSelector(getAuthorizationStatus) === AuthorizationStatus.Auth;
  const userName = useAppSelector(getUsername);
  const dispatch = useAppDispatch();
  const favoriteOffers = useAppSelector(getFavoriteOffers);

  const handleSignOutClick = (evt: React.MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();
    dispatch(logoutAction());
  };

  return isLoggedIn ? (
    <ul className="header__nav-list">
      <li className="header__nav-item user">
        <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Favorites}>
          <div className="header__avatar-wrapper user__avatar-wrapper">
          </div>
          <span className="header__user-name user__name">{userName}</span>
          <span className="header__favorite-count">{favoriteOffers.length}</span>
        </Link>
      </li>
      <li className="header__nav-item">
        <Link className="header__nav-link" to={AppRoute.Root} onClick={handleSignOutClick}>
          <span className="header__signout">Sign out</span>
        </Link>
      </li>
    </ul>
  )
    : (
      <ul className="header__nav-list">
        <li className="header__nav-item">
          <Link className="header__nav-link" to={AppRoute.Login}>
            <span className="header__user-name">Sign in</span>
          </Link>
        </li>
      </ul>
    );
};

export default React.memo(Profile);
