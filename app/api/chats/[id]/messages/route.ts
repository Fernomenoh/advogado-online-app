
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/db'

export const dynamic = "force-dynamic"

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession()
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    const { content, type = 'TEXT' } = await request.json()

    if (!content?.trim()) {
      return NextResponse.json(
        { error: 'Conteúdo da mensagem é obrigatório' },
        { status: 400 }
      )
    }

    // Verificar se o chat existe e o usuário tem acesso
    const chat = await prisma.chat.findFirst({
      where: {
        id: params.id,
        userId: session.user.id
      },
      include: {
        consultation: true
      }
    })

    if (!chat) {
      return NextResponse.json({ error: 'Chat não encontrado' }, { status: 404 })
    }

    // Criar mensagem
    const message = await prisma.message.create({
      data: {
        chatId: chat.id,
        userSenderId: session.user.id,
        lawyerSenderId: null,
        senderType: 'USER',
        content: content.trim(),
        type,
      }
    })

    return NextResponse.json({ message }, { status: 201 })
  } catch (error) {
    console.error('Erro ao enviar mensagem:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}
