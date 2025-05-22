import {Offer} from '../types/offer';

export const offers: Offer[] = [
  {
    bedrooms: 3,
    city: {
      location: {
        latitude: 52.3909553943508,
        longitude: 4.85309666406198,
        zoom: 10
      },
      name: 'Amsterdam'
    },
    description: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
    goods: [
      'Heating'
    ],
    host: {
      avatarUrl: 'img/1.png',
      id: 3,
      isPro: true,
      name: 'Angelina'
    },
    id: 10,
    images: [
      'img/apartment-01.jpg'
    ],
    isFavorite: true,
    isPremium: true,
    location: {
      latitude: 52.35514938496378,
      longitude: 4.673877537499948,
      zoom: 8
    },
    maxAdults: 4,
    previewImage: 'img/apartment-01.jpg',
    price: 120,
    rating: 4.8,
    title: 'Beautiful & luxurious studio at great location',
    type: 'apartment'
  },
  {
    bedrooms: 2,
    city: {
      location: {
        latitude: 52.3909553943508,
        longitude: 4.85309666406198,
        zoom: 10
      },
      name: 'Paris'
    },
    description: 'Modern apartment in the heart of Amsterdam, featuring unique design and comfortable amenities.',
    goods: ['Wi-Fi', 'Air Conditioning'],
    host: {
      avatarUrl: 'img/2.png',
      id: 7,
      isPro: false,
      name: 'John'
    },
    id: 11,
    images: ['img/apartment-02.jpg'],
    isFavorite: false,
    isPremium: false,
    location: {
      latitude: 52.367,
      longitude: 4.900,
      zoom: 8
    },
    maxAdults: 3,
    previewImage: 'img/apartment-02.jpg',
    price: 100,
    rating: 2.3,
    title: 'Cozy apartment in central Amsterdam',
    type: 'apartment'
  },
  {
    bedrooms: 4,
    city: {
      location: {
        latitude: 52.3909553943508,
        longitude: 4.85309666406198,
        zoom: 10
      },
      name: 'Amsterdam'
    },
    description: 'Spacious apartment with modern amenities and a beautiful view of the canals in Amsterdam.',
    goods: ['Heating', 'Kitchen', 'Cable TV'],
    host: {
      avatarUrl: 'img/3.png',
      id: 4,
      isPro: true,
      name: 'Sophia'
    },
    id: 12,
    images: ['img/apartment-03.jpg'],
    isFavorite: true,
    isPremium: true,
    location: {
      latitude: 52.380,
      longitude: 4.890,
      zoom: 8
    },
    maxAdults: 6,
    previewImage: 'img/apartment-03.jpg',
    price: 150,
    rating: 4.9,
    title: 'Spacious family apartment near the canal',
    type: 'apartment'
  },
  {
    bedrooms: 1,
    city: {
      location: {
        latitude: 48.85661,
        longitude: 2.351499,
        zoom: 10
      },
      name: 'Paris'
    },
    description: 'Charming studio apartment in a quiet neighborhood of Amsterdam, perfect for a short stay.',
    goods: ['Wi-Fi', 'Washing machine'],
    host: {
      avatarUrl: 'img/1.png',
      id: 5,
      isPro: false,
      name: 'Michael'
    },
    id: 13,
    images: ['img/apartment-01.jpg'],
    isFavorite: false,
    isPremium: false,
    location: {
      latitude: 48.84,
      longitude: 2.37,
      zoom: 8
    },
    maxAdults: 2,
    previewImage: 'img/apartment-01.jpg',
    price: 80,
    rating: 4.0,
    title: 'Charming studio in a quiet corner',
    type: 'studio'
  }
];
