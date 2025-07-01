
'use client'

import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Button } from '@/components/ui/button'
import { ArrowRight, MessageSquare } from 'lucide-react'

export function CTASection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="py-20 bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Pronto para Resolver sua Questão Jurídica?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Junte-se a milhares de brasileiros que já encontraram soluções rápidas e confiáveis 
            para seus problemas legais através da nossa plataforma.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/cadastro">
              <Button 
                size="lg" 
                className="bg-white text-primary hover:bg-gray-100 font-semibold px-8 py-6 text-lg"
              >
                <MessageSquare className="mr-2 h-5 w-5" />
                Iniciar Consulta Gratuita
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
          
          <p className="text-blue-200 text-sm mt-6">
            Sem compromisso • Resposta em até 24 horas • Advogados verificados
          </p>
        </motion.div>
      </div>
    </section>
  )
}
