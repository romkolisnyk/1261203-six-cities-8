import { useEffect } from 'react';
import { connect, ConnectedProps, useDispatch } from 'react-redux';
import {Link, useParams} from 'react-router-dom';
import classnames from 'classnames';
import {
  fetchCurrentOfferAction,
  fetchCurrentOfferCommentsAction,
  fetchOffersNearbyAction
} from '../../store/api-actions';
import { convertRatingToPercents } from '../../utils/convertRatingToPercents';
import { State } from '../../types/state';
import { AuthorizationStatus } from '../../const';
import Header from '../header/header';
import ReviewForm from '../review-form/review-form';

const mapStateToProps = ({ currentOffer, currentOfferComments, offersNearby, authorizationStatus }: State) => ({
  offer: currentOffer,
  comments: currentOfferComments,
  offersNearby,
  authorizationStatus,
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

function PropertyPage({offer, comments, offersNearby, authorizationStatus}: PropsFromRedux): JSX.Element {
  const {id} = useParams<{id: string}>();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCurrentOfferAction(Number(id)));
    dispatch(fetchCurrentOfferCommentsAction(Number(id)));
    dispatch(fetchOffersNearbyAction(Number(id)));
  }, [dispatch, id]);

  return (
    <div className="page">
      <Header />
      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            <div className="property__gallery">
              {
                offer?.images.slice(0, 6).map((image, index) => (
                  <div className="property__image-wrapper" key={index.toString()}>
                    <img className="property__image" src={image} alt="Photo studio" />
                  </div>
                ))
              }
            </div>
          </div>
          <div className="property__container container">
            <div className="property__wrapper">
              {offer?.isPremium && <div className="property__mark"><span>Premium</span></div>}
              <div className="property__name-wrapper">
                <h1 className="property__name">{offer?.title}</h1>
                <button
                  className={classnames('property__bookmark-button button', {
                    'property__bookmark-button--active': offer?.isFavorite,
                  })}
                  type="button"
                >
                  <svg className="property__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark" />
                  </svg>
                  <span className="visually-hidden">
                    {offer?.isFavorite ? 'In bookmarks' : 'To bookmarks'}
                  </span>
                </button>
              </div>
              <div className="property__rating rating">
                <div className="property__stars rating__stars">
                  {offer && <span style={{width: `${convertRatingToPercents(offer.rating, 5)}%`}} />}
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="property__rating-value rating__value">{offer?.rating}</span>
              </div>
              <ul className="property__features">
                <li className="property__feature property__feature--entire">{offer?.type}</li>
                <li className="property__feature property__feature--bedrooms">{offer?.bedrooms} Bedrooms</li>
                <li className="property__feature property__feature--adults">Max {offer?.maxAdults} adults</li>
              </ul>
              <div className="property__price">
                <b className="property__price-value">&euro;{offer?.price}</b>
                <span className="property__price-text">&nbsp;night</span>
              </div>
              <div className="property__inside">
                <h2 className="property__inside-title">What&apos;s inside</h2>
                <ul className="property__inside-list">
                  {offer?.goods.map((good) => <li className="property__inside-item" key={good}>{good}</li>)}
                </ul>
              </div>
              <div className="property__host">
                <h2 className="property__host-title">Meet the host</h2>
                <div className="property__host-user user">
                  <div className="property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper">
                    <img className="property__avatar user__avatar" src={offer?.host.avatarUrl} width="74" height="74" alt="Host avatar" />
                  </div>
                  <span className="property__user-name">{offer?.host.name}</span>
                  <span className="property__user-status">{offer?.host.isPro}</span>
                </div>
                <div className="property__description">
                  <p className="property__text">{offer?.description}</p>
                </div>
              </div>
              <section className="property__reviews reviews">
                <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{comments.length}</span></h2>
                <ul className="reviews__list">
                  {
                    comments.map((comment) => (
                      <li className="reviews__item" key={comment.id}>
                        <div className="reviews__user user">
                          <div className="reviews__avatar-wrapper user__avatar-wrapper">
                            <img className="reviews__avatar user__avatar" src={comment.user.avatarUrl} width="54" height="54" alt="Reviews avatar" />
                          </div>
                          <span className="reviews__user-name">{comment.user.name}</span>
                        </div>
                        <div className="reviews__info">
                          <div className="reviews__rating rating">
                            <div className="reviews__stars rating__stars">
                              <span style={{ width: convertRatingToPercents(comment.rating, 5) }} />
                              <span className="visually-hidden">Rating</span>
                            </div>
                          </div>
                          <p className="reviews__text">{comment.comment}</p>
                          <time
                            className="reviews__time"
                            dateTime={new Date(comment.date).toLocaleDateString()}
                          >
                            {new Date(comment.date).toLocaleDateString('en-US', {month: 'long', year: 'numeric'})}
                          </time>
                        </div>
                      </li>
                    ))
                  }
                </ul>
                {authorizationStatus === AuthorizationStatus.Auth && <ReviewForm />}
              </section>
            </div>
          </div>
          <section className="property__map map" />
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <div className="near-places__list places__list">
              {offersNearby.map((offerNearby) => (
                <article className="near-places__card place-card" key={offerNearby.id}>
                  <div className="near-places__image-wrapper place-card__image-wrapper">
                    <Link to={`/offer/${offerNearby.id}`}>
                      <img className="place-card__image" src={offerNearby.previewImage} width="260" height="200" alt="Place image" />
                    </Link>
                  </div>
                  <div className="place-card__info">
                    <div className="place-card__price-wrapper">
                      <div className="place-card__price">
                        <b className="place-card__price-value">&euro;{offerNearby.price}</b>
                        <span className="place-card__price-text">&#47;&nbsp;night</span>
                      </div>
                      <button
                        className={classnames('place-card__bookmark-button button', {
                          'property__bookmark-button--active': offerNearby.isFavorite,
                        })}
                        type="button"
                      >
                        <svg className="place-card__bookmark-icon" width="18" height="19">
                          <use xlinkHref="#icon-bookmark" />
                        </svg>
                        <span className="visually-hidden">
                          {offerNearby.isFavorite ? 'In bookmarks' : 'To bookmarks'}
                        </span>
                      </button>
                    </div>
                    <div className="place-card__rating rating">
                      <div className="place-card__stars rating__stars">
                        <span style={{ width: '80%' }} />
                        <span className="visually-hidden">Rating</span>
                      </div>
                    </div>
                    <h2 className="place-card__name">
                      <Link to={`/offer/${offerNearby.id}`}>{offerNearby.title}</Link>
                    </h2>
                    <p className="place-card__type">{offerNearby.type}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export {PropertyPage};

export default connector(PropertyPage);
