
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, Shield, Users, Gavel } from 'lucide-react'
import { motion } from 'framer-motion'

export function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  
  const benefits = [
    "Consultas jurídicas com IA especializada",
    "Advogados verificados e qualificados", 
    "Respostas rápidas em até 24 horas",
    "Baseado nas leis brasileiras"
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % benefits.length)
    }, 3000)
    return () => clearInterval(timer)
  }, [benefits.length])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with gradient */}
      <div className="absolute inset-0 hero-gradient"></div>
      
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='https://toppng.com/uploads/preview/dot-pattern-in-circle-11563235065uuih5xnrd7.png fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          {/* Main heading */}
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Consultas Jurídicas
            <span className="block text-blue-200">Rápidas e Confiáveis</span>
          </h1>

          {/* Animated subtitle */}
          <div className="h-16 flex items-center justify-center mb-8">
            <motion.p 
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="text-xl md:text-2xl text-blue-100"
            >
              {benefits[currentIndex]}
            </motion.p>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/cadastro">
              <Button size="lg" className="bg-white text-primary hover:bg-gray-100 font-semibold px-8 py-6 text-lg">
                Fazer uma Consulta Agora
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="#como-funciona">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary font-semibold px-8 py-6 text-lg">
                Como Funciona
              </Button>
            </Link>
          </div>

          {/* Features grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center"
            >
              <Shield className="h-12 w-12 text-blue-200 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Seguro e Confiável</h3>
              <p className="text-blue-100">Dados protegidos e advogados verificados</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center"
            >
              <Users className="h-12 w-12 text-blue-200 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Advogados Qualificados</h3>
              <p className="text-blue-100">Profissionais experientes em diversas áreas</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center"
            >
              <Gavel className="h-12 w-12 text-blue-200 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Baseado em Leis BR</h3>
              <p className="text-blue-100">Especializado na legislação brasileira</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
