
#!/bin/bash
echo "📱 Generación Automática de APK - Advogado Online"
echo "================================================="

PROJECT_DIR="/home/ubuntu/advogado-online/app"
cd "$PROJECT_DIR"

# Función para verificar errores
check_error() {
    if [ $? -ne 0 ]; then
        echo "❌ Error: $1"
        exit 1
    fi
}

echo "🏗️ Paso 1: Construyendo proyecto web..."
yarn build
check_error "Build del proyecto web falló"
echo "✅ Proyecto web construido"

echo "🔄 Paso 2: Sincronizando con Capacitor..."
npx cap sync android
check_error "Sincronización con Capacitor falló"
echo "✅ Sincronización completada"

echo "📱 Paso 3: Generando APK..."
cd android
chmod +x gradlew
./gradlew assembleDebug
check_error "Generación de APK falló"

APK_PATH="app/build/outputs/apk/debug/app-debug.apk"
if [ -f "$APK_PATH" ]; then
    echo "✅ ¡APK generado exitosamente!"
    echo "📍 Ubicación: $PROJECT_DIR/android/$APK_PATH"
    echo "📊 Información del APK:"
    ls -lh "$APK_PATH"
else
    echo "❌ Error: APK no se generó correctamente"
    exit 1
fi

echo "🎉 ¡Generación de APK completada!"
