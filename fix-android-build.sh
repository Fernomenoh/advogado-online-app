
#!/bin/bash
echo "🔧 Corrección Automática del Proyecto Android - Advogado Online"
echo "================================================================"

PROJECT_DIR="/home/ubuntu/advogado-online/app"
cd "$PROJECT_DIR"

echo "📍 Directorio de trabajo: $PROJECT_DIR"

# Función para verificar errores
check_error() {
    if [ $? -ne 0 ]; then
        echo "❌ Error: $1"
        exit 1
    fi
}

echo "🔍 Paso 1: Diagnóstico inicial..."
if [ ! -f "package.json" ]; then
    echo "❌ Error: No se encontró package.json"
    exit 1
fi
echo "✅ package.json encontrado"

echo "💾 Paso 2: Creando backup..."
if [ -d "android" ]; then
    BACKUP_NAME="android-backup-$(date +%Y%m%d-%H%M%S)"
    cp -r android "$BACKUP_NAME"
    echo "✅ Backup creado: $BACKUP_NAME"
fi

echo "🧹 Paso 3: Limpieza completa..."
rm -rf node_modules
rm -rf android
yarn cache clean
echo "✅ Limpieza completada"

echo "📦 Paso 4: Reinstalando dependencias..."
yarn install
check_error "Instalación de dependencias falló"
echo "✅ Dependencias instaladas"

echo "🔄 Paso 5: Regenerando proyecto Android..."
npx cap add android
check_error "Regeneración de Android falló"
echo "✅ Proyecto Android regenerado"

echo "🏗️ Paso 6: Construyendo y sincronizando..."
yarn build
npx cap sync android
check_error "Sincronización falló"
echo "✅ Proyecto sincronizado"

echo "✅ ¡Corrección completada exitosamente!"
echo "📱 El proyecto está listo para abrir en Android Studio"
echo "📂 Ubicación: $PROJECT_DIR/android"
