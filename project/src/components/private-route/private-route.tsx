import { RouteProps, Route, Redirect } from 'react-router-dom';
import { connect, ConnectedProps } from 'react-redux';
import { AuthorizationStatus, AppRoute } from '../../const';
import { State } from '../../types/state';

type PrivateRouteProps = RouteProps & {
  render: () => JSX.Element,
};

const mapStateToProps = ({authorizationStatus}: State) => ({ authorizationStatus });

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = PropsFromRedux & PrivateRouteProps;

function PrivateRoute(props: ConnectedComponentProps): JSX.Element {
  const {
    exact,
    path,
    render,
    authorizationStatus,
  } = props;

  return (
    <Route
      exact={exact}
      path={path}
      render={() => (
        authorizationStatus === AuthorizationStatus.Auth
          ? render()
          : <Redirect to={AppRoute.Login} />
      )}
    />
  );
}

export {PrivateRoute};

export default connector(PrivateRoute);
