import { Dispatch } from '@reduxjs/toolkit';
import { connect, ConnectedProps } from 'react-redux';
import classnames from 'classnames';
import { CityName } from '../../const';
import { changeCity } from '../../store/action';
import { Actions } from '../../types/action';
import { State } from '../../types/state';

const mapStateToProps = ({ currentCityName }: State) => ({ currentCityName });

const mapDispatchToProps = (dispatch: Dispatch<Actions>) => ({
  onCityChange(cityName: CityName) {
    dispatch(changeCity(cityName));
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

function Locations({ currentCityName, onCityChange }: PropsFromRedux): JSX.Element {
  return (
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {Object.keys(CityName).map((city) => (
          <li className="locations__item" key={city}>
            <a
              className={classnames('locations__item-link tabs__item', {
                'tabs__item--active': currentCityName === city,
              })}
              href="#"
              onClick={() => onCityChange(city as CityName)}
            >
              <span>{city}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
export {Locations};

export default connector(Locations);
