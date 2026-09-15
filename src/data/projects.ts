export const projectCategories = ["Residential", "Commercial", "Renovation", "Addition", "Deck", "General Contracting"] as const;
export type ProjectCategory = (typeof projectCategories)[number];

export interface ProjectRecord {
  title: string;
  category: ProjectCategory;
  image: string;
  alt: string;
  summary: string;
  location?: string;
  beforeImage?: string;
  afterImage?: string;
  featured: boolean;
}

export interface PortfolioPlaceholder {
  label: "Project preview";
  title: string;
  category: ProjectCategory;
  summary: string;
}

// Publish verified completed work here only after customer approval and photo review.
export const projects: readonly ProjectRecord[] = [];

// Placeholders are deliberately a separate type and collection. They are not completed work.
export const portfolioPlaceholders: readonly PortfolioPlaceholder[] = [
  { label: "Project preview", title: "Residential construction", category: "Residential", summary: "A reserved space for an approved residential project story." },
  { label: "Project preview", title: "Renovations & additions", category: "Renovation", summary: "A reserved space for approved before-and-after photography." },
  { label: "Project preview", title: "Outdoor living", category: "Deck", summary: "A reserved space for an approved deck or outdoor project." },
];

