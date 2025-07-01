
'use client'

import { Heart, Gift, Coffee } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import { useState } from 'react'

interface CollaborateWidgetProps {
  variant?: 'compact' | 'full' | 'floating'
  className?: string
}

export function CollaborateWidget({ variant = 'compact', className = '' }: CollaborateWidgetProps) {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible && variant === 'floating') return null

  if (variant === 'floating') {
    return (
      <div className={`fixed bottom-6 right-6 z-40 max-w-sm ${className}`}>
        <Card className="bg-gradient-to-r from-purple-500 to-blue-500 text-white border-0 shadow-lg">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm flex items-center space-x-2">
                <Heart className="h-4 w-4" />
                <span>Gostou da plataforma?</span>
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/20 h-6 w-6 p-0"
                onClick={() => setIsVisible(false)}
              >
                ×
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="text-xs mb-3 opacity-90">
              Colabore para manter a plataforma gratuita!
            </p>
            <Link href="/colaboracao">
              <Button 
                size="sm" 
                className="w-full bg-white text-purple-600 hover:bg-gray-100"
              >
                <Coffee className="h-4 w-4 mr-2" />
                Colaborar
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (variant === 'compact') {
    return (
      <Card className={`bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200 ${className}`}>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-purple-100 rounded-full p-2">
                <Heart className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="font-medium text-gray-800">Colabore conosco</p>
                <p className="text-sm text-gray-600">Mantenha a plataforma gratuita</p>
              </div>
            </div>
            <Link href="/colaboracao">
              <Button size="sm" variant="outline" className="border-purple-300 text-purple-700 hover:bg-purple-50">
                PIX
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className={`bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200 ${className}`}>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-purple-800">
          <Gift className="h-6 w-6" />
          <span>Colabore com o Projeto</span>
        </CardTitle>
        <CardDescription>
          Sua colaboração nos ajuda a manter a plataforma gratuita e em constante evolução.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Coffee className="h-4 w-4 text-amber-600" />
            <span>A partir de R$ 5,00 (um cafezinho)</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Heart className="h-4 w-4 text-red-500" />
            <span>100% transparente e opcional</span>
          </div>
          <Link href="/colaboracao">
            <Button className="w-full bg-purple-600 hover:bg-purple-700">
              <Heart className="h-4 w-4 mr-2" />
              Colaborar via PIX
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
