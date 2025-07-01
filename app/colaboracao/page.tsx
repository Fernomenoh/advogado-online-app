
'use client'

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Heart, QrCode, Copy, CheckCircle, Coffee, Zap, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Image from 'next/image'
import Link from 'next/link'

export default function ColaboracaoPage() {
  const pixKey = "06708216671"

  const copyPixKey = () => {
    navigator.clipboard.writeText(pixKey)
    // You could add a toast notification here
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-blue-50 to-white">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-full p-4">
              <Heart className="h-12 w-12 text-purple-600" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Colabore Conosco
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Sua colaboração nos ajuda a manter a plataforma gratuita e em constante 
            evolução para democratizar o acesso à informação jurídica.
          </p>
        </div>

        {/* Why Collaborate Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-semibold text-gray-900 mb-8 text-center">
            Por que Colaborar?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-center mb-2">
                  <div className="bg-green-100 rounded-full p-3">
                    <Coffee className="h-6 w-6 text-green-600" />
                  </div>
                </div>
                <CardTitle className="text-lg">Mantenha Gratuito</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Sua colaboração ajuda a manter a plataforma 100% gratuita 
                  para todos os usuários.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-center mb-2">
                  <div className="bg-blue-100 rounded-full p-3">
                    <Zap className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
                <CardTitle className="text-lg">Novas Funcionalidades</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Investimos em melhorias, novas funcionalidades e 
                  integração com mais serviços jurídicos.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-center mb-2">
                  <div className="bg-purple-100 rounded-full p-3">
                    <Star className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
                <CardTitle className="text-lg">Qualidade Superior</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Aprimoramos a IA, melhoramos a interface e 
                  oferecemos suporte ainda melhor.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* PIX Donation Section */}
          <div>
            <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200">
              <CardHeader className="text-center">
                <CardTitle className="flex items-center justify-center space-x-2 text-2xl">
                  <QrCode className="h-6 w-6 text-blue-600" />
                  <span>Colaborar via PIX</span>
                </CardTitle>
                <CardDescription className="text-lg">
                  Rápido, seguro e prático
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* QR Code */}
                <div className="flex justify-center">
                  <div className="bg-white p-4 rounded-lg shadow-lg">
                    <Image
                      src="https://cdn.abacus.ai/images/1c7e16ca-90b5-44e8-b5e7-8f4814281057.png"
                      alt="QR Code PIX para colaboração"
                      width={200}
                      height={200}
                      className="rounded-lg"
                    />
                  </div>
                </div>

                {/* PIX Key */}
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-2">Chave PIX:</p>
                  <div className="bg-white rounded-lg p-3 border-2 border-dashed border-blue-300">
                    <div className="flex items-center justify-between">
                      <code className="text-lg font-mono text-blue-800 font-semibold">
                        {pixKey}
                      </code>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={copyPixKey}
                        className="ml-2"
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Clique para copiar a chave PIX
                  </p>
                </div>

                {/* Instructions */}
                <div className="bg-white/50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Como colaborar:</h4>
                  <ol className="text-sm text-gray-600 space-y-1">
                    <li>1. Abra seu app bancário</li>
                    <li>2. Escaneie o QR Code ou copie a chave PIX</li>
                    <li>3. Escolha o valor da sua colaboração</li>
                    <li>4. Confirme a transferência</li>
                  </ol>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Collaboration Tiers */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-6">
              Formas de Colaborar
            </h3>
            
            <div className="space-y-4">
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center space-x-2">
                      <Coffee className="h-5 w-5 text-amber-600" />
                      <span>Café do Desenvolvedor</span>
                    </CardTitle>
                    <Badge variant="secondary">R$ 5,00</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Um cafezinho para manter a energia durante o desenvolvimento 
                    de novas funcionalidades.
                  </p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow border-blue-200">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center space-x-2">
                      <Zap className="h-5 w-5 text-blue-600" />
                      <span>Impulso Mensal</span>
                    </CardTitle>
                    <Badge className="bg-blue-100 text-blue-800">R$ 20,00</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Ajuda a cobrir custos de hospedagem e manutenção da plataforma 
                    por um mês.
                  </p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow border-purple-200">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center space-x-2">
                      <Star className="h-5 w-5 text-purple-600" />
                      <span>Colaborador Premium</span>
                    </CardTitle>
                    <Badge className="bg-purple-100 text-purple-800">R$ 50,00+</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Investimento significativo em melhorias da IA e novas funcionalidades 
                    para toda a comunidade.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-gray-50 to-blue-50 border-gray-200">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Heart className="h-5 w-5 text-red-500" />
                    <span>Valor Livre</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Qualquer valor é bem-vindo! Cada contribuição, por menor que seja, 
                    faz diferença no desenvolvimento da plataforma.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Transparency Section */}
        <div className="mt-16">
          <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-green-800">
                <CheckCircle className="h-6 w-6" />
                <span>Transparência Total</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Como usamos sua colaboração:</h4>
                  <ul className="text-gray-600 space-y-1 text-sm">
                    <li>• Hospedagem e infraestrutura da plataforma</li>
                    <li>• Melhoria dos modelos de IA jurídica</li>
                    <li>• Desenvolvimento de novas funcionalidades</li>
                    <li>• Suporte técnico e manutenção</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Nosso compromisso:</h4>
                  <ul className="text-gray-600 space-y-1 text-sm">
                    <li>• Plataforma sempre gratuita para usuários</li>
                    <li>• Código aberto e transparente</li>
                    <li>• Foco na democratização do acesso jurídico</li>
                    <li>• Sem anúncios intrusivos</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Alternative Collaboration */}
        <div className="mt-12 text-center">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Outras Formas de Colaborar
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="outline" asChild>
              <Link href="/contato">
                Reportar Bugs
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/contato">
                Sugerir Melhorias
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/contato">
                Compartilhar Feedback
              </Link>
            </Button>
          </div>
          <p className="text-gray-600 mt-4 text-sm">
            Sua opinião e feedback também são formas valiosas de colaboração!
          </p>
        </div>
      </main>

      <Footer />
    </div>
  )
}
