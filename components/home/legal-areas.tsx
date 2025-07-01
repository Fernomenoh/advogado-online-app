
'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { 
  Users, 
  Briefcase, 
  Shield, 
  ShoppingCart, 
  Heart,
  Building,
  Car,
  Globe
} from 'lucide-react'

export function LegalAreasSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const legalAreas = [
    {
      icon: Users,
      name: 'Direito Civil',
      description: 'Contratos, propriedade, responsabilidade civil e questões patrimoniais.'
    },
    {
      icon: Briefcase,
      name: 'Direito Trabalhista',
      description: 'Relações de trabalho, demissões, direitos trabalhistas e previdenciários.'
    },
    {
      icon: Shield,
      name: 'Direito Penal',
      description: 'Defesa criminal, crimes contra a pessoa e patrimônio.'
    },
    {
      icon: ShoppingCart,
      name: 'Direito do Consumidor',
      description: 'Proteção ao consumidor, defeitos de produtos e serviços inadequados.'
    },
    {
      icon: Heart,
      name: 'Direito de Família',
      description: 'Divórcio, guarda de filhos, pensão alimentícia e questões familiares.'
    },
    {
      icon: Building,
      name: 'Direito Empresarial',
      description: 'Constituição de empresas, contratos comerciais e questões societárias.'
    },
    {
      icon: Car,
      name: 'Direito de Trânsito',
      description: 'Multas, suspensão de CNH, acidentes de trânsito.'
    },
    {
      icon: Globe,
      name: 'Outras Áreas',
      description: 'Tributário, previdenciário, ambiental e demais especialidades.'
    }
  ]

  return (
    <section id="areas-juridicas" ref={ref} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Áreas Jurídicas Atendidas
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Nossos advogados especializados cobrem todas as principais áreas do direito brasileiro
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {legalAreas.map((area, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="bg-gray-50 rounded-lg p-6 hover:bg-primary hover:text-white transition-all duration-300 card-shadow group"
            >
              <area.icon className="h-10 w-10 text-primary group-hover:text-white mb-4 transition-colors" />
              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-white mb-2 transition-colors">
                {area.name}
              </h3>
              <p className="text-gray-600 group-hover:text-gray-100 text-sm transition-colors">
                {area.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
