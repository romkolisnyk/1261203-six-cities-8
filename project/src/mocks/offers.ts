import { Offer } from '../types/offer';

export const offers: Offer[] = [
  {
    title: 'Beautiful & luxurious apartment at great location',
    image: 'img/apartment-01.jpg',
    price: 132,
    type: 'Apartment',
    rating: 4,
    id: 1,
    isBookmarked: false,
    isPremium: true,
  },
  {
    title: 'Wood and stone place',
    image: 'img/room.jpg',
    price: 80,
    type: 'Private Room',
    rating: 4,
    id: 2,
    isBookmarked: true,
    isPremium: false,
  },
  {
    title: 'Canal View Prinsengracht',
    image: 'img/apartment-02.jpg',
    price: 132,
    type: 'Apartment',
    rating: 4,
    id: 3,
    isBookmarked: false,
    isPremium: false,
  },
  {
    title: 'Nice, cozy, warm big bed apartment',
    image: 'img/apartment-03.jpg',
    price: 180,
    type: 'Apartment',
    rating: 5,
    id: 4,
    isBookmarked: false,
    isPremium: false,
  },
];
