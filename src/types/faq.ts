export type FaqCategoryId = "all" | "about" | "process" | "services" | "ownership";

export interface FaqCategory {
  id: FaqCategoryId;
  label: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  desc?: string;
}

export interface FaqCta {
  label: string;
  href: string;
  isExternal?: boolean;
}

export interface FaqItem {
  id: string;
  category: "about" | "process" | "services" | "ownership";
  categoryLabel: string;
  question: string;
  answer: string;
  priority: number;
  processSteps?: ProcessStep[];
  cta?: FaqCta;
}
