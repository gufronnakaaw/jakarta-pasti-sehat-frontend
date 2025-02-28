export type Team = {
  team_id: string;
  image_url: string;
  fullname: string;
  description: string;
  educations: {
    name: string;
    education_id: string;
    level: string;
  }[];
  social_links: {
    name: "TIKTOK" | "YOUTUBE" | "INSTAGRAM" | "LINKEDIN";
    socmed_id: string;
    url: string;
  }[];
  position: {
    name: string;
    position_id: string;
  };
};

export type TeamDashboard = {
  team_id: string;
  fullname: string;
  position: string;
  image_url: string;
  created_at: string;
};
