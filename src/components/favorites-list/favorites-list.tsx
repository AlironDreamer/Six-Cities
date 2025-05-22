import {Offer} from '../../types/offer';
import Card from '../card/card';

type FavoritesListProps = {
  favoriteOffers: Offer[];
};

const FavoritesList = ({favoriteOffers}: FavoritesListProps): JSX.Element => {
  const uniqueCities = favoriteOffers.reduce((acc, curr) => {
    if (acc.findIndex((obj) => obj === curr.city.name) === -1) {
      acc.push(curr.city.name);
    }
    return acc;
  }, [] as string[]);
  return (
    <ul className="favorites__list">
      {uniqueCities.map((city) => {
        const cityOffers = favoriteOffers.filter((offer) => offer.city.name === city);
        return (
          <li className="favorites__locations-items" key={city}>
            <div className="favorites__locations locations locations--current">
              <div className="locations__item">
                <div className="locations__item-link">
                  <span>{city}</span>
                </div>
              </div>
            </div>
            <div className="favorites__places">
              {cityOffers.map((offer) => <Card key={offer.id} offer={offer} type={'favorite'} isMini/>)}
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default FavoritesList;
