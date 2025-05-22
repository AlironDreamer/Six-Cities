import React from 'react';
import {useAppDispatch} from '../../hooks/use-app-dispatch/useAppDispatch';
import {postFavoriteAction} from '../../store/api-actions';
import {useAppSelector} from '../../hooks/use-app-selector/useAppSelector';
import {getAuthorizationStatus} from '../../store/user-process/selectors';
import {AuthorizationStatus} from '../../const';

type BookMarkProps = {
  id: number;
  isActive: boolean;
  type?: 'place-card' | 'property';
}

const Bookmark = ({id, isActive, type = 'place-card'}: BookMarkProps): JSX.Element => {
  const bookmarkWidth = type === 'place-card' ? 18 : 31;
  const bookmarkHeight = type === 'place-card' ? 19 : 33;
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  const handleBookmarkClick = (evt: React.MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    dispatch(postFavoriteAction({
      id,
      status: isActive ? 0 : 1
    }));
  };

  return (
    <button
      className={`${type}__bookmark-button ${isActive && authorizationStatus === AuthorizationStatus.Auth ? `${type}__bookmark-button--active` : ''} button`}
      onClick={handleBookmarkClick}
      type="button"
    >
      <svg className={`${type}__bookmark-icon`} width={bookmarkWidth} height={bookmarkHeight}>
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">{isActive && authorizationStatus === AuthorizationStatus.Auth ? 'In bookmarks' : 'To bookmarks'}</span>
    </button>
  );
};

export default Bookmark;
