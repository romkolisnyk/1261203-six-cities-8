export type User = {
  id: number,
  email: string,
  name: string,
  avatarUrl: string,
  isPro: boolean,
};

export type UserFromServer = Omit<User, 'avatarUrl' | 'isPro'> & {
  'avatar_url': string,
  'is_pro': boolean,
};
