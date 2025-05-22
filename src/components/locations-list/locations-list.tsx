import {useAppSelector} from '../../hooks/use-app-selector/useAppSelector';
import React from 'react';
import {useAppDispatch} from '../../hooks/use-app-dispatch/useAppDispatch';
import {cityNames} from '../../const';
import {changeCityThunk} from '../../store/thunks';
import {getCity} from '../../store/main-process/selectors';


const LocationsList = (): JSX.Element => {
  const activeCity = useAppSelector(getCity);
  const activeCityName = activeCity?.name ?? cityNames[0];
  const dispatch = useAppDispatch();
  return (
    <ul className="locations__list tabs__list">
      {cityNames.map(((cityName) => (
        <li key={cityName} className="locations__item">
          <a
            className={`locations__item-link tabs__item ${activeCityName === cityName ? 'tabs__item--active' : ''}`}
            href="#"
            onClick={(evt: React.MouseEvent<HTMLAnchorElement>) => {
              evt.preventDefault();
              dispatch(changeCityThunk(cityName));
            }}
          >
            <span>{cityName}</span>
          </a>
        </li>
      )))}
    </ul>
  );
};

export default React.memo(LocationsList);
