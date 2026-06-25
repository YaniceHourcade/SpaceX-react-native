export type Paginated<T> = {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
};

export type LaunchStatus = {
  id: number;
  name: string;
  abbrev: string;
  description: string;
};

export type Agency = {
  id: number;
  url: string;
  name: string;
  type: string;
};

export type Launch = {
  id: string;
  name: string;
  slug: string;
  status: LaunchStatus;
  net: string; // ISO date
  window_start: string;
  window_end: string;
  probability: number | null;
  launch_service_provider: Agency;
  image: string | null;
  mission: {
    id: number;
    name: string;
    description: string;
    type: string;
    orbit: { id: number; name: string; abbrev: string };
  } | null;
  pad: {
    id: number;
    name: string;
    latitude: string;
    longitude: string;
    location: { name: string; country_code: string };
  };
};

export type Rocket = {
  id: number;
  url: string;
  name: string;
  full_name: string;
  description: string | null;
  family: string;
  variant: string;
  alias: string;
  min_stage: number | null;
  max_stage: number | null;
  length: number | null;
  diameter: number | null;
  maiden_flight: string | null;
  launch_mass: number | null;
  leo_capacity: number | null;
  gto_capacity: number | null;
  to_thrust: number | null;
  apogee: number | null;
  image_url: string | null;
  info_url: string | null;
  wiki_url: string | null;
  manufacturer: { id: number; name: string; abbrev: string };
};

export type SpaceXAgency = {
  id: number;
  url: string;
  name: string;
  abbrev: string;
  type: string;
  country_code: string;
  description: string;
  administrator: string | null;
  founding_year: string;
  launchers: string;
  spacecraft: string;
  total_launch_count: number;
  successful_launches: number;
  failed_launches: number;
  pending_launches: number;
  consecutive_successful_launches: number;
  successful_landings: number;
  failed_landings: number;
  image_url: string | null;
  logo_url: string | null;
  info_url: string | null;
  wiki_url: string | null;
};
