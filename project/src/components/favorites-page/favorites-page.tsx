import { connect, ConnectedProps } from 'react-redux';

import FavoritesCard from '../favorites-card/favorites-card';
import Header from '../header/header';
import Footer from '../footer/footer';
import { State } from '../../types/state';

const mapStateToProps = ({ offers }: State) => ({ offers });

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

function FavoritesPage({ offers }: PropsFromRedux): JSX.Element {
  const favoriteOffers = offers.filter((offer) => offer.isFavorite);

  return (
    <div className="page">
      <Header />
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              <li className="favorites__locations-items">
                <div className="favorites__locations locations locations--current">
                  <div className="locations__item">
                    <a className="locations__item-link" href="#">
                      <span>Amsterdam</span>
                    </a>
                  </div>
                </div>
                <div className="favorites__places">
                  {favoriteOffers.map((offer) => <FavoritesCard offer={offer} key={offer.id} />)}
                </div>
              </li>
            </ul>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export {FavoritesPage};

export default connector(FavoritesPage);
