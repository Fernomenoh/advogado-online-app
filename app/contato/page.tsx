
import { Metadata } from 'next'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Scale, Mail, Phone, MapPin, Clock, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Contato - Advogado Online',
  description: 'Entre em contato conosco para dúvidas, suporte ou sugestões. Estamos aqui para ajudar.',
}

export default function ContatoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="bg-blue-100 rounded-full p-4">
              <Scale className="h-12 w-12 text-blue-600" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Entre em Contato
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Estamos aqui para ajudar! Entre em contato conosco para dúvidas, 
            suporte técnico ou sugestões de melhoria.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Informações de Contato
            </h2>
            
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Mail className="h-5 w-5 text-blue-600" />
                    <span>Email</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-2">
                    Para dúvidas técnicas, suporte ou sugestões:
                  </p>
                  <a 
                    href="mailto:fernandofhrt@gmail.com" 
                    className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
                  >
                    fernandofhrt@gmail.com
                  </a>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Phone className="h-5 w-5 text-blue-600" />
                    <span>Telefone</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-2">
                    WhatsApp e ligações:
                  </p>
                  <a 
                    href="tel:+5491134690615" 
                    className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
                  >
                    +54 9 11 34690615
                  </a>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Clock className="h-5 w-5 text-blue-600" />
                    <span>Horário de Atendimento</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-1 text-gray-600">
                    <p><strong>Plataforma:</strong> 24/7 (Suporte automatizado)</p>
                    <p><strong>Suporte Direto:</strong> Segunda a Sexta, 9h às 18h</p>
                    <p><strong>Emergências:</strong> Via WhatsApp</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Quick Actions */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Como Podemos Ajudar?
            </h2>
            
            <div className="space-y-4">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <MessageCircle className="h-5 w-5 text-green-600" />
                    <span>Suporte Técnico</span>
                  </CardTitle>
                  <CardDescription>
                    Problemas com login, consultas ou funcionalidades da plataforma
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" asChild>
                    <a href="mailto:fernandofhrt@gmail.com?subject=Suporte Técnico - Advogado Online">
                      Enviar Email de Suporte
                    </a>
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Scale className="h-5 w-5 text-blue-600" />
                    <span>Dúvidas Jurídicas</span>
                  </CardTitle>
                  <CardDescription>
                    Use nossa plataforma com IA especializada em direito brasileiro
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" variant="outline" asChild>
                    <Link href="/login">
                      Fazer Consulta Jurídica
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <MessageCircle className="h-5 w-5 text-purple-600" />
                    <span>Sugestões e Feedback</span>
                  </CardTitle>
                  <CardDescription>
                    Ajude-nos a melhorar a plataforma com suas ideias
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" variant="outline" asChild>
                    <a href="mailto:fernandofhrt@gmail.com?subject=Sugestão - Advogado Online">
                      Enviar Sugestão
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Creator Info */}
            <Card className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
              <CardHeader>
                <CardTitle className="text-blue-800">Sobre o Criador</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">
                  Fernando é o desenvolvedor por trás do Advogado Online, uma plataforma 
                  criada para democratizar o acesso à informação jurídica através da 
                  tecnologia e inteligência artificial.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button size="sm" variant="outline" asChild>
                    <a href="mailto:fernandofhrt@gmail.com">
                      <Mail className="h-4 w-4 mr-2" />
                      Email
                    </a>
                  </Button>
                  <Button size="sm" variant="outline" asChild>
                    <a href="https://wa.me/5491134690615" target="_blank" rel="noopener noreferrer">
                      <Phone className="h-4 w-4 mr-2" />
                      WhatsApp
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-semibold text-gray-900 mb-8 text-center">
            Perguntas Frequentes
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Como funciona a IA jurídica?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Nossa IA é especializada em leis brasileiras e fornece orientações 
                  baseadas em legislação atualizada. Lembre-se que é apenas consultiva.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Os dados são seguros?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Sim! Utilizamos criptografia e seguimos as melhores práticas de 
                  segurança para proteger suas informações pessoais.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Posso confiar nas respostas da IA?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  As respostas são orientativas e baseadas em leis brasileiras. Para 
                  casos complexos, sempre consulte um advogado qualificado.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Como reportar problemas?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Use o email fernandofhrt@gmail.com com "Suporte Técnico" no assunto. 
                  Responderemos em até 24 horas.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
