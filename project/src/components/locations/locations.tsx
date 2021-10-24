import classnames from 'classnames';
import { City } from '../../const';

type LocationsProps = {
  cities: string[],
  activeCity: City,
}

function Locations({ cities, activeCity }: LocationsProps): JSX.Element {
  return (
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {cities.map((city) => (
          <li className="locations__item" key={city}>
            <a
              className={classnames('locations__item-link tabs__item', {
                'tabs__item--active': activeCity === city,
              })}
              href="#"
            >
              <span>{city}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Locations;
