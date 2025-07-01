
'use client'

import { AdSenseBanner } from './adsense-banner'
import { Card } from '@/components/ui/card'

interface BannerAdProps {
  className?: string
  size?: 'small' | 'medium' | 'large'
}

export function BannerAd({ className = '', size = 'medium' }: BannerAdProps) {
  const sizeClasses = {
    small: 'h-20',
    medium: 'h-32',
    large: 'h-48'
  }

  return (
    <Card className={`p-4 bg-gray-50 border-gray-200 ${className}`}>
      <div className="text-xs text-gray-500 mb-2 text-center">Publicidade</div>
      <AdSenseBanner
        adSlot="0987654321" // Replace with actual ad slot
        adFormat="horizontal"
        className={`w-full ${sizeClasses[size]}`}
      />
    </Card>
  )
}
