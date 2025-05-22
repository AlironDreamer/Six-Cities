import Logo from '../../components/logo/Logo';
import OffersList from '../../components/offers-list/offers-list';
import Map from '../../components/map/map';
import LocationsList from '../../components/locations-list/locations-list';
import {useAppSelector} from '../../hooks/use-app-selector/useAppSelector';
import OffersSort from '../../components/offers-sort/offers-sort';
import {useState} from 'react';
import Profile from '../../components/profile/profile';
import NoOffers from '../../components/no-offers/no-offers';
import {getCity} from '../../store/main-process/selectors';
import {selectOffers} from '../../store/api-data/selectors';
import {pluralize} from '../../const';

const MainPage = (): JSX.Element => {
  const activeCity = useAppSelector(getCity);
  const actualOffers = useAppSelector(selectOffers);
  const [activeOffer, setActiveOffer] = useState<number | null>(null);
  return (
    <div className="page page--gray page--main">
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

      <main className={`page__main page__main--index ${actualOffers.length === 0 ? 'page__main--index-empty' : ''}`}>
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <LocationsList/>
          </section>
        </div>
        <div className="cities">
          {actualOffers.length === 0 ?
            <NoOffers activeCity={activeCity}/>
            : (
              <div className="cities__places-container container">
                <section className="cities__places places">
                  <h2 className="visually-hidden">Places</h2>
                  <b className="places__found">{actualOffers.length} {pluralize('place', actualOffers.length)} to stay in {activeCity.name}</b>
                  <OffersSort/>
                  <OffersList offers={actualOffers} setActiveOffer={setActiveOffer} />
                </section>
                <div className="cities__right-section">
                  <Map className={'cities__map'} locations={actualOffers.map((offer) => offer.location)} selectedLocation = {actualOffers.find((offer) => offer.id === activeOffer)?.location || null} city={activeCity} />
                </div>
              </div>
            )}
        </div>
      </main>
    </div>
  );
};

export default MainPage;
