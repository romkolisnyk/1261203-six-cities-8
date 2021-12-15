import classnames from 'classnames';
import { Offer } from '../../types/offer';
import PlaceCard from '../place-card/place-card';

type PlacesListProps = {
  offers: Offer[],
  onOfferHover: (offerId: number) => void,
  className?: string,
};

function PlacesList({ offers, onOfferHover, className }: PlacesListProps): JSX.Element {
  return (
    <div className={classnames('places__list tabs__content', className)}>
      {offers.map((offer) => (
        <PlaceCard
          offer={offer}
          key={offer.id}
          onOfferHover={onOfferHover}
        />
      ))}
    </div>
  );
}

export default PlacesList;
