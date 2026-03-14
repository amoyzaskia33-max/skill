import ContactHero from './components/ContactHero';
import ContactMainSection from './components/ContactMainSection';
import LocationSection from './components/LocationSection';
import ContactCTA from './components/ContactCTA';

interface ContactPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

function toSingleValue(value: string | string[] | undefined): string {
  if (Array.isArray(value)) {
    return value[0] || '';
  }
  return value || '';
}

export const metadata = {
  title: 'Contact | DMS Solution',
  description: '프로젝트에 대한 문의나 협업 제안을 환영합니다. DMS Solution과 함께 아이디어를 현실로 만들어 보세요.',
};

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const resolvedSearchParams = await searchParams;
  const assessmentPrefill = {
    source: toSingleValue(resolvedSearchParams.source),
    assessmentScore: toSingleValue(resolvedSearchParams.assessmentScore),
    assessmentTier: toSingleValue(resolvedSearchParams.assessmentTier),
    assessmentIndustry: toSingleValue(resolvedSearchParams.assessmentIndustry),
    assessmentSummary: toSingleValue(resolvedSearchParams.assessmentSummary),
    assessmentRecommendation: toSingleValue(resolvedSearchParams.assessmentRecommendation),
  };

  return (
    <main className="min-h-screen bg-[#050B1B] text-white font-poppins selection:bg-neon-sky selection:text-[#050B1B] relative">
      <ContactHero />
      <ContactMainSection assessmentPrefill={assessmentPrefill} />
      <LocationSection />
      <ContactCTA />
    </main>
  );
}
