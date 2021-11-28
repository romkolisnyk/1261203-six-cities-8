import { Offer, OfferFromServer } from '../types/offer';
import { User, UserFromServer } from '../types/user';

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
}
