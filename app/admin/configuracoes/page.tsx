
'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { Settings, Save, Bell, Mail, Shield, Globe, Database } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

interface SystemSettings {
  siteName: string
  siteDescription: string
  adminEmail: string
  maintenanceMode: boolean
  registrationEnabled: boolean
  emailNotifications: boolean
  smsNotifications: boolean
  autoAssignLawyers: boolean
  maxConsultationsPerDay: number
  consultationTimeout: number
}

export default function AdminConfiguracaoPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [settings, setSettings] = useState<SystemSettings>({
    siteName: 'Advogado Online',
    siteDescription: 'Plataforma de consultas jurídicas online',
    adminEmail: 'admin@advogadoonline.com',
    maintenanceMode: false,
    registrationEnabled: true,
    emailNotifications: true,
    smsNotifications: false,
    autoAssignLawyers: true,
    maxConsultationsPerDay: 50,
    consultationTimeout: 24
  })
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (status === 'loading') return
    
    if (!session) {
      router.push('/login')
      return
    }

    // Simular carregamento das configurações
    setLoading(false)
  }, [session, status, router])

  const handleSave = async () => {
    setSaving(true)
    
    // Simular salvamento das configurações
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    toast.success('Configurações salvas com sucesso!')
    setSaving(false)
  }

  const handleSettingChange = (key: keyof SystemSettings, value: any) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }))
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
          <h1 className="text-2xl font-bold tracking-tight">Configurações do Sistema</h1>
          <p className="text-muted-foreground">
            Gerencie as configurações gerais da plataforma
          </p>
        </div>
        <Button onClick={handleSave} disabled={saving}>
          <Save className="mr-2 h-4 w-4" />
          {saving ? 'Salvando...' : 'Salvar Alterações'}
        </Button>
      </div>

      <div className="grid gap-6">
        {/* Configurações Gerais */}
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Globe className="h-5 w-5" />
              <CardTitle>Configurações Gerais</CardTitle>
            </div>
            <CardDescription>
              Configurações básicas do site e da plataforma
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="siteName">Nome do Site</Label>
                <Input
                  id="siteName"
                  value={settings.siteName}
                  onChange={(e) => handleSettingChange('siteName', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="adminEmail">Email do Administrador</Label>
                <Input
                  id="adminEmail"
                  type="email"
                  value={settings.adminEmail}
                  onChange={(e) => handleSettingChange('adminEmail', e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="siteDescription">Descrição do Site</Label>
              <Textarea
                id="siteDescription"
                value={settings.siteDescription}
                onChange={(e) => handleSettingChange('siteDescription', e.target.value)}
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Configurações do Sistema */}
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Settings className="h-5 w-5" />
              <CardTitle>Sistema</CardTitle>
            </div>
            <CardDescription>
              Configurações de funcionamento do sistema
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Modo de Manutenção</Label>
                <p className="text-sm text-muted-foreground">
                  Desabilita o acesso público ao site
                </p>
              </div>
              <div className="flex items-center space-x-2">
                {settings.maintenanceMode && <Badge variant="destructive">Ativo</Badge>}
                <Switch
                  checked={settings.maintenanceMode}
                  onCheckedChange={(checked) => handleSettingChange('maintenanceMode', checked)}
                />
              </div>
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Registro de Novos Usuários</Label>
                <p className="text-sm text-muted-foreground">
                  Permite que novos usuários se cadastrem
                </p>
              </div>
              <Switch
                checked={settings.registrationEnabled}
                onCheckedChange={(checked) => handleSettingChange('registrationEnabled', checked)}
              />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Atribuição Automática de Advogados</Label>
                <p className="text-sm text-muted-foreground">
                  Atribui automaticamente advogados às consultas
                </p>
              </div>
              <Switch
                checked={settings.autoAssignLawyers}
                onCheckedChange={(checked) => handleSettingChange('autoAssignLawyers', checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Configurações de Notificação */}
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Bell className="h-5 w-5" />
              <CardTitle>Notificações</CardTitle>
            </div>
            <CardDescription>
              Configure como e quando enviar notificações
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Notificações por Email</Label>
                <p className="text-sm text-muted-foreground">
                  Enviar notificações importantes por email
                </p>
              </div>
              <Switch
                checked={settings.emailNotifications}
                onCheckedChange={(checked) => handleSettingChange('emailNotifications', checked)}
              />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Notificações por SMS</Label>
                <p className="text-sm text-muted-foreground">
                  Enviar notificações urgentes por SMS
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant="outline">Em breve</Badge>
                <Switch
                  checked={settings.smsNotifications}
                  onCheckedChange={(checked) => handleSettingChange('smsNotifications', checked)}
                  disabled
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Limites e Quotas */}
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Database className="h-5 w-5" />
              <CardTitle>Limites e Quotas</CardTitle>
            </div>
            <CardDescription>
              Configure limites de uso da plataforma
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="maxConsultations">Máximo de Consultas por Dia</Label>
                <Input
                  id="maxConsultations"
                  type="number"
                  value={settings.maxConsultationsPerDay}
                  onChange={(e) => handleSettingChange('maxConsultationsPerDay', parseInt(e.target.value) || 0)}
                />
                <p className="text-xs text-muted-foreground">
                  Limite diário de novas consultas na plataforma
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="consultationTimeout">Timeout de Consulta (horas)</Label>
                <Input
                  id="consultationTimeout"
                  type="number"
                  value={settings.consultationTimeout}
                  onChange={(e) => handleSettingChange('consultationTimeout', parseInt(e.target.value) || 0)}
                />
                <p className="text-xs text-muted-foreground">
                  Tempo limite para resposta de consultas
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Informações do Sistema */}
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5" />
              <CardTitle>Informações do Sistema</CardTitle>
            </div>
            <CardDescription>
              Informações técnicas e de segurança
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Versão da Aplicação</Label>
                <p className="text-sm text-muted-foreground">v1.0.0</p>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium">Última Atualização</Label>
                <p className="text-sm text-muted-foreground">30 de Janeiro, 2024</p>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium">Ambiente</Label>
                <Badge variant="outline">Desenvolvimento</Badge>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium">Status do Banco</Label>
                <Badge variant="default">Conectado</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
