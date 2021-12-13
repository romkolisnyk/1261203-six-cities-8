import { Host, HostFromServer } from './offer';

export type Comment = {
  id: number,
  user: Host,
  rating: number,
  comment: string,
  date: string
};

export type CommentFromServer = Comment & {
  user: HostFromServer,
};

export type CommentPost = {
  comment: string,
  rating: number,
};
