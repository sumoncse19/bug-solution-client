export interface Service {
  id: number | string;
  uuid: string;
  name: string;
  slug: string;
  description: string;
  created_at: string;
  updated_at: string;
  created_by: number | null;
  updated_by: number | null;
  is_deleted: boolean;
}

export type InstructorData = {
  name: '';
  image: '';
};

export type CourseDetails = {
  id: number;
  title: string;
  slug: string;
  image: string | null;
  short_description: string;
  price: string;
  discounted_price: string;
  discount_percentage: string;
  review_count: string;
  average_rating: string;
  instructors: InstructorData[];
  start_time: string;
};

export interface Expertise {
  id: string;
  name: string;
}

export interface Location {
  id: string;
  label: string;
  value: string;
}

export interface Body {
  id: string;
  label: string;
  value: string;
  count: string;
}
