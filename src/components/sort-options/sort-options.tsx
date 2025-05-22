import React from 'react';
import {SortType} from '../../const';
import {useAppSelector} from '../../hooks/use-app-selector/useAppSelector';
import {useAppDispatch} from '../../hooks/use-app-dispatch/useAppDispatch';
import {getSortType} from '../../store/main-process/selectors';
import {changeSortType} from '../../store/main-process/main-process';

type SortOptionsProps = {
  isSortOpened: boolean;
}

const SORT_TYPES = Object.values(SortType) as SortType[];

const createSortFilter = (currentSortType: SortType, sortType: SortType, clickHandler: (evt: React.MouseEvent<HTMLLIElement>) => void): JSX.Element => (
  <li key={sortType} className={`places__option ${currentSortType === sortType ? 'places__option--active' : ''}`} tabIndex={0} data-sort-type={sortType} onClick={clickHandler}>{sortType}</li>
);

const SortOptions = ({isSortOpened}:SortOptionsProps): JSX.Element => {
  const currentSortType = useAppSelector(getSortType);
  const dispatch = useAppDispatch();
  const handleSortTypeClick = (evt: React.MouseEvent<HTMLLIElement>) => {
    const sortType = evt.currentTarget.dataset.sortType;
    const matchedSortType = Object.values(SortType).find(
      (value) => value === sortType
    ) as SortType | undefined;
    if (sortType !== undefined) {
      dispatch((changeSortType(matchedSortType || SortType.Popular)));
    }
  };

  return (
    <>
      <span className="places__sorting-type" tabIndex={0}>
        {currentSortType}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul
        className={`places__options places__options--custom ${isSortOpened ? 'places__options--opened' : ''}`}
        style={{top: '100%'}}
      >
        {SORT_TYPES.map((sortType) => createSortFilter(currentSortType, sortType, handleSortTypeClick))}
      </ul>
    </>

  );
};

export default SortOptions;
