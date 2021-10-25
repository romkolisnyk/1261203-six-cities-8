import { useState } from 'react';
import { Dispatch } from 'redux';
import { connect, ConnectedProps } from 'react-redux';

import PlacesList from '../places-list/places-list';
import Header from '../header/header';
import Map from '../map/map';
import Locations from '../locations/locations';
import { City } from '../../const';
import { State } from '../../types/state';
import { Actions } from '../../types/action';
import { changeCity } from '../../store/action';
import { cities } from '../../mocks/cities';

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
          <Locations cities={cities} activeCity={city} />
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{offers.length} places to stay in Amsterdam</b>
              <form className="places__sorting" action="#" method="get">
                <span className="places__sorting-caption">Sort by</span>
                <span className="places__sorting-type" tabIndex={0}>
                  Popular
                  <svg className="places__sorting-arrow" width="7" height="4">
                    <use xlinkHref="#icon-arrow-select" />
                  </svg>
                </span>
                <ul className="places__options places__options--custom places__options--opened">
                  <li className="places__option places__option--active" tabIndex={0}>Popular</li>
                  <li className="places__option" tabIndex={0}>Price: low to high</li>
                  <li className="places__option" tabIndex={0}>Price: high to low</li>
                  <li className="places__option" tabIndex={0}>Top rated first</li>
                </ul>
              </form>
              <PlacesList
                offers={offers}
                onOfferHover={onOfferHover}
              />
            </section>
            <div className="cities__right-section">
              <Map
                offers={offers}
                activeOfferId={activeOfferId}
                city={offers[0].city}
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
