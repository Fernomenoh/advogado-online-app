
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/db'

export const dynamic = "force-dynamic"

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession()
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    const consultation = await prisma.consultation.findFirst({
      where: {
        id: params.id,
        userId: session.user.id
      },
      include: {
        user: true,
        lawyer: true,
        legalArea: true,
        chat: {
          include: {
            messages: {
              orderBy: {
                sentAt: 'asc'
              }
            }
          }
        },
        payment: true
      }
    })

    if (!consultation) {
      return NextResponse.json({ error: 'Consulta não encontrada' }, { status: 404 })
    }

    return NextResponse.json({
      consultation,
      chat: consultation.chat,
      messages: consultation.chat?.messages || []
    })
  } catch (error) {
    console.error('Erro ao buscar consulta:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}
