
'use client'

import { AdSenseBanner } from './adsense-banner'
import { Card } from '@/components/ui/card'

export function InArticleAd() {
  return (
    <Card className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200 my-8">
      <div className="text-xs text-gray-500 mb-2 text-center">Publicidade</div>
      <AdSenseBanner
        adSlot="1122334455" // Replace with actual ad slot
        adFormat="fluid"
        adLayout="in-article"
        className="min-h-[150px] w-full"
      />
    </Card>
  )
}
