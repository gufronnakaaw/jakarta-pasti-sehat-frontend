export type TermsAndConditions = {
  title: string;
  sections: Section[];
};

export type Section = {
  title: string;
  content: string[] | Record<string, string[]>;
};
