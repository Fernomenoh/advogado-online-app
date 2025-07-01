
'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  Search, 
  Filter, 
  MessageSquare, 
  Calendar, 
  Clock,
  Eye,
  Plus
} from 'lucide-react'
import { motion } from 'framer-motion'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { ConsultationWithRelations } from '@/lib/types'

export default function ConsultasPage() {
  const [consultations, setConsultations] = useState<ConsultationWithRelations[]>([])
  const [filteredConsultations, setFilteredConsultations] = useState<ConsultationWithRelations[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchConsultations()
  }, [])

  useEffect(() => {
    filterConsultations()
  }, [consultations, searchTerm, statusFilter])

  const fetchConsultations = async () => {
    try {
      const response = await fetch('/api/consultations')
      if (response.ok) {
        const data = await response.json()
        setConsultations(data.consultations || [])
      }
    } catch (error) {
      console.error('Erro ao buscar consultas:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const filterConsultations = () => {
    let filtered = consultations

    if (searchTerm) {
      filtered = filtered.filter(
        consultation =>
          consultation.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          consultation.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          consultation.legalArea?.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(consultation => consultation.status === statusFilter)
    }

    setFilteredConsultations(filtered)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800'
      case 'ASSIGNED':
        return 'bg-blue-100 text-blue-800'
      case 'IN_PROGRESS':
        return 'bg-purple-100 text-purple-800'
      case 'COMPLETED':
        return 'bg-green-100 text-green-800'
      case 'CANCELLED':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'PENDING':
        return 'Pendente'
      case 'ASSIGNED':
        return 'Atribuída'
      case 'IN_PROGRESS':
        return 'Em Andamento'
      case 'COMPLETED':
        return 'Concluída'
      case 'CANCELLED':
        return 'Cancelada'
      default:
        return status
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'LOW':
        return 'text-green-600'
      case 'MEDIUM':
        return 'text-yellow-600'
      case 'HIGH':
        return 'text-orange-600'
      case 'URGENT':
        return 'text-red-600'
      default:
        return 'text-gray-600'
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Minhas Consultas</h1>
          <p className="text-gray-600 mt-1">
            Gerencie e acompanhe todas as suas consultas jurídicas
          </p>
        </div>
        <Link href="/dashboard/nova-consulta">
          <Button className="flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>Nova Consulta</span>
          </Button>
        </Link>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Buscar por título, descrição ou área jurídica..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="md:w-48">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os Status</SelectItem>
                    <SelectItem value="PENDING">Pendente</SelectItem>
                    <SelectItem value="ASSIGNED">Atribuída</SelectItem>
                    <SelectItem value="IN_PROGRESS">Em Andamento</SelectItem>
                    <SelectItem value="COMPLETED">Concluída</SelectItem>
                    <SelectItem value="CANCELLED">Cancelada</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Consultations List */}
      <div className="space-y-4">
        {filteredConsultations.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card>
              <CardContent className="text-center py-12">
                <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {searchTerm || statusFilter !== 'all' 
                    ? 'Nenhuma consulta encontrada' 
                    : 'Nenhuma consulta ainda'
                  }
                </h3>
                <p className="text-gray-600 mb-4">
                  {searchTerm || statusFilter !== 'all'
                    ? 'Tente ajustar os filtros de busca.'
                    : 'Você ainda não fez nenhuma consulta jurídica. Que tal começar agora?'
                  }
                </p>
                {!searchTerm && statusFilter === 'all' && (
                  <Link href="/dashboard/nova-consulta">
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Fazer primeira consulta
                    </Button>
                  </Link>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          filteredConsultations.map((consultation, index) => (
            <motion.div
              key={consultation.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {consultation.title}
                        </h3>
                        <Badge className={getStatusColor(consultation.status)}>
                          {getStatusText(consultation.status)}
                        </Badge>
                      </div>
                      
                      <p className="text-gray-600 mb-3 line-clamp-2">
                        {consultation.description}
                      </p>

                      <div className="flex items-center space-x-6 text-sm text-gray-500">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {format(new Date(consultation.createdAt), 'dd/MM/yyyy', { locale: ptBR })}
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {consultation.legalArea?.name}
                        </div>
                        <div className={`font-medium ${getPriorityColor(consultation.priority)}`}>
                          Prioridade: {consultation.priority === 'LOW' && 'Baixa'}
                          {consultation.priority === 'MEDIUM' && 'Média'}
                          {consultation.priority === 'HIGH' && 'Alta'}
                          {consultation.priority === 'URGENT' && 'Urgente'}
                        </div>
                      </div>

                      {consultation.lawyer && (
                        <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                          <p className="text-sm text-blue-800">
                            <strong>Advogado(a):</strong> {consultation.lawyer.name}
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col space-y-2 ml-4">
                      <Link href={`/dashboard/consulta/${consultation.id}`}>
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4 mr-1" />
                          Ver Detalhes
                        </Button>
                      </Link>
                      
                      {consultation.status === 'IN_PROGRESS' && consultation.chat && (
                        <Link href={`/dashboard/consulta/${consultation.id}`}>
                          <Button size="sm">
                            <MessageSquare className="h-4 w-4 mr-1" />
                            Chat
                          </Button>
                        </Link>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))
        )}
      </div>
    </div>
  )
}
