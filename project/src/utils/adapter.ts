import { Offer, OfferFromServer } from '../types/offer';
import { User, UserFromServer } from '../types/user';
import { Comment, CommentFromServer } from '../types/comment';

export class Adapter {
  static offerToClient(offer: OfferFromServer): Offer {
    return {
      city: offer['city'],
      previewImage: offer['preview_image'],
      images: offer['images'],
      title: offer['title'],
      isFavorite: offer['is_favorite'],
      isPremium: offer['is_premium'],
      rating: offer['rating'],
      type: offer['type'],
      bedrooms: offer['bedrooms'],
      maxAdults: offer['max_adults'],
      price: offer['price'],
      goods: offer['goods'],
      description: offer['description'],
      location: offer['location'],
      id: offer['id'],
      host: {
        id: offer.host['id'],
        name: offer.host['name'],
        isPro: offer.host['is_pro'],
        avatarUrl: offer.host['avatar_url'],
      },
    };
  }

  static userDataToClient(userData: UserFromServer): User {
    return {
      id: userData['id'],
      email: userData['email'],
      name: userData['name'],
      avatarUrl: userData['avatar_url'],
      isPro: userData['is_pro'],
    };
  }

  static offerCommentToClient(comment: CommentFromServer): Comment {
    return {
      id: comment['id'],
      user: {
        id: comment.user['id'],
        name: comment.user['name'],
        isPro: comment.user['is_pro'],
        avatarUrl: comment.user['avatar_url'],
      },
      rating: comment['rating'],
      comment: comment['comment'],
      date: comment['date'],
    };
  }
}
