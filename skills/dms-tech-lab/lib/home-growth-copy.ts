import homeGrowthCopy from "@/content/home-growth-copy.json";

export interface TrustMetric {
  label: string;
  value: string;
}

export interface CaseStudyItem {
  id: string;
  industry: string;
  title: string;
  before: string;
  after: string;
  metrics: string[];
}

export interface HomeGrowthCopy {
  hero: {
    primaryCtaLabel: string;
    secondaryCtaLabel: string;
  };
  trustMetrics: TrustMetric[];
  roiCalculator: {
    title: string;
    description: string;
    primaryButtonLabel: string;
    secondaryButtonLabel: string;
  };
  caseStudies: {
    title: string;
    description: string;
    items: CaseStudyItem[];
  };
  leadMagnet: {
    title: string;
    description: string;
    downloadLabel: string;
    downloadPath: string;
  };
}

export const homeGrowthData = homeGrowthCopy as HomeGrowthCopy;
