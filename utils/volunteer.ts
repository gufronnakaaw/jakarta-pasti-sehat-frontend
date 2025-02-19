export type Volunteer = {
  volunteer_id: string;
  slug: string;
  title: string;
  created_at: string;
  pillar: string;
  subpillar: string;
};

export type VolunteerDetail = {
  volunteer_id: string;
  slug: string;
  title: string;
  requirements: string;
  responsibilities?: string;
  created_at: string;
  pillar: string;
  subpillar: string;
};
