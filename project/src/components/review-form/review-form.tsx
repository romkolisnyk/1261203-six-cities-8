import {ChangeEvent, FormEvent, Fragment, useEffect, useState} from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { postCommentAction } from '../../store/api-actions';
import { Ratings } from '../../const';

function ReviewForm(): JSX.Element {
  const [review, setReview] = useState({comment: '', rating: 0});
  const [isCompletedReview, setIsCompletedReview] = useState(false);
  const dispatch = useDispatch();
  const {id} = useParams<{id: string}>();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(postCommentAction(review, parseInt(id, 10)));
    setReview({comment: '', rating: 0});
    setIsCompletedReview(false);
  };

  const handleReviewChange = (e: FormEvent<HTMLTextAreaElement>) => {
    // TODO: Add debounce
    setReview({...review, comment: e.currentTarget.value});
  };

  const handleRatingChange = (e: ChangeEvent<HTMLInputElement>) => {
    setReview({...review, rating: parseInt(e.target.value, 10)});
  };

  useEffect(() => {
    setIsCompletedReview(review.comment.length >= 50 && review.rating !== 0);
  }, [review]);

  return (
    <form className="reviews__form form" onSubmit={handleSubmit}>
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {Ratings.map(({title, value}) => (
          <Fragment key={title}>
            <input
              className="form__rating-input visually-hidden"
              name="rating"
              value={value}
              id={`${value}-stars`}
              type="radio"
              checked={review.rating === value}
              onChange={handleRatingChange}
            />
            <label htmlFor={`${value}-stars`} className="reviews__rating-label form__rating-label" title={title}>
              <svg className="form__star-image" width="37" height="33">
                <use xlinkHref="#icon-star" />
              </svg>
            </label>
          </Fragment>
        ))}
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={review.comment}
        onChange={handleReviewChange}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe
          your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={!isCompletedReview}
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default ReviewForm;
