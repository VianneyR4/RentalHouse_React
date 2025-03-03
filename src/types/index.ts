export interface Property {
  id: number;
  title: string;
  description: string;
  beds: number;
  baths: number;
  size: string;
  pricePerNight: number;
  location: string;
  hostId: string;
  images: string[];
  purpose: 'Buy' | 'Rent';
  type: 'House' | 'Apartment' | 'Villa';
}

export interface User {
  id: string;
  googleId: string;
  name: string;
  email: string;
  role: 'host' | 'renter';
  avatar?: string;
}

export interface Booking {
  id: string;
  propertyId: string;
  renterId: string;
  hostId: string;
  checkIn: Date;
  checkOut: Date;
  datesArray: string[];
  status: 'pending' | 'confirmed' | 'canceled';
} 

export interface Testimonial {
  id: number;
  text: string;
  name: string;
  role: string;
}