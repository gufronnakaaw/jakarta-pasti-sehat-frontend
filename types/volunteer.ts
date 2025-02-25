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

export type VolunteerDashboard = {
  volunteer_id: string;
  slug: string;
  title: string;
  created_at: string;
  pillar: {
    name: string;
  };
  subpillar: {
    name: string;
  };
  total_volappls: number;
};

export type VolunteerDashboardDetails = {
  volunteer_id: string;
  slug: string;
  title: string;
  requirements: string;
  responsibilities: null | string;
  created_at: string;
  pillar: {
    pillar_id: string;
    name: string;
  };
  subpillar: {
    sub_pillar_id: string;
    name: string;
  };
  volappls: VolunteerApplicant[];
};

export type VolunteerApplicant = {
  vol_appl_id: string;
  fullname: string;
  email: string;
  institution: string;
  level: string;
  study_program: string;
  reason: string;
  cv_url: string;
  follow_url: string;
  uploaded_at: string;
  is_approved: boolean;
  approved_by: null;
};
