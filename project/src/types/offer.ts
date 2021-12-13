import { CityName } from '../const';

export type Location = {
  latitude: number;
  longitude: number;
  zoom: number;
};

export type City = {
  location: Location,
  name: CityName,
};

export type Host = {
  id: number,
  name: string,
  isPro: boolean,
  avatarUrl: string,
};

export type HostFromServer = Omit<Host, 'isPro' | 'avatarUrl'> & {
  'is_pro': boolean,
  'avatar_url': string,
};

export type Offer = {
  city: City,
  previewImage: string,
  images: string[],
  title: string,
  isFavorite: boolean,
  isPremium: boolean,
  rating: number,
  type: string,
  bedrooms: number,
  maxAdults: number,
  price: number,
  goods: string[],
  description: string,
  location: Location,
  id: number,
  host: Host,
};

export type OfferFromServer = Omit<Offer, 'previewImage' | 'isFavorite' | 'isPremium' | 'maxAdults'> & {
  'preview_image': string,
  'is_favorite': boolean,
  'is_premium': boolean,
  'max_adults': number,
  host: HostFromServer,
};
