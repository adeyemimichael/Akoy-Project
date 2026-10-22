export interface Inquiry {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  country: string;
  division: string;
  message: string;
  status: "unread" | "read" | "responded";
  created_at: string;
}

export interface Testimonial {
  id: string;
  name: string;
  title: string;
  location: string;
  division: string;
  rating: number;
  quote: string;
  initials: string;
  published: boolean;
  sort_order: number;
  created_at: string;
}

export interface Subscriber {
  id: string;
  email: string;
  created_at: string;
}

export interface SiteSetting {
  id: string;
  key: string;
  value: string;
  label: string;
  updated_at: string;
}

export interface Division {
  id: string;
  name: string;
  short_name: string;
  tagline: string;
  headline: string;
  description: string;
  bullet_points: string[];
  image: string;
  gallery_images: string[];
  stat_value: string;
  stat_label: string;
  metric_primary: string;
  metric_secondary: string;
  icon_name: string;
  updated_at: string;
}
