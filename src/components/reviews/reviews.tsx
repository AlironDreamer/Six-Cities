import ReviewForm from '../review-form/review-form';
import {Review} from '../../types/review';
import ReviewsList from '../reviews-list/reviews-list';
import {useAppSelector} from '../../hooks/use-app-selector/useAppSelector';
import {AuthorizationStatus} from '../../const';
import React from 'react';
import {getAuthorizationStatus} from '../../store/user-process/selectors';

type ReviewsProps = {
  reviews: Review[];
}

const isAuthorized = (authStatus: AuthorizationStatus): boolean =>
  authStatus === AuthorizationStatus.Auth;

const Reviews = ({reviews}: ReviewsProps): JSX.Element => {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  return (
    <section className="property__reviews reviews">
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>
      <ReviewsList reviews={reviews} />
      {isAuthorized(authorizationStatus)
        ? <ReviewForm/>
        :
        <p className='reviews__auth-request' style={{textAlign: 'center'}}>
           Sign in to leave a comment
        </p>}
    </section>
  );
};

export default Reviews;
