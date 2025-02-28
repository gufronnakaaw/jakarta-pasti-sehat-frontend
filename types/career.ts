export type PublicCareer = {
  slug: string;
  title: string;
  location: string;
  type: string;
  pillar: string;
  subpillar: string;
};

export type PublicDetailCareer = {
  career_id: string;
  slug: string;
  title: string;
  location: string;
  type: string;
  requirements: string;
  responsibilities: string;
  created_at: string;
  pillar: string;
  subpillar: string;
};

export type CareerDashboard = {
  career_id: string;
  slug: string;
  title: string;
  created_at: string;
  is_active: boolean;
  pillar: { name: string };
  subpillar: { name: string };
  total_carappls: number;
};

export type CareerDashboardDetails = {
  career_id: string;
  slug: string;
  title: string;
  location: string;
  type: string;
  requirements: string;
  responsibilities: string;
  created_at: string;
  pillar: string | { pillar_id: string; name: string };
  subpillar: string | { sub_pillar_id: string; name: string };
  carappls: CareerApplicant[];
};

export type CareerApplicant = {
  car_appl_id: string;
  fullname: string;
  email: string;
  address: string;
  phone_number: string;
  instagram_url: string;
  portofolio_url: string;
  cv_url: string;
  uploaded_at: string;
  is_approved: boolean;
  approved_by: string;
};
