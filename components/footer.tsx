
import Link from 'next/link'
import { Scale, Mail, Phone, Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Scale className="h-8 w-8 text-blue-400" />
              <span className="font-bold text-xl">Advogado Online</span>
            </div>
            <p className="text-gray-400 mb-4 max-w-md">
              Conectamos você com advogados qualificados para consultas jurídicas 
              rápidas e eficientes, baseadas nas leis brasileiras.
            </p>
            <div className="mb-4">
              <Link href="/colaboracao">
                <Button variant="outline" size="sm" className="text-blue-400 border-blue-400 hover:bg-blue-400 hover:text-white">
                  <Heart className="h-4 w-4 mr-2" />
                  Colaborar com PIX
                </Button>
              </Link>
            </div>
            <p className="text-sm text-gray-500">
              © 2025 Advogado Online. Todos os direitos reservados.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/#como-funciona" className="text-gray-400 hover:text-white transition-colors">
                  Como Funciona
                </Link>
              </li>
              <li>
                <Link href="/#areas-juridicas" className="text-gray-400 hover:text-white transition-colors">
                  Áreas Jurídicas
                </Link>
              </li>
              <li>
                <Link href="/contato" className="text-gray-400 hover:text-white transition-colors">
                  Contato
                </Link>
              </li>
              <li>
                <Link href="/colaboracao" className="text-gray-400 hover:text-white transition-colors">
                  Colaborar
                </Link>
              </li>
              <li>
                <Link href="/login" className="text-gray-400 hover:text-white transition-colors">
                  Entrar
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Criador</h3>
            <div className="space-y-3 text-gray-400">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-blue-400" />
                <a 
                  href="mailto:fernandofhrt@gmail.com" 
                  className="hover:text-white transition-colors"
                >
                  fernandofhrt@gmail.com
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-blue-400" />
                <a 
                  href="tel:+5491134690615" 
                  className="hover:text-white transition-colors"
                >
                  +54 9 11 34690615
                </a>
              </div>
              <p className="text-sm mt-2">
                Suporte disponível 24/7 através da plataforma
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p className="text-sm">
            <strong>Aviso Legal:</strong> As informações fornecidas por nossa IA são apenas orientativas 
            e não substituem a consulta com um advogado qualificado.
          </p>
        </div>
      </div>
    </footer>
  )
}
