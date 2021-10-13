import { BrowserRouter, Route, Switch } from 'react-router-dom';

import MainPage from '../main-page/main-page';
import NotFoundPage from '../not-found-page/not-found-page';
import FavoritesPage from '../favorites-page/favorites-page';
import LoginPage from '../login-page/login-page';
import PropertyPage from '../property-page/property-page';
import PrivateRoute from '../private-route/private-route';
import { AppRoute, AuthorizationStatus } from '../../const';
import { Offer } from '../../types/offer';

type AppScreenProps = {
  offers: Offer[];
}

function App({ offers }: AppScreenProps): JSX.Element {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={AppRoute.Root}>
          <MainPage offers={offers} />
        </Route>
        <Route exact path={AppRoute.Login}>
          <LoginPage />
        </Route>
        <PrivateRoute
          exact
          path={AppRoute.Favorites}
          authorizationStatus={AuthorizationStatus.Auth}
          render={() => <FavoritesPage offers={offers} />}
        />
        <Route exact path={AppRoute.Offer}>
          <PropertyPage />
        </Route>
        <Route>
          <NotFoundPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
