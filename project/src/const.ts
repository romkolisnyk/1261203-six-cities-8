export enum AppRoute {
  Root = '/',
  Favorites = '/favorites',
  Login = '/login',
  Offer = '/offer/:id',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NOAUTH',
  Unknown = 'UNKNOWN',
}
