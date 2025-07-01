import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/db';
// Importe o tipo Consultation do Prisma, se ele for gerado automaticamente.
// Se não, a interface ConsultationData abaixo servirá para tipagem.
// import { Consultation as PrismaConsultation } from '@prisma/client';

// Define uma interface para o objeto Consultation.
// Use os status reais do seu enum ou apenas 'string'.
// Adicione outras propriedades que você possa usar de Consultation, ex: id, createdAt, lawyerId, userId
interface ConsultationData {
  id: string; // Exemplo de ID
  status: 'PENDING' | 'ASSIGNED' | 'IN_PROGRESS' | 'COMPLETED' | string;
  // Adicione outras propriedades relevantes do seu modelo Consultation, se existirem
  // Ex: userId: string;
  // Ex: lawyerId: string | null;
  // Ex: createdAt: Date;
}

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession();

    // Se esta rota não exige autenticação de ADMIN, ajuste a condição abaixo
    // ou remova-a se for uma rota pública.
    if (!session?.user?.id) { // Removi a verificação de role 'ADMIN' se esta rota não for exclusiva para admin
      return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
    }

    // Buscar todas as consultas para poder filtrar e contar
    const allConsultations: ConsultationData[] = await prisma.consultation.findMany();

    const stats = {
      total: allConsultations.length,
      // A tipagem de 'c' foi corrigida para ConsultationData
      pending: allConsultations.filter((c: ConsultationData) => c.status === 'PENDING').length,
      assigned: allConsultations.filter((c: ConsultationData) => c.status === 'ASSIGNED').length,
      inProgress: allConsultations.filter((c: ConsultationData) => c.status === 'IN_PROGRESS').length,
      completed: allConsultations.filter((c: ConsultationData) => c.status === 'COMPLETED').length,
      // Adicione outras estatísticas que você possa precisar aqui
    };

    return NextResponse.json({ stats });
  } catch (error) {
    console.error('Erro ao buscar estatísticas de consultas:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
