
export interface User {
  id: string
  name: string
  email: string
  phone?: string
  profession?: string
  role: 'USER' | 'ADMIN' | 'LAWYER'
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

export interface Lawyer {
  id: string
  name: string
  email: string
  phone: string
  oabNumber: string
  oabState: string
  biography?: string
  experience?: number
  rating: number
  totalCases: number
  isActive: boolean
  isVerified: boolean
  createdAt: Date
  updatedAt: Date
}

export interface LegalArea {
  id: string
  name: string
  description?: string
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

export interface Consultation {
  id: string
  userId: string
  lawyerId?: string
  legalAreaId: string
  title: string
  description: string
  status: 'PENDING' | 'ASSIGNED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED'
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT'
  aiResponse?: string
  price: number
  estimatedTime?: number
  actualTime?: number
  createdAt: Date
  updatedAt: Date
  completedAt?: Date
}

export interface Chat {
  id: string
  consultationId: string
  userId: string
  lawyerId?: string
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

export interface Message {
  id: string
  chatId: string
  userSenderId?: string
  lawyerSenderId?: string
  senderType: 'USER' | 'LAWYER'
  content: string
  type: 'TEXT' | 'FILE' | 'SYSTEM'
  isRead: boolean
  sentAt: Date
}

export interface Payment {
  id: string
  consultationId: string
  userId: string
  amount: number
  status: 'PENDING' | 'COMPLETED' | 'FAILED' | 'REFUNDED'
  method: 'CREDIT_CARD' | 'DEBIT_CARD' | 'PIX' | 'BANK_TRANSFER'
  transactionId?: string
  createdAt: Date
  updatedAt: Date
}

export interface ConsultationWithRelations extends Consultation {
  user: User
  lawyer?: Lawyer
  legalArea: LegalArea
  chat?: Chat
  payment?: Payment
}

export interface ChatWithRelations extends Chat {
  consultation: ConsultationWithRelations
  user: User
  lawyer?: Lawyer
  messages: Message[]
}

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      name: string
      email: string
      role: 'USER' | 'ADMIN' | 'LAWYER'
    }
  }

  interface User {
    role: 'USER' | 'ADMIN' | 'LAWYER'
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    role: 'USER' | 'ADMIN' | 'LAWYER'
  }
}
