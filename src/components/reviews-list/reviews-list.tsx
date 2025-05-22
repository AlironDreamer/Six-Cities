import {Review} from '../../types/review';
import ReviewItem from '../review-item/review-item';

type ReviewsListProps = {
  reviews: Review[];
}

const sortByDate = (a: Review, b: Review) => new Date(b.date).getTime() - new Date(a.date).getTime();

const ReviewsList = ({reviews}: ReviewsListProps): JSX.Element => (
  <ul className="reviews__list">
    {reviews.slice(0,10).sort(sortByDate).map((review) => <ReviewItem key={review.id} review={review} />)}
  </ul>
);

export default ReviewsList;
