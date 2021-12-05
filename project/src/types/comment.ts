import { Host, HostFromServer } from './offer';

export type CommentFromServer = {
  id: number,
  user: HostFromServer,
  rating: number,
  comment: string,
  date: string
};

export type Comment = {
  id: number,
  user: Host,
  rating: number,
  comment: string,
  date: string
};
