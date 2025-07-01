
'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { 
  ArrowLeft, 
  Send, 
  User, 
  Bot, 
  Calendar, 
  Clock,
  MapPin,
  Star,
  FileText,
  CreditCard
} from 'lucide-react'
import { motion } from 'framer-motion'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { useToast } from '@/hooks/use-toast'
import { ConsultationWithRelations, ChatWithRelations, Message } from '@/lib/types'

export default function ConsultaDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const [consultation, setConsultation] = useState<ConsultationWithRelations | null>(null)
  const [chat, setChat] = useState<ChatWithRelations | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [isSending, setIsSending] = useState(false)

  useEffect(() => {
    fetchConsultationDetails()
  }, [params.id])

  const fetchConsultationDetails = async () => {
    try {
      const response = await fetch(`/api/consultations/${params.id}`)
      if (response.ok) {
        const data = await response.json()
        setConsultation(data.consultation)
        setChat(data.chat)
        setMessages(data.messages || [])
      } else {
        toast({
          title: 'Consulta não encontrada',
          description: 'A consulta solicitada não foi encontrada.',
          variant: 'destructive',
        })
        router.push('/dashboard/consultas')
      }
    } catch (error) {
      console.error('Erro ao buscar detalhes da consulta:', error)
      toast({
        title: 'Erro interno',
        description: 'Erro ao carregar os detalhes da consulta.',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const sendMessage = async () => {
    if (!newMessage.trim() || !chat) return

    setIsSending(true)
    try {
      const response = await fetch(`/api/chats/${chat.id}/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: newMessage.trim(),
          type: 'TEXT'
        }),
      })

      if (response.ok) {
        const data = await response.json()
        setMessages(prev => [...prev, data.message])
        setNewMessage('')
      } else {
        toast({
          title: 'Erro ao enviar mensagem',
          description: 'Tente novamente em alguns instantes.',
          variant: 'destructive',
        })
      }
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error)
      toast({
        title: 'Erro interno',
        description: 'Erro ao enviar mensagem.',
        variant: 'destructive',
      })
    } finally {
      setIsSending(false)
    }
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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!consultation) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Consulta não encontrada</h2>
        <p className="text-gray-600 mb-4">A consulta que você está procurando não existe.</p>
        <Button onClick={() => router.back()}>Voltar</Button>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center space-x-4"
      >
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.back()}
          className="flex items-center"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{consultation.title}</h1>
          <p className="text-gray-600">Consulta #{consultation.id.slice(-8)}</p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chat Section */}
        <div className="lg:col-span-2">
          {chat ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card className="h-[600px] flex flex-col">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Chat da Consulta</span>
                    <Badge className={getStatusColor(consultation.status)}>
                      {getStatusText(consultation.status)}
                    </Badge>
                  </CardTitle>
                  {consultation.lawyer && (
                    <CardDescription>
                      Conversando com Dr(a). {consultation.lawyer.name}
                    </CardDescription>
                  )}
                </CardHeader>
                
                <CardContent className="flex-1 flex flex-col">
                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                    {messages.map((message, index) => (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className={`flex ${message.senderType === 'USER' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                          message.senderType === 'USER' 
                            ? 'bg-primary text-white' 
                            : 'bg-gray-100 text-gray-900'
                        }`}>
                          <div className="flex items-center space-x-2 mb-1">
                            {message.senderType === 'USER' ? (
                              <User className="h-3 w-3" />
                            ) : (
                              <Bot className="h-3 w-3" />
                            )}
                            <span className="text-xs font-medium">
                              {message.senderType === 'USER' ? 'Você' : 'Advogado'}
                            </span>
                          </div>
                          <p className="text-sm">{message.content}</p>
                          <p className="text-xs opacity-70 mt-1">
                            {format(new Date(message.sentAt), 'HH:mm', { locale: ptBR })}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Send Message */}
                  {consultation.status === 'IN_PROGRESS' && (
                    <div className="flex space-x-2">
                      <Textarea
                        placeholder="Digite sua mensagem..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        className="flex-1 min-h-[40px] max-h-[100px]"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault()
                            sendMessage()
                          }
                        }}
                      />
                      <Button 
                        onClick={sendMessage} 
                        disabled={!newMessage.trim() || isSending}
                        size="sm"
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ) : (
            /* AI Response Card */
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Bot className="h-5 w-5 mr-2" />
                    Análise da IA Jurídica
                  </CardTitle>
                  <CardDescription>
                    Nossa IA analisou seu caso e forneceu uma resposta inicial
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {consultation.aiResponse ? (
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="text-blue-900 whitespace-pre-wrap">
                        {consultation.aiResponse}
                      </p>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Bot className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600">
                        Nossa IA está analisando seu caso. A resposta estará disponível em breve.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>

        {/* Sidebar with details */}
        <div className="space-y-6">
          {/* Consultation Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="h-5 w-5 mr-2" />
                  Detalhes da Consulta
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Área Jurídica</label>
                  <p className="text-gray-900">{consultation.legalArea?.name}</p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-500">Descrição</label>
                  <p className="text-gray-900 text-sm">{consultation.description}</p>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Status</label>
                    <div className="mt-1">
                      <Badge className={getStatusColor(consultation.status)}>
                        {getStatusText(consultation.status)}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <label className="text-sm font-medium text-gray-500">Prioridade</label>
                    <p className="text-gray-900 text-sm">
                      {consultation.priority === 'LOW' && 'Baixa'}
                      {consultation.priority === 'MEDIUM' && 'Média'}
                      {consultation.priority === 'HIGH' && 'Alta'}
                      {consultation.priority === 'URGENT' && 'Urgente'}
                    </p>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-500">Data de Criação</label>
                  <p className="text-gray-900 text-sm">
                    {format(new Date(consultation.createdAt), 'dd/MM/yyyy HH:mm', { locale: ptBR })}
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Lawyer Details */}
          {consultation.lawyer && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <User className="h-5 w-5 mr-2" />
                    Advogado Responsável
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <h3 className="font-medium text-gray-900">{consultation.lawyer.name}</h3>
                    <p className="text-sm text-gray-600">{consultation.lawyer.oabNumber}/{consultation.lawyer.oabState}</p>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium">{consultation.lawyer.rating?.toFixed(1)}</span>
                    <span className="text-sm text-gray-500">({consultation.lawyer.totalCases} casos)</span>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-500">Experiência</label>
                    <p className="text-sm text-gray-900">{consultation.lawyer.experience} anos</p>
                  </div>

                  {consultation.lawyer.biography && (
                    <div>
                      <label className="text-sm font-medium text-gray-500">Sobre</label>
                      <p className="text-sm text-gray-900">{consultation.lawyer.biography}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Payment Details */}
          {consultation.payment && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CreditCard className="h-5 w-5 mr-2" />
                    Pagamento
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Valor</span>
                    <span className="font-medium">R$ {consultation.payment.amount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Método</span>
                    <span className="text-sm">{consultation.payment.method}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Status</span>
                    <Badge variant={consultation.payment.status === 'COMPLETED' ? 'default' : 'secondary'}>
                      {consultation.payment.status === 'COMPLETED' ? 'Pago' : 'Pendente'}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}
