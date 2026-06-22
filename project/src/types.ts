export interface FormData {
  name: string;
  preferredName: string;
  age: number | '';
  city: string;
  dataConsent: boolean;
}

export interface Product {
  id: number;
  name: string;
  oldPrice: number;
  newPrice: number;
  image: string;
}

export const products: Product[] = [
  {
    id: 1,
    name: 'Беспроводные наушники',
    oldPrice: 3490,
    newPrice: 0,
    image: 'https://images.pexels.com/photos/3950250/pexels-photo-3950250.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    id: 2,
    name: 'Увлажнитель воздуха',
    oldPrice: 2990,
    newPrice: 0,
    image: 'https://images.pexels.com/photos/4107120/pexels-photo-4107120.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    id: 3,
    name: 'Смарт-часы',
    oldPrice: 4990,
    newPrice: 0,
    image: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    id: 4,
    name: 'Термокружка',
    oldPrice: 1490,
    newPrice: 0,
    image: 'https://images.pexels.com/photos/1793035/pexels-photo-1793035.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    id: 5,
    name: 'Рюкзак городской',
    oldPrice: 2790,
    newPrice: 0,
    image: 'https://images.pexels.com/photos/2905238/pexels-photo-2905238.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    id: 6,
    name: 'LED-лампа настольная',
    oldPrice: 1990,
    newPrice: 0,
    image: 'https://images.pexels.com/photos/1112580/pexels-photo-1112580.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
];
