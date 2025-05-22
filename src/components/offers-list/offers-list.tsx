import Card from '../card/card';
import {Offer} from '../../types/offer';
import {useCallback} from 'react';

type OffersListProps = {
  offers: Offer[];
  setActiveOffer?: (id: number | null) => void;
  type?: 'default' | 'near';
}

const OffersList = ({offers, setActiveOffer, type = 'default'}: OffersListProps): JSX.Element => {
  const sectionClass = type === 'default'
    ? 'cities__places-list'
    : 'near-places__list';
  const tabsClass = type === 'default'
    ? 'tabs__content'
    : '';

  const handleCardMouseMove = useCallback((id: number) => {
    setActiveOffer && setActiveOffer(id);
  }, [setActiveOffer]);

  const handleCardMouseLeave = useCallback(() => {
    setActiveOffer && setActiveOffer(null);
  }, [setActiveOffer]);

  return (
    <div className={`${sectionClass} places__list ${tabsClass}`}>
      {offers.map((offer) => (
        <Card
          key={offer.id}
          offer={offer}
          onMouseEnter={handleCardMouseMove}
          onMouseLeave={handleCardMouseLeave}
          type={type}
          isMini={false}
        />))}
    </div>
  );
};

export default OffersList;
