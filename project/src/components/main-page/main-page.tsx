import { useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';

import PlacesList from '../places-list/places-list';
import Header from '../header/header';
import Map from '../map/map';
import Locations from '../locations/locations';
import Spinner from '../spinner/spinner';
import PlacesSort from '../places-sort/places-sort';
import { State } from '../../types/state';
import { filterOffersByCity } from '../../utils/filterOffersByCity';

const mapStateToProps = ({ currentCityName, offers }: State) => ({
  currentCityName,
  offers: filterOffersByCity(offers, currentCityName),
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

function MainPage({ offers, currentCityName }: PropsFromRedux): JSX.Element {
  const [activeOfferId, setActiveOfferId] = useState(0);

  const onOfferHover = (offerId: number) => setActiveOfferId(offerId);

  return (
    <div className="page page--gray page--main">
      <Header />
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <Locations />
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            {
              offers.length === 0
                ?
                <Spinner />
                :
                <>
                  <section className="cities__places places">
                    <h2 className="visually-hidden">Places</h2>
                    <b className="places__found">{offers.length} places to stay in {currentCityName}</b>
                    <PlacesSort />
                    <PlacesList
                      offers={offers}
                      onOfferHover={onOfferHover}
                    />
                  </section>
                  <div className="cities__right-section">
                    <Map
                      offers={offers}
                      activeOfferId={activeOfferId}
                    />
                  </div>
                </>
            }
          </div>
        </div>
      </main>
    </div>
  );
}

export {MainPage};

export default connector(MainPage);
