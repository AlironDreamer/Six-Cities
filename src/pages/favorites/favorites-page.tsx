import Logo from '../../components/logo/Logo';
import FavoritesList from '../../components/favorites-list/favorites-list';
import {useAppSelector} from '../../hooks/use-app-selector/useAppSelector';
import {getFavoriteOffers, getIsFavoriteOffersLoading} from '../../store/api-data/selectors';
import {RotateLoader} from 'react-spinners';
import {AppRoute, spinnerOverride} from '../../const';
import {useEffect} from 'react';
import {useAppDispatch} from '../../hooks/use-app-dispatch/useAppDispatch';
import {getFavoriteOffersAction} from '../../store/api-actions';
import Profile from '../../components/profile/profile';
import {Link} from 'react-router-dom';

const FavoritesPage = (): JSX.Element => {
  const isFavoriteOffersLoading = useAppSelector(getIsFavoriteOffersLoading);
  const dispatch = useAppDispatch();
  const favoriteOffers = useAppSelector(getFavoriteOffers);
  useEffect(() => {
    dispatch(getFavoriteOffersAction());
  }, [dispatch]);
  if (isFavoriteOffersLoading) {
    return <RotateLoader cssOverride={spinnerOverride}/>;
  }
  return (
    <div className="page">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Logo/>
            </div>
            <nav className="header__nav">
              <Profile/>
            </nav>
          </div>
        </div>
      </header>

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          {favoriteOffers.length === 0 ?
            <section className="favorites favorites--empty">
              <h1 className="visually-hidden">Favorites (empty)</h1>
              <div className="favorites__status-wrapper">
                <b className="favorites__status">Nothing yet saved.</b>
                <p className="favorites__status-description">Save properties to narrow down search or plan your future
                  trips.
                </p>
              </div>
            </section>
            :
            <section className="favorites">
              <h1 className="favorites__title">Saved listing</h1>
              <FavoritesList favoriteOffers={favoriteOffers}/>
            </section>}
        </div>
      </main>
      <footer className="footer container">
        <Link className="footer__logo-link" to={AppRoute.Root}>
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33"/>
        </Link>
      </footer>
    </div>
  );
};

export default FavoritesPage;
