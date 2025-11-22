import { Franchise } from '../types/franchise';
import axios from 'axios';

interface ScraperConfig {
  source: string;
  url: string;
  enabled: boolean;
  selectors?: {
    name?: string;
    industry?: string;
    investment?: string;
    description?: string;
  };
}

const scraperConfigs: ScraperConfig[] = [
  {
    source: 'cfa',
    url: 'https://cfa.ca/franchisecanada/franchise-canada-directory-2025/',
    enabled: false
  },
  {
    source: 'betheboss',
    url: 'https://www.betheboss.ca/franchise-opportunities',
    enabled: false
  },
  {
    source: 'franchisedirect',
    url: 'https://www.franchisedirect.ca/franchises',
    enabled: false
  }
];

export class FranchiseScraperService {
  private static instance: FranchiseScraperService;
  private rateLimitDelay = 2000;
  private userAgent = 'Mozilla/5.0 (compatible; FranchiseHub/1.0; +https://franchisehub.ca)';

  public static getInstance(): FranchiseScraperService {
    if (!FranchiseScraperService.instance) {
      FranchiseScraperService.instance = new FranchiseScraperService();
    }
    return FranchiseScraperService.instance;
  }

  async scrapeCanadianFranchises(): Promise<Franchise[]> {
    console.log('🕷️ Starting franchise data scraping...');
    const allFranchises: Franchise[] = [];

    for (const config of scraperConfigs.filter(c => c.enabled)) {
      try {
        console.log(`📡 Scraping from ${config.source}...`);
        const franchises = await this.scrapeSource(config);
        allFranchises.push(...franchises);

        await this.delay(this.rateLimitDelay);
      } catch (error) {
        console.error(`❌ Error scraping ${config.source}:`, error);
      }
    }

    console.log(`✅ Scraping complete. Found ${allFranchises.length} franchises`);
    return allFranchises;
  }

  private async scrapeSource(config: ScraperConfig): Promise<Franchise[]> {
    console.warn(`⚠️ Web scraping from ${config.source} is disabled by default`);
    console.log('📋 Ethical web scraping guidelines:');
    console.log('  1. Always respect robots.txt');
    console.log('  2. Implement rate limiting (2+ seconds between requests)');
    console.log('  3. Use proper User-Agent identification');
    console.log('  4. Consider API partnerships instead');
    console.log('  5. Review Terms of Service before scraping');
    console.log('  6. Cache data to minimize requests');
    console.log('  7. Handle errors gracefully');

    return [];
  }

  async checkRobotsTxt(baseUrl: string): Promise<boolean> {
    try {
      const robotsUrl = new URL('/robots.txt', baseUrl).toString();
      const response = await axios.get(robotsUrl, {
        headers: { 'User-Agent': this.userAgent },
        timeout: 5000
      });

      console.log(`🤖 robots.txt for ${baseUrl}:`, response.data);
      return true;
    } catch (error) {
      console.error(`Error checking robots.txt for ${baseUrl}:`, error);
      return false;
    }
  }

  async scrapeFranchiseGrade(): Promise<Franchise[]> {
    console.log('🎓 FranchiseGrade Scraping Information');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('');
    console.log('📊 Available Data:');
    console.log('  • 3,000+ franchise systems');
    console.log('  • Ratings and reviews');
    console.log('  • Investment requirements');
    console.log('  • Industry categories');
    console.log('  • Performance metrics');
    console.log('');
    console.log('🔗 Source: https://www.franchisegrade.com/franchise-directory');
    console.log('');
    console.log('⚠️  IMPORTANT: FranchiseGrade does not offer a public API');
    console.log('');
    console.log('📬 Recommended Approach:');
    console.log('  1. Contact FranchiseGrade for partnership opportunities');
    console.log('  2. Request data licensing or API access');
    console.log('  3. Negotiate terms for commercial use');
    console.log('');
    console.log('💡 Alternative: Use their public directory for manual research');
    console.log('   and supplement with API data from FranChimp or FRANdata');
    console.log('');

    return [];
  }

  async scrapeBeTheBoss(): Promise<Franchise[]> {
    console.log('🇨🇦 BeTheBoss.ca Scraping Information');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('');
    console.log('📊 Available Data:');
    console.log('  • Canadian franchise opportunities');
    console.log('  • Investment ranges');
    console.log('  • Industry categories');
    console.log('  • Location availability');
    console.log('');
    console.log('🔗 Source: https://www.betheboss.ca/franchise-opportunities');
    console.log('');
    console.log('⚠️  robots.txt Status: Check before scraping');
    console.log('');
    console.log('📬 Recommended Approach:');
    console.log('  1. Contact BeTheBoss.ca for API access or partnership');
    console.log('  2. Email: info@betheboss.ca');
    console.log('  3. Request: Developer API access for franchise listings');
    console.log('');
    console.log('💡 If scraping is necessary:');
    console.log('  • Respect rate limits (2+ seconds between requests)');
    console.log('  • Use proper User-Agent identification');
    console.log('  • Cache results to minimize requests');
    console.log('  • Only scrape public data');
    console.log('');

    return [];
  }

  async scrapeCFA(): Promise<Franchise[]> {
    console.log('🇨🇦 Canadian Franchise Association Scraping Information');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('');
    console.log('📊 Available Data:');
    console.log('  • Official Canadian franchises');
    console.log('  • CFA member franchises');
    console.log('  • Verified franchise information');
    console.log('  • Industry standards compliance');
    console.log('');
    console.log('🔗 Source: https://cfa.ca/franchisecanada/franchise-canada-directory-2025/');
    console.log('');
    console.log('⚠️  IMPORTANT: This is a premium membership organization');
    console.log('');
    console.log('📬 STRONGLY Recommended Approach:');
    console.log('  1. Contact CFA directly for partnership');
    console.log('  2. Website: https://cfa.ca/contact/');
    console.log('  3. Request: Official API access or data licensing');
    console.log('  4. Benefit: Access to verified, high-quality data');
    console.log('');
    console.log('💰 Membership Benefits:');
    console.log('  • Official franchise data');
    console.log('  • Regular updates');
    console.log('  • Legal compliance');
    console.log('  • Industry credibility');
    console.log('');
    console.log('🚫 DO NOT scrape without permission');
    console.log('   Partnership is the appropriate approach for CFA data');
    console.log('');

    return [];
  }

  async scrapeFranchiseDirect(): Promise<Franchise[]> {
    console.log('🌍 FranchiseDirect Canada Scraping Information');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('');
    console.log('📊 Available Data:');
    console.log('  • International franchise listings');
    console.log('  • Canadian franchise section');
    console.log('  • Investment details');
    console.log('  • Franchise profiles');
    console.log('');
    console.log('🔗 Source: https://www.franchisedirect.ca/');
    console.log('');
    console.log('📬 Recommended Approach:');
    console.log('  1. Contact FranchiseDirect for partnership');
    console.log('  2. Request: Data feed or API access');
    console.log('  3. Benefits: Legal access to structured data');
    console.log('');

    return [];
  }

  async scrapePublicData(source: 'cfa' | 'betheboss' | 'franchisedirect' | 'franchisegrade'): Promise<void> {
    console.log(`🔍 Initiating scraper for: ${source.toUpperCase()}`);
    console.log('');

    switch (source) {
      case 'cfa':
        await this.scrapeCFA();
        break;
      case 'betheboss':
        await this.scrapeBeTheBoss();
        break;
      case 'franchisedirect':
        await this.scrapeFranchiseDirect();
        break;
      case 'franchisegrade':
        await this.scrapeFranchiseGrade();
        break;
    }

    console.log('');
    console.log('✅ Scraper information provided');
    console.log('');
    console.log('📝 Next Steps:');
    console.log('  1. Review the recommended approach for each source');
    console.log('  2. Contact sources for official API access or partnerships');
    console.log('  3. Implement API integrations (preferred method)');
    console.log('  4. Only consider scraping as a last resort with permission');
    console.log('');
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  getScraperStatus(): { source: string; enabled: boolean; status: string }[] {
    return scraperConfigs.map(config => ({
      source: config.source,
      enabled: config.enabled,
      status: config.enabled ? 'Active (Not Recommended)' : 'Disabled - Use API Instead'
    }));
  }

  enableScraper(source: string, enable: boolean = false): void {
    const config = scraperConfigs.find(c => c.source === source);
    if (config) {
      config.enabled = enable;
      console.log(`⚠️  Scraper for ${source} is now ${enable ? 'ENABLED' : 'DISABLED'}`);

      if (enable) {
        console.warn('⚠️  WARNING: Web scraping should only be enabled after:');
        console.warn('   1. Reviewing the website\'s Terms of Service');
        console.warn('   2. Checking robots.txt');
        console.warn('   3. Implementing proper rate limiting');
        console.warn('   4. Obtaining permission when possible');
        console.warn('   5. Considering legal implications');
      }
    }
  }
}

export const franchiseScraperService = FranchiseScraperService.getInstance();

export const getFranchiseScraperInfo = async () => {
  console.log('');
  console.log('🕷️  FRANCHISE WEB SCRAPING SERVICE');
  console.log('═══════════════════════════════════════════════════════════════');
  console.log('');
  console.log('📋 Available Sources:');
  console.log('');

  await franchiseScraperService.scrapePublicData('cfa');
  console.log('─────────────────────────────────────────────────────────────');
  console.log('');

  await franchiseScraperService.scrapePublicData('betheboss');
  console.log('─────────────────────────────────────────────────────────────');
  console.log('');

  await franchiseScraperService.scrapePublicData('franchisedirect');
  console.log('─────────────────────────────────────────────────────────────');
  console.log('');

  await franchiseScraperService.scrapePublicData('franchisegrade');
  console.log('═══════════════════════════════════════════════════════════════');
  console.log('');
  console.log('🎯 RECOMMENDATION: Use API partnerships instead of web scraping');
  console.log('   • More reliable data');
  console.log('   • Legal compliance');
  console.log('   • Better performance');
  console.log('   • Official support');
  console.log('');

  const status = franchiseScraperService.getScraperStatus();
  console.log('📊 Current Scraper Status:');
  status.forEach(s => {
    console.log(`   ${s.source}: ${s.status}`);
  });
  console.log('');
};
