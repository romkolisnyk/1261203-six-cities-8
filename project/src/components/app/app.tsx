import { Router as BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import MainPage from '../main-page/main-page';
import NotFoundPage from '../not-found-page/not-found-page';
import FavoritesPage from '../favorites-page/favorites-page';
import LoginPage from '../login-page/login-page';
import PropertyPage from '../property-page/property-page';
import PrivateRoute from '../private-route/private-route';
import { AppRoute } from '../../const';
import browserHistory from '../../browser-history';

function App(): JSX.Element {
  return (
    <BrowserRouter history={browserHistory}>
      <Switch>
        <Route exact path={AppRoute.Root}>
          <MainPage />
        </Route>
        <Route exact path={AppRoute.Login}>
          <LoginPage />
        </Route>
        <PrivateRoute
          exact
          path={AppRoute.Favorites}
          render={() => <FavoritesPage />}
        />
        <Route exact path={AppRoute.Offer}>
          <PropertyPage />
        </Route>
        <Route path={AppRoute.NotFound}>
          <NotFoundPage />
        </Route>
        <Redirect to="/404" />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
