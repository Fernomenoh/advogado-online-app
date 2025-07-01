import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/db';
// Importe o tipo Consultation do Prisma, se ele for gerado automaticamente.
// Se não, a interface ConsultationData abaixo servirá para tipagem.
// import { Consultation as PrismaConsultation } from '@prisma/client';

// Define uma interface para o objeto Consultation, com base no que você usa.
// Se você usa o Prisma, o tipo real seria algo como Prisma.ConsultationGetPayload<{}>
// ou simplesmente o tipo gerado pelo Prisma para o seu modelo Consultation.
// Para resolver o erro de tipagem, uma interface mínima é suficiente.
interface ConsultationData {
  id: string; // Adicione outras propriedades importantes do seu modelo Consultation
  status: 'PENDING' | 'ASSIGNED' | 'IN_PROGRESS' | 'COMPLETED' | string; // Use os status reais do seu enum ou apenas 'string'
  // Adicione outras propriedades que você possa usar de Consultation, ex: createdAt, lawyerId, userId
}

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession();

    if (!session?.user?.id || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

    // Buscar todas as estatísticas e os dados de consultas e pagamentos em paralelo
    const [
      totalUsers,
      totalLawyers,
      allConsultations, // Agora buscamos o array completo de consultas
      payments
    ] = await Promise.all([
      prisma.user.count({ where: { role: 'USER' } }),
      prisma.lawyer.count({ where: { isActive: true } }),
      prisma.consultation.findMany(), // Busca todos os registros de consulta
      prisma.payment.findMany({ where: { status: 'COMPLETED' } })
    ]);

    // Calcular o faturamento total
    // A tipagem de 'payment' foi corrigida para { amount: number }
    const totalRevenue = payments.reduce((sum: number, payment: { amount: number }) => sum + payment.amount, 0);

    // Calcular as estatísticas de consulta a partir do array 'allConsultations'
    const stats = {
      totalUsers,
      totalLawyers,
      // Agora derivamos as contagens do array 'allConsultations'
      totalConsultations: allConsultations.length,
      // A tipagem de 'c' foi corrigida para ConsultationData
      pendingConsultations: allConsultations.filter((c: ConsultationData) => c.status === 'PENDING').length,
      assignedConsultations: allConsultations.filter((c: ConsultationData) => c.status === 'ASSIGNED').length,
      inProgressConsultations: allConsultations.filter((c: ConsultationData) => c.status === 'IN_PROGRESS').length,
      completedConsultations: allConsultations.filter((c: ConsultationData) => c.status === 'COMPLETED').length,
      totalRevenue,
      monthlyGrowth: 15 // Simulado para demonstração
    };

    return NextResponse.json({ stats });
  } catch (error) {
    console.error('Erro ao buscar estatísticas admin:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
