import Map from '../../components/map/map';
import Logo from '../../components/logo/Logo';
import Reviews from '../../components/reviews/reviews';
import OffersList from '../../components/offers-list/offers-list';
import {useParams} from 'react-router-dom';
import {useAppSelector} from '../../hooks/use-app-selector/useAppSelector';
import Profile from '../../components/profile/profile';
import {spinnerOverride, STARS_COUNT} from '../../const';
import {fetchNearOffersAction, fetchOfferAction, getReviewsAction} from '../../store/api-actions';
import {useEffect} from 'react';
import {useAppDispatch} from '../../hooks/use-app-dispatch/useAppDispatch';
import {RotateLoader} from 'react-spinners';
import {getIsOfferLoading, getNearbyOffers, getOffer, getReviews} from '../../store/api-data/selectors';
import Bookmark from '../../components/bookmark/bookmark';

const MAX_PERCENT_STARS_WIDTH = 100;

const RoomPage = (): JSX.Element | null => {
  const params = useParams();
  const dispatch = useAppDispatch();
  const isOfferLoading = useAppSelector(getIsOfferLoading);
  const selectedOffer = useAppSelector(getOffer);
  const reviews = useAppSelector(getReviews);
  const nearbyOffers = useAppSelector(getNearbyOffers);
  useEffect(() => {
    const { id } = params;
    if (id) {
      const numberID = Number(id);
      dispatch(fetchOfferAction(numberID));
      dispatch(getReviewsAction(numberID));
      dispatch(fetchNearOffersAction(numberID));
    }
  }, [params, dispatch]);

  if (isOfferLoading) {
    return <RotateLoader cssOverride={spinnerOverride}/>;
  }

  if (!selectedOffer) {
    return null;
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

      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            <div className="property__gallery">
              {selectedOffer.images.slice(0,6).map((image, index) => (
                <div key={`${selectedOffer.id}/${index * 100}`} className="property__image-wrapper">
                  <img className="property__image" src={image} alt="Studio"/>
                </div>
              ))}
            </div>
          </div>
          <div className="property__container container">
            <div className="property__wrapper">
              {selectedOffer.isPremium ?
                (
                  <div className="property__mark">
                    <span>Premium</span>
                  </div>
                )
                : ''}
              <div className="property__name-wrapper">
                <h1 className="property__name">
                  {selectedOffer.title}
                </h1>
                <Bookmark id={selectedOffer.id} isActive={selectedOffer.isFavorite} type='property'/>
              </div>
              <div className="property__rating rating">
                <div className="property__stars rating__stars">
                  <span style={{width: `${(MAX_PERCENT_STARS_WIDTH * selectedOffer.rating) / STARS_COUNT}%`}}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="property__rating-value rating__value">{selectedOffer.rating}</span>
              </div>
              <ul className="property__features">
                <li className="property__feature property__feature--entire">
                  {selectedOffer.type}
                </li>
                <li className="property__feature property__feature--bedrooms">
                  {selectedOffer.bedrooms} Bedrooms
                </li>
                <li className="property__feature property__feature--adults">
                  Max {selectedOffer.maxAdults} adults
                </li>
              </ul>
              <div className="property__price">
                <b className="property__price-value">&euro;{selectedOffer.price}</b>
                <span className="property__price-text">&nbsp;night</span>
              </div>
              <div className="property__inside">
                <h2 className="property__inside-title">What&apos;s inside</h2>
                <ul className="property__inside-list">
                  {selectedOffer.goods.map((good, index) => (
                    <li key={`${selectedOffer.id}/${index * 100}`} className="property__inside-item">
                      {good}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="property__host">
                <h2 className="property__host-title">Meet the host</h2>
                <div className="property__host-user user">
                  <div className="property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper">
                    <img className="property__avatar user__avatar" src={selectedOffer.host.avatarUrl} width="74" height="74"
                      alt="Host avatar"
                    />
                  </div>
                  <span className="property__user-name">
                    {selectedOffer.host.name}
                  </span>
                  {selectedOffer.host.isPro ?
                    (
                      <span className="property__user-status">
                        Pro
                      </span>
                    ) : ''}
                </div>
                <div className="property__description">
                  <p className="property__text">
                    {selectedOffer.description}
                  </p>
                </div>
              </div>
              <Reviews reviews={reviews}/>
            </div>
          </div>
          <section className='property__map-container' style={{width: '1144px', marginLeft: 'auto', marginRight: 'auto'}}>
            <Map
              className={'property__map'}
              locations={[selectedOffer.location, ...nearbyOffers.map((offer) => offer.location)]}
              city={selectedOffer.city}
              selectedLocation={selectedOffer.location}
              mode='wide'
            />
          </section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <OffersList offers={nearbyOffers} type={'near'} />
          </section>
        </div>
      </main>
    </div>
  );
};

export default RoomPage;
