export type UserFromServer = {
  id: number,
  email: string,
  name: string,
  'avatar_url': string,
  'is_pro': boolean,
};

export type User = {
  id: number,
  email: string,
  name: string,
  avatarUrl: string,
  isPro: boolean,
};
