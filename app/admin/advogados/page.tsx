
'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Search, Plus, Edit, Trash2, UserCheck, Star, Clock } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

interface Lawyer {
  id: string
  name: string
  email: string
  oab: string
  specialties: string[]
  rating: number
  consultations: number
  status: 'ACTIVE' | 'INACTIVE' | 'PENDING'
  createdAt: string
}

export default function AdminAdvogadosPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [lawyers, setLawyers] = useState<Lawyer[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    if (status === 'loading') return
    
    if (!session) {
      router.push('/login')
      return
    }

    // Simular dados para desenvolvimento
    const mockLawyers: Lawyer[] = [
      {
        id: '1',
        name: 'Dr. Carlos Mendes',
        email: 'carlos@advogado.com',
        oab: 'OAB/SP 123456',
        specialties: ['Direito Civil', 'Direito de Família'],
        rating: 4.8,
        consultations: 45,
        status: 'ACTIVE',
        createdAt: '2024-01-10T09:15:00Z'
      },
      {
        id: '2',
        name: 'Dra. Ana Paula',
        email: 'ana@advogado.com',
        oab: 'OAB/RJ 789123',
        specialties: ['Direito Trabalhista'],
        rating: 4.6,
        consultations: 32,
        status: 'ACTIVE',
        createdAt: '2024-01-15T11:30:00Z'
      },
      {
        id: '3',
        name: 'Dr. Roberto Silva',
        email: 'roberto@advogado.com',
        oab: 'OAB/MG 456789',
        specialties: ['Direito Penal', 'Direito Criminal'],
        rating: 4.9,
        consultations: 28,
        status: 'PENDING',
        createdAt: '2024-01-20T14:45:00Z'
      }
    ]

    setLawyers(mockLawyers)
    setLoading(false)
  }, [session, status, router])

  const filteredLawyers = lawyers.filter(lawyer =>
    lawyer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lawyer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lawyer.oab.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return <Badge variant="default">Ativo</Badge>
      case 'INACTIVE':
        return <Badge variant="secondary">Inativo</Badge>
      case 'PENDING':
        return <Badge variant="outline">Pendente</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
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
          <h1 className="text-2xl font-bold tracking-tight">Gerenciar Advogados</h1>
          <p className="text-muted-foreground">
            Gerencie todos os advogados cadastrados na plataforma
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Novo Advogado
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Advogados</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{lawyers.length}</div>
            <p className="text-xs text-muted-foreground">
              Profissionais cadastrados
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Advogados Ativos</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{lawyers.filter(l => l.status === 'ACTIVE').length}</div>
            <p className="text-xs text-muted-foreground">
              Disponíveis para consultas
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Aguardando Aprovação</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{lawyers.filter(l => l.status === 'PENDING').length}</div>
            <p className="text-xs text-muted-foreground">
              Pendentes de verificação
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avaliação Média</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(lawyers.reduce((acc, l) => acc + l.rating, 0) / lawyers.length).toFixed(1)}
            </div>
            <p className="text-xs text-muted-foreground">
              Baseada em avaliações dos clientes
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="flex items-center space-x-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar advogados..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>

      {/* Lawyers Table */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Advogados</CardTitle>
          <CardDescription>
            Todos os advogados registrados na plataforma
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredLawyers.map((lawyer) => (
              <div
                key={lawyer.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <UserCheck className="h-5 w-5 text-primary" />
                  </div>
                  <div className="space-y-1">
                    <p className="font-medium">{lawyer.name}</p>
                    <p className="text-sm text-muted-foreground">{lawyer.email}</p>
                    <p className="text-xs text-muted-foreground">{lawyer.oab}</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {lawyer.specialties.map((specialty, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  {getStatusBadge(lawyer.status)}
                  <div className="text-right">
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{lawyer.rating}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {lawyer.consultations} consultas
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Desde {new Date(lawyer.createdAt).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
