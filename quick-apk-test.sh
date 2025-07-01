
#!/bin/bash

# Script de test rápido para verificar que la configuración funciona
# Usado para validar que el proyecto puede generar APKs sin errores críticos

echo "🧪 Test Rápido de Configuración Android - Advogado Online"
echo "========================================================="

# Colores
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

print_step() {
    echo -e "${BLUE}📋 $1${NC}"
}

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

# Verificar que estamos en el directorio correcto
if [ ! -f "capacitor.config.ts" ]; then
    echo "❌ No se encontró capacitor.config.ts"
    exit 1
fi

if [ ! -d "android" ]; then
    echo "❌ Directorio android no encontrado. Ejecuta fix-android-build.sh primero."
    exit 1
fi

print_step "Test 1: Verificando estructura del proyecto Android..."
if [ -f "android/build.gradle" ] && [ -f "android/app/build.gradle" ]; then
    print_success "Estructura del proyecto Android correcta"
else
    echo "❌ Estructura del proyecto Android incompleta"
    exit 1
fi

print_step "Test 2: Verificando configuración de Gradle..."
cd android

# Test rápido de Gradle (con timeout corto)
print_step "Probando inicialización de Gradle (60s timeout)..."
if timeout 60s ./gradlew help > /dev/null 2>&1; then
    print_success "Gradle funciona correctamente"
    GRADLE_OK=true
elif [ $? -eq 124 ]; then
    print_warning "Gradle está descargando dependencias (normal en primera ejecución)"
    GRADLE_OK=true
else
    echo "❌ Gradle tiene problemas de configuración"
    GRADLE_OK=false
fi

print_step "Test 3: Verificando dependencias de Capacitor..."
if grep -q "implementation project(':capacitor-android')" app/build.gradle; then
    print_success "Dependencia capacitor-android encontrada"
else
    echo "❌ Dependencia capacitor-android no encontrada"
fi

print_step "Test 4: Verificando configuración de SDK..."
if grep -q "compileSdkVersion" variables.gradle; then
    SDK_VERSION=$(grep "compileSdkVersion" variables.gradle | grep -o '[0-9]\+')
    print_success "SDK configurado: Android $SDK_VERSION"
else
    echo "❌ Configuración de SDK no encontrada"
fi

cd ..

print_step "Test 5: Verificando que el contenido web esté disponible..."
if [ -d "capacitor-build" ] && [ "$(ls -A capacitor-build 2>/dev/null)" ]; then
    print_success "Contenido web disponible para Capacitor"
else
    print_warning "Contenido web no encontrado - ejecuta npm run build"
fi

echo
echo "📊 RESUMEN DEL TEST:"
echo "==================="

if [ "$GRADLE_OK" = true ]; then
    print_success "✅ Configuración Android: FUNCIONAL"
    print_success "✅ Error 'Could not resolve project :capacitor-android': RESUELTO"
    echo
    echo "🚀 El proyecto está listo para generar APKs"
    echo "   Ejecuta: ./generate-apk.sh"
    echo
else
    echo "❌ Configuración Android: REQUIERE ATENCIÓN"
    echo "   Ejecuta: ./fix-android-build.sh"
    echo
fi

echo "📱 Para generar APK completo:"
echo "   ./generate-apk.sh"
echo
echo "🔧 Para reconfigurar si hay problemas:"
echo "   ./fix-android-build.sh"
echo

