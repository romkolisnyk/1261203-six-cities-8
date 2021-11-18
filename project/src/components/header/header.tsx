import { Link } from 'react-router-dom';
import { connect, ConnectedProps } from 'react-redux';
import { AppRoute, AuthorizationStatus } from '../../const';
import { State } from '../../types/state';
import { logoutAction } from '../../store/api-actions';
import { ThunkAppDispatch } from '../../store/action';

const mapStateToProps = ({authorizationStatus, userData}: State) => ({
  authorizationStatus,
  email: userData?.email,
});

const mapDispatchToProps = (dispatch: ThunkAppDispatch) => ({
  onLogout() {
    dispatch(logoutAction());
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

function Header({authorizationStatus, email, onLogout}: PropsFromRedux): JSX.Element {
  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link className="header__logo-link header__logo-link--active" to='/'>
              <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
            </Link>
          </div>
          <nav className="header__nav">
            {
              authorizationStatus === AuthorizationStatus.NoAuth
                ?
                <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Login}>
                  <span className="header__user-name">Log in</span>
                </Link>
                :
                <ul className="header__nav-list">
                  <li className="header__nav-item user">
                    <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Favorites}>
                      <div className="header__avatar-wrapper user__avatar-wrapper" />
                      <span className="header__user-name user__name">{email}</span>
                    </Link>
                  </li>
                  <li className="header__nav-item">
                    <a className="header__nav-link" href="#" onClick={onLogout}>
                      <span className="header__signout">Sign out</span>
                    </a>
                  </li>
                </ul>
            }
          </nav>
        </div>
      </div>
    </header>
  );
}

export {Header};

export default connector(Header);
