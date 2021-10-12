import { Offer } from '../../types/offer';
import PlaceCard from '../place-card/place-card';

type PlacesListProps = {
  offers: Offer[]
};

function PlacesList({ offers }: PlacesListProps): JSX.Element {
  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => (
        <PlaceCard
          {...offer}
          key={offer.id}
        />
      ))}
    </div>
  );
}

export default PlacesList;
