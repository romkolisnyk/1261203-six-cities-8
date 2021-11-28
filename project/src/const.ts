export enum CityName {
  Paris = 'Paris',
  Cologne = 'Cologne',
  Brussels = 'Brussels',
  Amsterdam = 'Amsterdam',
  Hamburg = 'Hamburg',
  Dusseldorf = 'Dusseldorf',
}

export enum AppRoute {
  Root = '/',
  Favorites = '/favorites',
  Login = '/login',
  Offer = '/offer/:id',
}

export enum APIRoute {
  GetOffers = '/hotels',
  GetOffer = '/hotels/:id',
  GetNearOffers = '/hotels/:hotel_id/nearby',
  GetFavorites = '/favorite',
  PostFavorite = '/favorite/:hotel_id/:status',
  GetComments = '/comments/:hotel_id',
  PostComment = '/comments/:hotel_id',
  Login = '/login',
  Logout = '/logout',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NOAUTH',
}

export const URL_MARKER_DEFAULT = 'img/pin.svg';
export const URL_MARKER_CURRENT = 'img/pin-active.svg';

export const MAP_ICON_SIZE = {
  height: 28,
  width: 40,
};
export const MAP_ICON_ANCHOR = {
  midPoint: 14,
  bottomPoint: 40,
};
export const MAP_LAYER = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';

export const AUTH_TOKEN_KEY_NAME = 'six-cities-token';
