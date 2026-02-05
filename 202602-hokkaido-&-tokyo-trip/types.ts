export enum ActivityType {
  FLIGHT = 'flight',
  HOTEL = 'hotel',
  FOOD = 'food',
  SIGHTSEEING = 'sightseeing',
  TRANSPORT = 'transport',
  SHOPPING = 'shopping',
  NOTE = 'note'
}

export interface ActivityOption {
  name: string;
  hours?: string;
  link?: string;
  tags?: string[];
}

export interface Activity {
  time?: string;
  title: string;
  description?: string;
  type: ActivityType;
  tags?: string[];
  location?: string;
  details?: string[]; // For specific instructions like bus numbers or menu items
  image?: string; // Optional image URL for visual reference
  link?: string; // Google Maps or official website link
  options?: ActivityOption[]; // Multiple restaurant/place options
}

export interface DayItinerary {
  day: number;
  date: string;
  weekday: string;
  title: string;
  location: string;
  hotel?: string;
  hotelAddress?: string;
  activities: Activity[];
}

export interface FlightInfo {
  code: string;
  route: string;
  time: string;
  description?: string;
}

export interface HotelInfo {
  name: string;
  address: string;
  phone?: string;
  checkIn?: string;
  link?: string;
}