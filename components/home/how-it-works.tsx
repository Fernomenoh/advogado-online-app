
'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { UserPlus, MessageSquare, Gavel, CheckCircle } from 'lucide-react'

export function HowItWorksSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const steps = [
    {
      icon: UserPlus,
      title: 'Cadastre-se',
      description: 'Crie sua conta gratuita e complete seu perfil com suas informações básicas.'
    },
    {
      icon: MessageSquare,
      title: 'Descreva seu Caso',
      description: 'Nossa IA analisa sua questão jurídica e fornece uma resposta inicial personalizada.'
    },
    {
      icon: Gavel,
      title: 'Conecte com Advogado',
      description: 'Se necessário, você é conectado com um advogado especialista na sua área.'
    },
    {
      icon: CheckCircle,
      title: 'Resolva sua Questão',
      description: 'Receba orientação jurídica completa e resolva sua questão de forma eficiente.'
    }
  ]

  return (
    <section id="como-funciona" ref={ref} className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Como Funciona
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Processo simples e eficiente para resolver suas questões jurídicas
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="bg-white rounded-lg p-6 text-center card-shadow relative"
            >
              {/* Step number */}
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                  {index + 1}
                </div>
              </div>

              {/* Icon */}
              <div className="flex justify-center mb-4 mt-2">
                <step.icon className="h-12 w-12 text-primary" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {step.title}
              </h3>
              <p className="text-gray-600">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Connection lines for desktop */}
        <div className="hidden lg:block relative -mt-16 mb-8">
          <div className="absolute top-8 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-primary via-primary to-primary opacity-20"></div>
        </div>
      </div>
    </section>
  )
}
