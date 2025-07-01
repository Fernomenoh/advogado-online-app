
# 📱 Advogado Online - Aplicação Móvil

> Consultoria jurídica inteligente com IA - Versão Móvil

## 🎯 Visão Geral

A aplicação móvil **Advogado Online** foi desenvolvida usando **Capacitor** para converter a aplicação web Next.js existente em uma aplicação nativa para Android e iOS.

## ✨ Funcionalidades Móviles

### 🔒 Autenticação
- Login/cadastro com email e senha
- Sessão persistente
- Conta demo: `john@doe.com` / `johndoe123`

### 💬 Consultoria Jurídica
- Chat com IA jurídica especializada
- Consultas em tempo real
- Áreas jurídicas: Civil, Trabalhista, Penal, Família, Empresarial, Trânsito
- Histórico de consultas

### 👥 Dashboard
- Painel personalizado
- Estatísticas de consultas
- Acesso rápido às funcionalidades
- Perfil do usuário

### 🎨 Design Mobile-First
- Interface otimizada para touch
- Splash screens personalizados
- Ícones adaptativos
- Tema consistente: Azul #0A3D62

## 🛠️ Tecnologias

- **Framework**: Next.js 14 + React 18
- **Mobile**: Capacitor 7.4.0
- **Styling**: Tailwind CSS + Shadcn/ui
- **Animation**: Framer Motion
- **Database**: PostgreSQL + Prisma
- **Auth**: NextAuth.js
- **AI**: Abacus.AI LLM APIs

## 📁 Estrutura do Projeto

```
advogado-online/app/
├── android/                    # 🤖 Projeto Android
├── ios/                        # 🍎 Projeto iOS  
├── capacitor-build/            # 📱 Assets móviles
│   ├── icons/                  # Ícones (8 tamaños)
│   ├── splash/                 # Splash screens
│   ├── screenshots/            # Screenshots das tiendas
│   ├── index.html              # Entry point móvil
│   ├── manifest.json           # PWA manifest
│   └── service-worker.js       # Service worker
├── app/                        # 🌐 Aplicação web Next.js
├── components/                 # 🧩 Componentes React
├── capacitor.config.ts         # ⚙️ Configuração Capacitor
└── build-mobile.sh            # 🔨 Script de build
```

## 🚀 Comandos Rápidos

### Desenvolvimento
```bash
# Build e sync
./build-mobile.sh

# Abrir Android Studio
npx cap open android

# Abrir Xcode (macOS)
npx cap open ios

# Run em dispositivo
npx cap run android
npx cap run ios
```

### Produção
```bash
# Android APK/AAB
cd android && ./gradlew assembleRelease

# iOS Archive (em Xcode)
Product → Archive
```

## 📱 Assets Móviles

### Ícones Gerados
- ✅ 8 tamaños diferentes (72px a 512px)
- ✅ Design profissional com balança da justiça
- ✅ Cores: Azul #0A3D62 sobre branco
- ✅ Otimizados para Android e iOS

### Splash Screens
- ✅ Android: 4 densidades (hdpi a xxxhdpi)
- ✅ iOS: 4 tamaños principais 
- ✅ Design degradado azul com logo
- ✅ Temática jurídica profissional

### Screenshots das Tiendas
- ✅ Móvil: 5 telas principais (390×844px)
- ✅ Tablet: 2 telas ampliadas (1280×720px)
- ✅ Mockups realistas da interface
- ✅ Prontos para Google Play Store e Apple App Store

## 🔧 Configuração

### App Information
- **App ID**: `com.advogadoonline.app`
- **Nome**: `Advogado Online`
- **Versão**: `1.0.0`
- **Orientação**: Portrait (principal)
- **Target**: Android 7.0+ / iOS 12.0+

### Cores e Tema
- **Primary**: `#0A3D62` (Azul escuro)
- **Background**: `#FFFFFF` (Branco)
- **Accent**: Tons de azul claro
- **Status Bar**: Dark content

### Servidor
- **Desenvolvimento**: `http://localhost:3000`
- **Produção**: Configurar URL de produção
- **Scheme**: HTTPS (recomendado)

## 📚 Documentação

- 📖 **[Guia de Deployment Completo](./MOBILE_DEPLOYMENT_GUIDE.md)**
- 🤖 **Google Play Store**: Instruções detalhadas
- 🍎 **Apple App Store**: Processo completo
- 🔧 **Troubleshooting**: Soluções comuns

## 🎯 Próximos Passos

### Para Publicar:

1. **Configurar Contas**:
   - [ ] Google Play Console ($25 único)
   - [ ] Apple Developer Program ($99 anuais)

2. **Builds de Produção**:
   - [ ] Gerar certificados de assinatura
   - [ ] Build Android AAB
   - [ ] Archive iOS em Xcode

3. **Store Listings**:
   - [ ] Configurar informações da app
   - [ ] Upload dos screenshots
   - [ ] Política de privacidade
   - [ ] Descrições e keywords

4. **Testes**:
   - [ ] Testes em dispositivos reais
   - [ ] Verificar todas as funcionalidades
   - [ ] Beta testing (opcional)

### Melhorias Futuras:

- 🔔 Push notifications
- 📄 Upload de documentos
- 🔍 Busca avançada
- 📊 Analytics integrados
- 🌐 Offline mode
- 🎨 Temas personalizados

## 📞 Suporte

Para dúvidas sobre a aplicação móvil:

- **Capacitor**: [Documentação Oficial](https://capacitorjs.com/docs)
- **Android**: [Guia de Publicação](https://developer.android.com/studio/publish)
- **iOS**: [App Store Guidelines](https://developer.apple.com/app-store/review/guidelines/)

---

## 🌟 Status do Projeto

- ✅ **Configuração inicial**: Completa
- ✅ **Assets móviles**: Gerados
- ✅ **Builds Android/iOS**: Prontos
- ✅ **Documentação**: Completa
- 🔄 **Publicação nas tiendas**: Pendente

---

*Desenvolvido com ❤️ para consultoria jurídica moderna*

**Versão Móvil**: 1.0.0  
**Última atualização**: Junho 2025
