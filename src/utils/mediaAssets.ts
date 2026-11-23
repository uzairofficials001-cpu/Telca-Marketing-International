import heroMarketingGrowth from '../assets/images/hero_marketing_growth_1793368523521.jpg';
import aboutAgencyStrategy from '../assets/images/about_agency_strategy_1793433704801.jpg';
import portfolioGrowthCaseStudy from '../assets/images/portfolio_growth_case_study_1793433686566.jpg';
import servicePerformanceAds from '../assets/images/service_performance_ads_1793368524817.jpg';
import serviceCreativeProduction from '../assets/images/service_creative_production_1793368525972.jpg';
import serviceSocialMedia from '../assets/images/service_social_media_1793433660938.jpg';
import serviceEmailMarketing from '../assets/images/service_email_marketing_1793433673325.jpg';
import serviceAiAutomation from '../assets/images/service_ai_automation_1793368525649.jpg';

import telcaLogoTransparent from '../assets/logos/telca_logo_transparent.png';
import telcaLogoTrimmed from '../assets/logos/telca_logo_trimmed.png';
import telcaLogoFallback from '../assets/logos/telca_logo__fadbada3.png';

export const MEDIA_ASSETS = {
  heroMarketingGrowth,
  aboutAgencyStrategy,
  portfolioGrowthCaseStudy,
  servicePerformanceAds,
  serviceCreativeProduction,
  serviceSocialMedia,
  serviceEmailMarketing,
  serviceAiAutomation,
  telcaLogoTransparent,
  telcaLogoTrimmed,
  telcaLogoFallback,
} as const;

const FILENAME_TO_BUNDLED_URL: Record<string, string> = {
  'hero_marketing_growth_1793368523521.jpg': heroMarketingGrowth,
  'about_agency_strategy_1793433704801.jpg': aboutAgencyStrategy,
  'portfolio_growth_case_study_1793433686566.jpg': portfolioGrowthCaseStudy,
  'service_performance_ads_1793368524817.jpg': servicePerformanceAds,
  'service_creative_production_1793368525972.jpg': serviceCreativeProduction,
  'service_social_media_1793433660938.jpg': serviceSocialMedia,
  'service_email_marketing_1793433673325.jpg': serviceEmailMarketing,
  'service_ai_automation_1793368525649.jpg': serviceAiAutomation,
  'telca_logo_transparent.png': telcaLogoTransparent,
  'telca_logo_trimmed.png': telcaLogoTrimmed,
  'telca_logo__fadbada3.png': telcaLogoFallback,
};

/**
 * Resolves any known local asset path (/images/..., /src/assets/images/..., /assets/aistudio/...)
 * to its Vite-bundled production asset URL so images always load on Netlify & static hosts.
 */
export function resolveMediaUrl(url?: string, fallback: string = portfolioGrowthCaseStudy): string {
  if (!url || typeof url !== 'string') {
    return fallback;
  }

  const trimmed = url.trim();
  if (!trimmed) {
    return fallback;
  }

  if (
    trimmed.startsWith('data:') ||
    trimmed.startsWith('blob:') ||
    trimmed.startsWith('http://') ||
    trimmed.startsWith('https://')
  ) {
    return trimmed;
  }

  const cleanPath = trimmed.split('?')[0].split('#')[0];
  const fileName = cleanPath.split('/').pop() || '';

  if (fileName && FILENAME_TO_BUNDLED_URL[fileName]) {
    return FILENAME_TO_BUNDLED_URL[fileName];
  }

  return trimmed;
}
