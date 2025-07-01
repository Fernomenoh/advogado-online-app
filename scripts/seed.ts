
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Iniciando seed do banco de dados...')

  // Limpar dados existentes
  await prisma.message.deleteMany()
  await prisma.chat.deleteMany()
  await prisma.payment.deleteMany()
  await prisma.consultation.deleteMany()
  await prisma.lawyerSpecialty.deleteMany()
  await prisma.lawyer.deleteMany()
  await prisma.legalArea.deleteMany()
  await prisma.session.deleteMany()
  await prisma.account.deleteMany()
  await prisma.user.deleteMany()

  // Hash da senha padrão
  const hashedPassword = await bcrypt.hash('johndoe123', 12)

  // 1. Criar usuário admin obrigatório
  const adminUser = await prisma.user.create({
    data: {
      id: 'admin-user-id',
      name: 'John Doe',
      email: 'john@doe.com',
      phone: '(11) 99999-9999',
      profession: 'Administrador',
      password: hashedPassword,
      role: 'ADMIN',
      isActive: true,
    }
  })

  // 2. Criar usuários de exemplo
  const user1 = await prisma.user.create({
    data: {
      name: 'Maria Silva',
      email: 'maria.silva@email.com',
      phone: '(11) 98888-8888',
      profession: 'Empresária',
      password: hashedPassword,
      role: 'USER',
    }
  })

  const user2 = await prisma.user.create({
    data: {
      name: 'Carlos Santos',
      email: 'carlos.santos@email.com',
      phone: '(21) 97777-7777',
      profession: 'Engenheiro',
      password: hashedPassword,
      role: 'USER',
    }
  })

  // 3. Criar áreas legais
  const civilLaw = await prisma.legalArea.create({
    data: {
      name: 'Direito Civil',
      description: 'Questões relacionadas a contratos, propriedade, família e responsabilidade civil.',
    }
  })

  const laborLaw = await prisma.legalArea.create({
    data: {
      name: 'Direito Trabalhista',
      description: 'Relações de trabalho, demissões, direitos trabalhistas e previdenciários.',
    }
  })

  const criminalLaw = await prisma.legalArea.create({
    data: {
      name: 'Direito Penal',
      description: 'Crimes, defesas criminais e questões de segurança pública.',
    }
  })

  const consumerLaw = await prisma.legalArea.create({
    data: {
      name: 'Direito do Consumidor',
      description: 'Proteção ao consumidor, defeitos de produtos e serviços inadequados.',
    }
  })

  const familyLaw = await prisma.legalArea.create({
    data: {
      name: 'Direito de Família',
      description: 'Divórcio, guarda de filhos, pensão alimentícia e questões familiares.',
    }
  })

  // 4. Criar advogados
  const lawyer1 = await prisma.lawyer.create({
    data: {
      name: 'Dr. João Oliveira',
      email: 'joao.oliveira@advogados.com',
      phone: '(11) 96666-6666',
      oabNumber: 'SP123456',
      oabState: 'SP',
      biography: 'Especialista em Direito Civil com 15 anos de experiência. Graduado pela USP e pós-graduado em Direito Empresarial.',
      experience: 15,
      rating: 4.8,
      totalCases: 234,
      isActive: true,
      isVerified: true,
    }
  })

  const lawyer2 = await prisma.lawyer.create({
    data: {
      name: 'Dra. Ana Paula Costa',
      email: 'ana.costa@advogados.com',
      phone: '(21) 95555-5555',
      oabNumber: 'RJ789012',
      oabState: 'RJ',
      biography: 'Advogada trabalhista com vasta experiência em questões sindicais e direitos dos trabalhadores.',
      experience: 12,
      rating: 4.9,
      totalCases: 189,
      isActive: true,
      isVerified: true,
    }
  })

  const lawyer3 = await prisma.lawyer.create({
    data: {
      name: 'Dr. Pedro Ferreira',
      email: 'pedro.ferreira@advogados.com',
      phone: '(11) 94444-4444',
      oabNumber: 'SP345678',
      oabState: 'SP',
      biography: 'Criminalista renomado, especialista em defesa penal e direitos humanos.',
      experience: 20,
      rating: 4.7,
      totalCases: 312,
      isActive: true,
      isVerified: true,
    }
  })

  // 5. Criar especialidades dos advogados
  await prisma.lawyerSpecialty.createMany({
    data: [
      { lawyerId: lawyer1.id, legalAreaId: civilLaw.id },
      { lawyerId: lawyer1.id, legalAreaId: consumerLaw.id },
      { lawyerId: lawyer2.id, legalAreaId: laborLaw.id },
      { lawyerId: lawyer3.id, legalAreaId: criminalLaw.id },
      { lawyerId: lawyer1.id, legalAreaId: familyLaw.id },
    ]
  })

  // 6. Criar consultas de exemplo
  const consultation1 = await prisma.consultation.create({
    data: {
      userId: user1.id,
      lawyerId: lawyer1.id,
      legalAreaId: civilLaw.id,
      title: 'Problema com Contrato de Aluguel',
      description: 'Estou com dificuldades com meu proprietário que não quer fazer reparos necessários no imóvel alugado. Quais são meus direitos?',
      status: 'IN_PROGRESS',
      priority: 'MEDIUM',
      aiResponse: 'Com base na legislação brasileira de locação, o locador tem a obrigação de manter o imóvel em condições de habitabilidade. Você pode exigir os reparos necessários e, em caso de recusa, buscar seus direitos judicialmente.',
      price: 150.00,
      estimatedTime: 60,
    }
  })

  const consultation2 = await prisma.consultation.create({
    data: {
      userId: user2.id,
      lawyerId: lawyer2.id,
      legalAreaId: laborLaw.id,
      title: 'Demissão sem Justa Causa',
      description: 'Fui demitido sem justa causa após 5 anos de empresa. Tenho direito a que tipo de indenização?',
      status: 'COMPLETED',
      priority: 'HIGH',
      aiResponse: 'Em caso de demissão sem justa causa, você tem direito ao aviso prévio, saldo de salário, 13º proporcional, férias proporcionais + 1/3, saque do FGTS e multa de 40% sobre o FGTS.',
      price: 200.00,
      estimatedTime: 45,
      actualTime: 50,
      completedAt: new Date('2025-06-25'),
    }
  })

  const consultation3 = await prisma.consultation.create({
    data: {
      userId: user1.id,
      legalAreaId: consumerLaw.id,
      title: 'Produto Defeituoso',
      description: 'Comprei um celular que apresentou defeito após 2 meses. A loja se recusa a trocar. O que posso fazer?',
      status: 'PENDING',
      priority: 'MEDIUM',
      aiResponse: 'Segundo o Código de Defesa do Consumidor, você tem direito à troca do produto defeituoso. A loja tem prazo de 30 dias para solucionar o problema, caso contrário você pode exigir a troca ou devolução do dinheiro.',
      price: 100.00,
      estimatedTime: 30,
    }
  })

  // 7. Criar chats para consultas ativas
  const chat1 = await prisma.chat.create({
    data: {
      consultationId: consultation1.id,
      userId: user1.id,
      lawyerId: lawyer1.id,
      isActive: true,
    }
  })

  const chat2 = await prisma.chat.create({
    data: {
      consultationId: consultation2.id,
      userId: user2.id,
      lawyerId: lawyer2.id,
      isActive: false,
    }
  })

  // 8. Criar mensagens de exemplo
  await prisma.message.createMany({
    data: [
      {
        chatId: chat1.id,
        userSenderId: user1.id,
        lawyerSenderId: null,
        senderType: 'USER',
        content: 'Olá, Dr. João. Preciso de ajuda com meu problema de aluguel.',
        type: 'TEXT',
        sentAt: new Date('2025-06-29T09:00:00Z'),
      },
      {
        chatId: chat1.id,
        userSenderId: null,
        lawyerSenderId: lawyer1.id,
        senderType: 'LAWYER',
        content: 'Olá, Maria! Vi seu caso. Você pode me enviar uma cópia do contrato de locação?',
        type: 'TEXT',
        sentAt: new Date('2025-06-29T09:15:00Z'),
      },
      {
        chatId: chat1.id,
        userSenderId: user1.id,
        lawyerSenderId: null,
        senderType: 'USER',
        content: 'Claro! Vou digitalizar e enviar hoje mesmo.',
        type: 'TEXT',
        sentAt: new Date('2025-06-29T09:20:00Z'),
      },
      {
        chatId: chat2.id,
        userSenderId: user2.id,
        lawyerSenderId: null,
        senderType: 'USER',
        content: 'Dra. Ana, muito obrigado pela orientação sobre meus direitos trabalhistas!',
        type: 'TEXT',
        sentAt: new Date('2025-06-25T16:30:00Z'),
      },
      {
        chatId: chat2.id,
        userSenderId: null,
        lawyerSenderId: lawyer2.id,
        senderType: 'LAWYER',
        content: 'Foi um prazer ajudar, Carlos! Se precisar de mais alguma coisa, estarei à disposição.',
        type: 'TEXT',
        sentAt: new Date('2025-06-25T16:45:00Z'),
      },
    ]
  })

  // 9. Criar pagamentos
  await prisma.payment.createMany({
    data: [
      {
        consultationId: consultation1.id,
        userId: user1.id,
        amount: 150.00,
        status: 'COMPLETED',
        method: 'PIX',
        transactionId: 'PIX123456789',
      },
      {
        consultationId: consultation2.id,
        userId: user2.id,
        amount: 200.00,
        status: 'COMPLETED',
        method: 'CREDIT_CARD',
        transactionId: 'CC987654321',
      },
      {
        consultationId: consultation3.id,
        userId: user1.id,
        amount: 100.00,
        status: 'PENDING',
        method: 'CREDIT_CARD',
      },
    ]
  })

  console.log('✅ Seed completo!')
  console.log('👤 Usuário admin criado: john@doe.com / johndoe123')
  console.log('📊 Dados de demonstração criados com sucesso!')
}

main()
  .catch((e) => {
    console.error('❌ Erro durante o seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
