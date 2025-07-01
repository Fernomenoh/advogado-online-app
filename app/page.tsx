
import { Header } from '@/components/header'
import { HeroSection } from '@/components/home/hero-section'
import { HowItWorksSection } from '@/components/home/how-it-works'
import { LegalAreasSection } from '@/components/home/legal-areas'
import { StatsSection } from '@/components/home/stats-section'
import { CTASection } from '@/components/home/cta-section'
import { Footer } from '@/components/footer'
import { BannerAd } from '@/components/ads/banner-ad'
import { CollaborateWidget } from '@/components/collaborate-widget'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <HeroSection />
        <StatsSection />
        
        {/* Ad between stats and how it works */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <BannerAd size="small" />
        </div>
        
        <HowItWorksSection />
        
        {/* Collaborate widget after how it works */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <CollaborateWidget variant="compact" />
        </div>
        
        <LegalAreasSection />
        
        {/* Ad before CTA */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <BannerAd size="medium" />
        </div>
        
        <CTASection />
        
        {/* Floating collaboration widget */}
        <CollaborateWidget variant="floating" />
      </main>
      <Footer />
    </div>
  )
}
