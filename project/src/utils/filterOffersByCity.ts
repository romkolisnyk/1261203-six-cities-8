import { Offer } from '../types/offer';
import { CityName } from '../const';

export const filterOffersByCity = (offers: Offer[], cityName: CityName): Offer[] => offers.filter((offer) => offer.city.name === cityName);
