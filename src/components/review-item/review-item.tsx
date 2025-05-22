import {Review} from '../../types/review';

const STARS_COUNT = 5;
const MAX_PERCENT_STARS_WIDTH = 100;

type ReviewProps = {
  review: Review;
}

const normalizeDate = (date: string) => {
  const dateObj = new Date(date);
  const monthName = dateObj.toLocaleString('en-US', { month: 'long' });
  const year = dateObj.getFullYear();
  return `${monthName} ${year}`;
};
const getReviewDatetime = (date: string) => {
  const dateObj: Date = new Date(date);
  const year = dateObj.getFullYear();
  const month = dateObj.toLocaleString('en-US', { month: '2-digit' });
  const day = dateObj.toLocaleString('en-US', { day: '2-digit'});
  return `${year}-${month}-${day}`;
};

const ReviewItem = ({review}: ReviewProps):JSX.Element => (
  <li className="reviews__item">
    <div className="reviews__user user">
      <div className="reviews__avatar-wrapper user__avatar-wrapper">
        <img className="reviews__avatar user__avatar" src={review.user.avatarUrl} width="54" height="54"
          alt="Reviews avatar"
        />
      </div>
      <span className="reviews__user-name">
        {review.user.name.split('.')[0]}
      </span>
    </div>
    <div className="reviews__info">
      <div className="reviews__rating rating">
        <div className="reviews__stars rating__stars">
          <span style={{width: `${(MAX_PERCENT_STARS_WIDTH * review.rating) / STARS_COUNT}%`}}></span>
          <span className="visually-hidden">{`Rating: ${review.rating} stars`}</span>
        </div>
      </div>
      <p className="reviews__text">
        {review.comment}
      </p>
      <time className="reviews__time" dateTime={getReviewDatetime(review.date)}>{normalizeDate(review.date)}</time>
    </div>
  </li>
);

export default ReviewItem;
