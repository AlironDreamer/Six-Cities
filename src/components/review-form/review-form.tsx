import React, {ChangeEvent, Fragment, useState} from 'react';
import {STARS_COUNT} from '../../const';
import {postReviewAction} from '../../store/api-actions';
import {useParams} from 'react-router-dom';
import {useAppDispatch} from '../../hooks/use-app-dispatch/useAppDispatch';


const ReviewForm = (): JSX.Element => {
  const [stars, setStars] = useState<number | null>(null);
  const [reviewText, setReviewText] = useState<string>('');
  const {id} = useParams();
  const dispatch = useAppDispatch();

  const handleStarClick = (evt: ChangeEvent<HTMLInputElement>) => {
    setStars(Number(evt.currentTarget.value));
  };

  const handleReviewInput = (evt: ChangeEvent<HTMLTextAreaElement>) => {
    setReviewText(evt.currentTarget.value);
  };

  const handleFormSubmit = (evt: React.MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    if (id && stars) {
      const target = evt.currentTarget;
      target.disabled = true;
      const commentData = {
        id: Number(id),
        reviewBase: {
          comment: reviewText,
          rating: stars,
        }
      };
      dispatch(postReviewAction(commentData))
        .unwrap()
        .then((data) => {
          target.disabled = false;
          setStars(null);
          setReviewText('');
        })
        .catch((err) => {
          target.disabled = false;
        });
    }

  };

  return (
    <form className="reviews__form form" action="#" method="post">
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {Array.from({ length: STARS_COUNT }, (_, i) => (
          <Fragment key={`Star ${STARS_COUNT - i}`}>
            <input
              className="form__rating-input visually-hidden"
              name="rating"
              value={STARS_COUNT - i}
              id={`${STARS_COUNT - i}-stars`}
              type="radio"
              onChange={handleStarClick}
              checked={STARS_COUNT - i === stars}
            />
            <label
              htmlFor={`${STARS_COUNT - i}-stars`}
              className="reviews__rating-label form__rating-label"
            >
              <svg className="form__star-image" width="37" height="33">
                <use xlinkHref="#icon-star"></use>
              </svg>
            </label>
          </Fragment>
        ))}
      </div>
      <textarea className="reviews__textarea form__textarea" id="review" name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        onChange={handleReviewInput}
        value={reviewText}
      >
      </textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay
          with at least <b className="reviews__text-amount">50 characters</b> and not more <b className="reviews__text-amount">300 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          onClick={handleFormSubmit}
          disabled = {stars === null || reviewText.length < 50 || reviewText.length > 300}
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default ReviewForm;
