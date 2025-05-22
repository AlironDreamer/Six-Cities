import {Offer} from '../../types/offer';
import {Link} from 'react-router-dom';
import React from 'react';
import Bookmark from '../bookmark/bookmark';

const STARS_COUNT = 5;
const MAX_PERCENT_STARS_WIDTH = 100;

type CardProps = {
  offer: Offer;
  onMouseEnter?: (id: number) => void;
  onMouseLeave?: () => void;
  type?: 'default' | 'favorite' | 'near';
  isMini?: boolean;
}

const cardTypes = {
  default: {
    mainTypeClass: 'cities__place-card',
    imageWrapperClass: 'cities__image-wrapper',
    cardInfoClass: ''
  },
  favorite: {
    mainTypeClass: 'favorites__card',
    imageWrapperClass: 'favorites__image-wrapper',
    cardInfoClass: 'favorites__card-info'
  },
  near: {
    mainTypeClass: 'near-places__card',
    imageWrapperClass: 'near-places__image-wrapper',
    cardInfoClass: ''
  }
};

function Card({offer, onMouseEnter, onMouseLeave, type = 'default', isMini = false}: CardProps): JSX.Element {
  const { mainTypeClass, imageWrapperClass, cardInfoClass } = cardTypes[type] || cardTypes.default;

  return (
    <article
      className={`${mainTypeClass} place-card`}
      {...(type === 'default'
        ? { onMouseEnter: () => onMouseEnter?.(offer.id), onMouseLeave }
        : {})}
    >
      <div className={`${imageWrapperClass} place-card__image-wrapper`}>
        <Link to={`/offer/${offer.id}`}>
          <img
            className="place-card__image"
            src={offer.previewImage}
            width={isMini ? 150 : 260}
            height={isMini ? 110 : 200}
            alt="Place image"
          />
        </Link>
      </div>
      {offer.isPremium
        ? (
          <div className="place-card__mark">
            <span>Premium</span>
          </div>
        )
        : ''}
      <div className={`${cardInfoClass} place-card__info`}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{offer.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <Bookmark id={offer.id} isActive={offer.isFavorite}/>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `${(MAX_PERCENT_STARS_WIDTH * offer.rating) / STARS_COUNT}%`}}></span>
            <span className="visually-hidden">{`Rating: ${offer.rating} stars`}</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`/offer/${offer.id}`}>{offer.title}</Link>
        </h2>
        <p className="place-card__type">{offer.type}</p>
      </div>
    </article>
  );
}

export default React.memo(Card, (prevProps, nextProps) => prevProps.offer.isFavorite === nextProps.offer.isFavorite);
