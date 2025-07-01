
'use client'

import { AdSenseBanner } from './adsense-banner'
import { Card } from '@/components/ui/card'

export function SidebarAd() {
  return (
    <Card className="p-4 bg-gray-50 border-gray-200">
      <div className="text-xs text-gray-500 mb-2 text-center">Publicidade</div>
      <AdSenseBanner
        adSlot="1234567890" // Replace with actual ad slot
        adFormat="rectangle"
        className="min-h-[250px] w-full"
      />
    </Card>
  )
}
