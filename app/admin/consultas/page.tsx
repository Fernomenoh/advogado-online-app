
'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Search, FileText, Clock, CheckCircle, XCircle, Eye } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

interface Consultation {
  id: string
  title: string
  description: string
  client: {
    name: string
    email: string
  }
  lawyer: {
    name: string
    email: string
  } | null
  area: string
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED'
  priority: 'LOW' | 'MEDIUM' | 'HIGH'
  createdAt: string
  updatedAt: string
}

export default function AdminConsultasPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [consultations, setConsultations] = useState<Consultation[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')

  useEffect(() => {
    if (status === 'loading') return
    
    if (!session) {
      router.push('/login')
      return
    }

    // Simular dados para desenvolvimento
    const mockConsultations: Consultation[] = [
      {
        id: '1',
        title: 'Questão sobre Direitos Trabalhistas',
        description: 'Gostaria de saber sobre meus direitos em caso de demissão sem justa causa...',
        client: {
          name: 'João Silva',
          email: 'joao@email.com'
        },
        lawyer: {
          name: 'Dra. Ana Paula',
          email: 'ana@advogado.com'
        },
        area: 'Direito Trabalhista',
        status: 'IN_PROGRESS',
        priority: 'MEDIUM',
        createdAt: '2024-01-20T10:00:00Z',
        updatedAt: '2024-01-21T14:30:00Z'
      },
      {
        id: '2',
        title: 'Divórcio Consensual',
        description: 'Preciso de orientação sobre como proceder com divórcio consensual...',
        client: {
          name: 'Maria Santos',
          email: 'maria@email.com'
        },
        lawyer: {
          name: 'Dr. Carlos Mendes',
          email: 'carlos@advogado.com'
        },
        area: 'Direito de Família',
        status: 'COMPLETED',
        priority: 'HIGH',
        createdAt: '2024-01-18T09:15:00Z',
        updatedAt: '2024-01-22T16:45:00Z'
      },
      {
        id: '3',
        title: 'Problema com Vizinho',
        description: 'Meu vizinho está construindo e invadindo meu terreno...',
        client: {
          name: 'Pedro Costa',
          email: 'pedro@email.com'
        },
        lawyer: null,
        area: 'Direito Civil',
        status: 'PENDING',
        priority: 'LOW',
        createdAt: '2024-01-22T11:30:00Z',
        updatedAt: '2024-01-22T11:30:00Z'
      }
    ]

    setConsultations(mockConsultations)
    setLoading(false)
  }, [session, status, router])

  const filteredConsultations = consultations.filter(consultation => {
    const matchesSearch = 
      consultation.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      consultation.client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      consultation.area.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === 'all' || consultation.status === statusFilter
    
    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'PENDING':
        return <Badge variant="outline"><Clock className="mr-1 h-3 w-3" />Pendente</Badge>
      case 'IN_PROGRESS':
        return <Badge variant="default"><FileText className="mr-1 h-3 w-3" />Em Andamento</Badge>
      case 'COMPLETED':
        return <Badge variant="secondary"><CheckCircle className="mr-1 h-3 w-3" />Concluída</Badge>
      case 'CANCELLED':
        return <Badge variant="destructive"><XCircle className="mr-1 h-3 w-3" />Cancelada</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'HIGH':
        return <Badge variant="destructive">Alta</Badge>
      case 'MEDIUM':
        return <Badge variant="default">Média</Badge>
      case 'LOW':
        return <Badge variant="secondary">Baixa</Badge>
      default:
        return <Badge variant="outline">{priority}</Badge>
    }
  }

  if (status === 'loading' || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight">Gerenciar Consultas</h1>
          <p className="text-muted-foreground">
            Monitore e gerencie todas as consultas da plataforma
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Consultas</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{consultations.length}</div>
            <p className="text-xs text-muted-foreground">
              Todas as consultas registradas
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pendentes</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {consultations.filter(c => c.status === 'PENDING').length}
            </div>
            <p className="text-xs text-muted-foreground">
              Aguardando atendimento
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Em Andamento</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {consultations.filter(c => c.status === 'IN_PROGRESS').length}
            </div>
            <p className="text-xs text-muted-foreground">
              Sendo atendidas
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Concluídas</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {consultations.filter(c => c.status === 'COMPLETED').length}
            </div>
            <p className="text-xs text-muted-foreground">
              Finalizadas com sucesso
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar consultas..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filtrar por status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os Status</SelectItem>
            <SelectItem value="PENDING">Pendente</SelectItem>
            <SelectItem value="IN_PROGRESS">Em Andamento</SelectItem>
            <SelectItem value="COMPLETED">Concluída</SelectItem>
            <SelectItem value="CANCELLED">Cancelada</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Consultations Table */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Consultas</CardTitle>
          <CardDescription>
            Todas as consultas registradas na plataforma
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredConsultations.map((consultation) => (
              <div
                key={consultation.id}
                className="flex items-start justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-start space-x-4 flex-1">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center space-x-2">
                      <h3 className="font-medium">{consultation.title}</h3>
                      {getStatusBadge(consultation.status)}
                      {getPriorityBadge(consultation.priority)}
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {consultation.description}
                    </p>
                    <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                      <span>Cliente: {consultation.client.name}</span>
                      <span>•</span>
                      <span>Área: {consultation.area}</span>
                      {consultation.lawyer && (
                        <>
                          <span>•</span>
                          <span>Advogado: {consultation.lawyer.name}</span>
                        </>
                      )}
                    </div>
                    <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                      <span>Criada: {new Date(consultation.createdAt).toLocaleDateString('pt-BR')}</span>
                      <span>•</span>
                      <span>Atualizada: {new Date(consultation.updatedAt).toLocaleDateString('pt-BR')}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
