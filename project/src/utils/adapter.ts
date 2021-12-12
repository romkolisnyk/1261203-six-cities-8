import { Offer, OfferFromServer } from '../types/offer';
import { User, UserFromServer } from '../types/user';
import { Comment, CommentFromServer } from '../types/comment';

export class Adapter {
  static offerToClient(offer: OfferFromServer): Offer {
    return {
      ...offer,
      previewImage: offer['preview_image'],
      isFavorite: offer['is_favorite'],
      isPremium: offer['is_premium'],
      maxAdults: offer['max_adults'],
      host: {
        ...offer.host,
        isPro: offer.host['is_pro'],
        avatarUrl: offer.host['avatar_url'],
      },
    };
  }

  static userDataToClient(userData: UserFromServer): User {
    return {
      ...userData,
      avatarUrl: userData['avatar_url'],
      isPro: userData['is_pro'],
    };
  }

  static offerCommentToClient(comment: CommentFromServer): Comment {
    return {
      ...comment,
      user: {
        ...comment.user,
        isPro: comment.user['is_pro'],
        avatarUrl: comment.user['avatar_url'],
      },
    };
  }
}
