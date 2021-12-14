import { useEffect, useState } from 'react';
import { connect, ConnectedProps, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
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
import Spinner from '../spinner/spinner';
import Map from '../map/map';
import PlacesList from '../places-list/places-list';

const mapStateToProps = ({ currentOffer, currentOfferComments, offersNearby, authorizationStatus, offerLoading }: State) => ({
  offer: currentOffer,
  comments: currentOfferComments,
  offersNearby,
  authorizationStatus,
  offerLoading,
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

function PropertyPage({offer, comments, offersNearby, authorizationStatus, offerLoading}: PropsFromRedux): JSX.Element {
  const {id} = useParams<{id: string}>();
  const dispatch = useDispatch();
  const [activeOfferId, setActiveOfferId] = useState(0);

  const onOfferHover = (offerId: number) => setActiveOfferId(offerId);

  useEffect(() => {
    dispatch(fetchCurrentOfferAction(parseInt(id, 10)));
    dispatch(fetchCurrentOfferCommentsAction(parseInt(id, 10)));
    dispatch(fetchOffersNearbyAction(parseInt(id, 10)));
  }, [dispatch, id]);

  return (
    <div className="page">
      <Header />
      <main className="page__main page__main--property">
        {
          offerLoading ? <Spinner /> :
            <>
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
                {
                  offersNearby.length &&
                  <Map
                    offers={offersNearby}
                    activeOfferId={activeOfferId}
                    className="property__map"
                  />
                }
              </section>
              <div className="container">
                <section className="near-places places">
                  <h2 className="near-places__title">Other places in the neighbourhood</h2>
                  <PlacesList
                    offers={offersNearby}
                    onOfferHover={onOfferHover}
                    className="near-places__list"
                  />
                </section>
              </div>
            </>
        }
      </main>
    </div>
  );
}

export {PropertyPage};

export default connector(PropertyPage);
