
# 📱 Guía de Despliegue Móvil - Advogado Online

Esta guía contiene instrucciones completas para publicar la aplicación "Advogado Online" en Google Play Store y Apple App Store.

## 📋 Índice

1. [Requisitos Previos](#requisitos-previos)
2. [Configuración del Proyecto](#configuración-del-proyecto)
3. [Google Play Store](#google-play-store)
4. [Apple App Store](#apple-app-store)
5. [Assets Generados](#assets-generados)
6. [Scripts de Build](#scripts-de-build)
7. [Resolución de Problemas](#resolución-de-problemas)

---

## 🔧 Requisitos Previos

### Para Android (Google Play Store)
- **Android Studio** instalado
- **Java Development Kit (JDK)** 11 o superior
- **Gradle** (incluido con Android Studio)
- **Cuenta de Google Play Console** ($25 USD fee único)
- **Certificado de firma** (keystore)

### Para iOS (Apple App Store)
- **macOS** con Xcode 14+
- **Apple Developer Account** ($99 USD anuales)
- **iOS Device** para pruebas
- **Certificados y Provisioning Profiles**

---

## ⚙️ Configuración del Proyecto

### Estructura de Archivos Generados

```
advogado-online/app/
├── android/                    # Proyecto Android nativo
├── ios/                        # Proyecto iOS nativo
├── capacitor-build/            # Assets web para móvil
│   ├── icons/                  # Iconos en todos los tamaños
│   ├── splash/                 # Splash screens
│   ├── screenshots/            # Screenshots para tiendas
│   ├── index.html              # Punto de entrada móvil
│   ├── manifest.json           # PWA manifest
│   └── service-worker.js       # Service worker
├── capacitor.config.ts         # Configuración de Capacitor
└── build-mobile.sh            # Script de build
```

### Configuración Actual

- **App ID**: `com.advogadoonline.app`
- **App Name**: `Advogado Online`
- **Version**: `1.0.0`
- **Colores**: Azul escuro `#0A3D62`, Blanco
- **Orientación**: Portrait (principal)

---

## 🤖 Google Play Store

### Paso 1: Preparar el Build Android

```bash
# 1. Abrir Android Studio
cd /home/ubuntu/advogado-online/app
npx cap open android

# 2. En Android Studio, ir a:
# Build > Generate Signed Bundle/APK
# Seleccionar "Android App Bundle" (recomendado)
```

### Paso 2: Configurar Certificado de Firma

```bash
# Generar keystore (solo la primera vez)
keytool -genkey -v -keystore advogado-online-release.keystore \
        -alias advogado-online -keyalg RSA -keysize 2048 -validity 10000

# Configurar en android/app/build.gradle
android {
    signingConfigs {
        release {
            storeFile file("../advogado-online-release.keystore")
            storePassword "YOUR_STORE_PASSWORD"
            keyAlias "advogado-online"
            keyPassword "YOUR_KEY_PASSWORD"
        }
    }
    buildTypes {
        release {
            signingConfig signingConfigs.release
            minifyEnabled true
            proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
        }
    }
}
```

### Paso 3: Build de Producción

```bash
# Generar AAB (Android App Bundle)
cd android
./gradlew bundleRelease

# El archivo se generará en:
# android/app/build/outputs/bundle/release/app-release.aab
```

### Paso 4: Subir a Google Play Console

1. **Acceder a Google Play Console**: [https://play.google.com/console](https://play.google.com/console)
2. **Crear Nueva Aplicación**:
   - Nombre: `Advogado Online`
   - Idioma: `Português (Brasil)`
   - Tipo: `Aplicativo`

3. **Configurar Información de la Tienda**:
   - **Descripción Corta** (80 caracteres):
     ```
     Consultoria jurídica inteligente com IA para respostas rápidas e precisas
     ```
   
   - **Descripción Completa** (4000 caracteres):
     ```
     🏛️ Advogado Online - Sua Consultoria Jurídica Inteligente
     
     Obtenha respostas jurídicas especializadas com nossa plataforma inovadora que combina inteligência artificial avançada com a expertise de advogados qualificados.
     
     ✨ PRINCIPAIS RECURSOS:
     • Consultoria jurídica 24/7 com IA especializada
     • Chat direto com advogados credenciados
     • Análise automática de casos em tempo real
     • Cobertura completa de áreas jurídicas
     • Interface moderna e intuitiva
     • Segurança e confidencialidade garantidas
     
     📚 ÁREAS JURÍDICAS COBERTAS:
     • Direito Civil e Consumidor
     • Direito Trabalhista
     • Direito Penal
     • Direito de Família
     • Direito Empresarial
     • Direito de Trânsito
     • E muito mais...
     
     🔒 SEGURANÇA E PRIVACIDADE:
     Todos os dados são protegidos com criptografia de ponta a ponta, garantindo total confidencialidade das suas consultas jurídicas.
     
     💡 COMO FUNCIONA:
     1. Descreva seu caso jurídico
     2. Receba análise inicial da IA
     3. Conecte-se com advogado especializado
     4. Acompanhe o progresso do seu caso
     
     Baixe agora e tenha acesso imediato a consultoria jurídica profissional!
     ```

4. **Configurar Assets Gráficos**:
   - **Ícone da aplicação**: `/capacitor-build/icons/icon-512x512.png`
   - **Gráfico de recursos**: `/capacitor-build/screenshots/mobile-1.png`
   - **Screenshots do telefone**: Usar todos os arquivos `mobile-*.png`
   - **Screenshots do tablet**: Usar `desktop-*.png`

5. **Informações de Privacidade**:
   - URL da Política de Privacidade: `https://seudominio.com/privacy`
   - Contato do desenvolvedor: Seu email

6. **Classificação de Conteúdo**:
   - Selecionar "Negócios e produtividade"
   - Sem conteúdo sensível

---

## 🍎 Apple App Store

### Paso 1: Configurar Xcode

```bash
# 1. Abrir Xcode
cd /home/ubuntu/advogado-online/app
npx cap open ios

# 2. Em Xcode, configurar:
# - Team/Developer Account
# - Bundle Identifier: com.advogadoonline.app
# - Version: 1.0.0
# - Build: 1
```

### Paso 2: Configurar Info.plist

Editar `ios/App/App/Info.plist`:

```xml
<key>CFBundleDisplayName</key>
<string>Advogado Online</string>
<key>CFBundleVersion</key>
<string>1</string>
<key>CFBundleShortVersionString</key>
<string>1.0.0</string>
<key>NSUserTrackingUsageDescription</key>
<string>Este app gostaria de acessar IDFA para melhorar a experiência do usuário.</string>
<key>NSCameraUsageDescription</key>
<string>Este app usa a câmera para capturar documentos jurídicos.</string>
<key>NSPhotoLibraryUsageDescription</key>
<string>Este app usa a galeria de fotos para selecionar documentos.</string>
```

### Paso 3: Configurar Ícones e Splash Screens

1. **Ícones**: Usar os ícones gerados em `/capacitor-build/icons/`
2. **Launch Screen**: Usar os splash screens de `/capacitor-build/splash/`

### Paso 4: Build de Produção

```bash
# 1. Em Xcode:
# Product > Archive

# 2. Após o archive:
# Window > Organizer > Distribute App > App Store Connect
```

### Paso 5: App Store Connect

1. **Acessar App Store Connect**: [https://appstoreconnect.apple.com](https://appstoreconnect.apple.com)

2. **Criar Nova App**:
   - Nome: `Advogado Online`
   - Bundle ID: `com.advogadoonline.app`
   - Idioma principal: `Português (Brasil)`

3. **Configurar Informações da App**:
   - **Categoria primária**: `Negócios`
   - **Categoria secundária**: `Produtividade`
   
   - **Descrição**:
     ```
     Consultoria jurídica inteligente com IA para respostas rápidas e precisas. 
     
     Obtenha orientação jurídica profissional 24/7 com nossa plataforma que combina inteligência artificial avançada com a expertise de advogados qualificados.
     
     RECURSOS PRINCIPAIS:
     • Consultoria jurídica instantânea com IA
     • Chat direto com advogados credenciados  
     • Análise automática de casos
     • Todas as áreas jurídicas cobertas
     • Interface moderna e segura
     
     ÁREAS COBERTAS:
     • Direito Civil e Consumidor
     • Direito Trabalhista  
     • Direito Penal
     • Direito de Família
     • Direito Empresarial
     • Direito de Trânsito
     
     Tenha acesso imediato a consultoria jurídica profissional!
     ```

   - **Palavras-chave**:
     ```
     advogado,jurídico,direito,consultoria,advocacia,legal,IA,inteligência artificial
     ```

4. **Screenshots**: Usar os arquivos de `/capacitor-build/screenshots/`
   - iPhone 6.7": `mobile-1.png` a `mobile-5.png`
   - iPad Pro: `desktop-1.png` e `desktop-2.png`

---

## 🎨 Assets Generados

### Iconos (8 tamaños)
- `icon-72x72.png` - 72×72px
- `icon-96x96.png` - 96×96px  
- `icon-128x128.png` - 128×128px
- `icon-144x144.png` - 144×144px
- `icon-152x152.png` - 152×152px
- `icon-192x192.png` - 192×192px
- `icon-384x384.png` - 384×384px
- `icon-512x512.png` - 512×512px

### Splash Screens
**Android:**
- `splash-port-hdpi.png` - 480×800px
- `splash-port-xhdpi.png` - 720×1280px
- `splash-port-xxhdpi.png` - 960×1600px  
- `splash-port-xxxhdpi.png` - 1280×1920px

**iOS:**
- `splash-1125x2436.png` - 1125×2436px (Portrait)
- `splash-828x1792.png` - 828×1792px (Portrait)
- `splash-2436x1125.png` - 2436×1125px (Landscape)
- `splash-1792x828.png` - 1792×828px (Landscape)

### Screenshots para Tiendas
**Móvil (390×844px):**
- `mobile-1.png` - Dashboard principal
- `mobile-2.png` - Chat con IA
- `mobile-3.png` - Nueva consulta
- `mobile-4.png` - Lista de consultas  
- `mobile-5.png` - Perfil de usuario

**Desktop/Tablet (1280×720px):**
- `desktop-1.png` - Dashboard ampliado
- `desktop-2.png` - Chat ampliado

---

## 🔨 Scripts de Build

### Build Completo
```bash
# Usar el script creado
./build-mobile.sh
```

### Comandos Individuales
```bash
# Build web
yarn build

# Sync con Capacitor  
npx cap sync

# Abrir Android Studio
npx cap open android

# Abrir Xcode
npx cap open ios

# Run en dispositivo Android
npx cap run android

# Run en dispositivo iOS  
npx cap run ios
```

---

## 🔧 Resolución de Problemas

### Errores Comunes Android

**Error: "keystore not found"**
```bash
# Generar nuevo keystore
keytool -genkey -v -keystore advogado-online-release.keystore \
        -alias advogado-online -keyalg RSA -keysize 2048 -validity 10000
```

**Error: "Gradle build failed"**
```bash
# Limpiar y rebuild
cd android
./gradlew clean
./gradlew assembleRelease
```

### Errores Comunes iOS

**Error: "No provisioning profiles found"**
- Configurar Apple Developer Account en Xcode
- Generar Provisioning Profile en Developer Portal

**Error: "Bundle identifier not found"**
- Verificar que el Bundle ID coincida: `com.advogadoonline.app`

### Configuración de Servidor

Para producción, actualizar la URL del servidor en `capacitor.config.ts`:

```typescript
server: {
  url: 'https://tu-servidor-produccion.com',
  cleartext: false,
  androidScheme: 'https'
}
```

---

## 🚀 Publicación Final

### Checklist antes de publicar:

- [ ] Probar la app en dispositivos reales
- [ ] Verificar todas las funcionalidades
- [ ] Comprobar que las APIs funcionan
- [ ] Validar la autenticación
- [ ] Revisar permisos necesarios
- [ ] Configurar analytics (opcional)
- [ ] Configurar crash reporting (opcional)
- [ ] Preparar política de privacidad
- [ ] Configurar soporte al cliente

### URLs Importantes:

- **Google Play Console**: https://play.google.com/console
- **Apple App Store Connect**: https://appstoreconnect.apple.com
- **Capacitor Docs**: https://capacitorjs.com/docs
- **Android Developer**: https://developer.android.com
- **iOS Developer**: https://developer.apple.com

---

## 📞 Soporte

Para soporte adicional:
- **Capacitor**: https://capacitorjs.com/docs/troubleshooting
- **Android**: https://developer.android.com/studio/publish
- **iOS**: https://developer.apple.com/app-store/submissions

---

*Última actualización: Junio 2025*
*Versión: 1.0.0*
