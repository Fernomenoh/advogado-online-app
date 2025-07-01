
'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Progress } from '@/components/ui/progress'
import { ArrowLeft, ArrowRight, FileText, Brain, CreditCard } from 'lucide-react'
import { motion } from 'framer-motion'
import { useToast } from '@/hooks/use-toast'
import { LegalArea } from '@/lib/types'

export default function NovaConsultaPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [legalAreas, setLegalAreas] = useState<LegalArea[]>([])
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    legalAreaId: '',
    priority: 'MEDIUM'
  })
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    fetchLegalAreas()
  }, [])

  const fetchLegalAreas = async () => {
    try {
      const response = await fetch('/api/legal-areas')
      if (response.ok) {
        const data = await response.json()
        setLegalAreas(data.legalAreas || [])
      }
    } catch (error) {
      console.error('Erro ao buscar áreas jurídicas:', error)
    }
  }

  const handleNext = () => {
    if (currentStep === 1 && !formData.legalAreaId) {
      toast({
        title: 'Área jurídica obrigatória',
        description: 'Por favor, selecione uma área jurídica.',
        variant: 'destructive',
      })
      return
    }

    if (currentStep === 2 && (!formData.title || !formData.description)) {
      toast({
        title: 'Campos obrigatórios',
        description: 'Por favor, preencha o título e a descrição.',
        variant: 'destructive',
      })
      return
    }

    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    setIsLoading(true)

    try {
      const response = await fetch('/api/consultations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Erro ao criar consulta')
      }

      const data = await response.json()
      
      toast({
        title: 'Consulta criada com sucesso!',
        description: 'Nossa IA está analisando seu caso. Você será redirecionado em breve.',
      })

      // Simular processamento
      setTimeout(() => {
        router.push('/dashboard')
      }, 2000)

    } catch (error) {
      toast({
        title: 'Erro ao criar consulta',
        description: error instanceof Error ? error.message : 'Erro interno do servidor',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const progress = (currentStep / 3) * 100

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center space-x-4 mb-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.back()}
            className="flex items-center"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900">Nova Consulta Jurídica</h1>
            <p className="text-gray-600">Etapa {currentStep} de 3</p>
          </div>
        </div>

        <Progress value={progress} className="mb-8" />
      </motion.div>

      {/* Etapa 1: Área Jurídica */}
      {currentStep === 1 && (
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="h-5 w-5 mr-2" />
                Selecione a Área Jurídica
              </CardTitle>
              <CardDescription>
                Escolha a área do direito que melhor se relaciona com sua questão
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="legalArea">Área Jurídica</Label>
                <Select 
                  value={formData.legalAreaId} 
                  onValueChange={(value) => setFormData({...formData, legalAreaId: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma área jurídica" />
                  </SelectTrigger>
                  <SelectContent>
                    {legalAreas.map((area) => (
                      <SelectItem key={area.id} value={area.id}>
                        {area.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="priority">Prioridade</Label>
                <Select 
                  value={formData.priority} 
                  onValueChange={(value) => setFormData({...formData, priority: value})}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="LOW">Baixa</SelectItem>
                    <SelectItem value="MEDIUM">Média</SelectItem>
                    <SelectItem value="HIGH">Alta</SelectItem>
                    <SelectItem value="URGENT">Urgente</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Etapa 2: Descrição do Caso */}
      {currentStep === 2 && (
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Brain className="h-5 w-5 mr-2" />
                Descreva seu Caso
              </CardTitle>
              <CardDescription>
                Forneça os detalhes da sua questão jurídica para que nossa IA possa analisá-la
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title">Título da Consulta</Label>
                <Input
                  id="title"
                  placeholder="Ex: Problema com contrato de aluguel"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                />
              </div>

              <div>
                <Label htmlFor="description">Descrição Detalhada</Label>
                <Textarea
                  id="description"
                  placeholder="Descreva sua situação de forma detalhada. Inclua fatos relevantes, datas importantes e qualquer documentação que possua..."
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  rows={6}
                />
                <p className="text-sm text-gray-500 mt-2">
                  Quanto mais detalhes você fornecer, melhor será a análise da nossa IA.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Etapa 3: Confirmação e Pagamento */}
      {currentStep === 3 && (
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CreditCard className="h-5 w-5 mr-2" />
                Confirmação e Pagamento
              </CardTitle>
              <CardDescription>
                Revise os detalhes da sua consulta antes de finalizar
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Resumo da consulta */}
              <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                <h3 className="font-medium text-gray-900">Resumo da Consulta</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Área Jurídica:</span>
                    <span className="font-medium">
                      {legalAreas.find(area => area.id === formData.legalAreaId)?.name}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Título:</span>
                    <span className="font-medium">{formData.title}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Prioridade:</span>
                    <span className="font-medium">
                      {formData.priority === 'LOW' && 'Baixa'}
                      {formData.priority === 'MEDIUM' && 'Média'}
                      {formData.priority === 'HIGH' && 'Alta'}
                      {formData.priority === 'URGENT' && 'Urgente'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Valor simulado */}
              <div className="border-t pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-medium">Total:</span>
                  <span className="text-2xl font-bold text-primary">R$ 100,00</span>
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  Inclui análise inicial da IA e possível consulta com advogado especialista
                </p>
              </div>

              {/* Simulação de método de pagamento */}
              <div className="space-y-3">
                <Label>Método de Pagamento (Simulado)</Label>
                <div className="p-3 border rounded-lg bg-green-50">
                  <p className="text-sm text-green-800">
                    ✓ Para fins de demonstração, o pagamento está sendo simulado.
                    Em uma versão real, aqui estaria a integração com gateway de pagamento.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Botões de navegação */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={handleBack}
          disabled={currentStep === 1}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar
        </Button>

        {currentStep < 3 ? (
          <Button onClick={handleNext}>
            Próximo
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        ) : (
          <Button onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? 'Criando consulta...' : 'Finalizar Consulta'}
          </Button>
        )}
      </div>
    </div>
  )
}
