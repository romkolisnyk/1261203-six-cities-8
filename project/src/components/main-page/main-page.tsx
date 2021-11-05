import { useState } from 'react';
import { Dispatch } from 'redux';
import { connect, ConnectedProps } from 'react-redux';

import PlacesList from '../places-list/places-list';
import Header from '../header/header';
import Map from '../map/map';
import Locations from '../locations/locations';
import Spinner from '../spinner/spinner';
import PlacesSort from '../places-sort/places-sort';
import { State } from '../../types/state';
import { Actions } from '../../types/action';
import { changeCity } from '../../store/action';
import { store } from '../../store/store';
import { City } from '../../types/offer';
import { CityName } from '../../const';

const mapStateToProps = ({ city, offers }: State) => ({
  city,
  offers,
});

const mapDispatchToProps = (dispatch: Dispatch<Actions>) => ({
  onCityChange(city: City) {
    dispatch(changeCity(city));
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

function MainPage({ offers, city }: PropsFromRedux): JSX.Element {
  const [activeOfferId, setActiveOfferId] = useState(0);

  const onOfferHover = (offerId: number) => setActiveOfferId(offerId);

  return (
    <div className="page page--gray page--main">
      <Header />
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <Locations cities={Object.values(CityName)} activeCity={city.name} />
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            {
              store.getState().offers.length === 0
                ?
                <section className="cities__left-section">
                  <Spinner />
                </section>
                :
                <section className="cities__left-section places">
                  <h2 className="visually-hidden">Places</h2>
                  <b className="places__found">{offers.length} places to stay in {city.name}</b>
                  <PlacesSort />
                  <PlacesList
                    offers={offers}
                    onOfferHover={onOfferHover}
                  />
                </section>
            }
            <div className="cities__right-section">
              <Map
                offers={offers}
                activeOfferId={activeOfferId}
                city={store.getState().city}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export {MainPage};

export default connector(MainPage);
