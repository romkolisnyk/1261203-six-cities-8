import { Offer } from '../../types/offer';
import PlaceCard from '../place-card/place-card';

type PlacesListProps = {
  offers: Offer[],
  onOfferHover: (offerId: number) => void,
};

function PlacesList({ offers, onOfferHover }: PlacesListProps): JSX.Element {
  return (
    <div className="cities__places-list places__list tabs__content">
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
