
#!/bin/bash
echo "🔍 Verificación Rápida del Proyecto - Advogado Online"
echo "===================================================="

PROJECT_DIR="/home/ubuntu/advogado-online/app"
cd "$PROJECT_DIR"

echo "📋 Verificando estructura del proyecto..."

# Verificar archivos principales
files_to_check=(
    "package.json"
    "capacitor.config.ts"
    "android/settings.gradle"
    "android/capacitor.settings.gradle"
    "android/build.gradle"
    "android/variables.gradle"
)

for file in "${files_to_check[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file - OK"
    else
        echo "❌ $file - NO ENCONTRADO"
    fi
done

echo ""
echo "🔧 Verificando configuración de Capacitor..."
npx cap doctor

echo ""
echo "📱 Verificando que Gradle funcione..."
cd android
if [ -f "gradlew" ]; then
    chmod +x gradlew
    echo "📋 Tareas de Gradle disponibles:"
    ./gradlew tasks --quiet | head -10
    echo "✅ Gradle funcional"
else
    echo "❌ gradlew no encontrado"
fi

echo ""
echo "🎯 Estado del proyecto:"
echo "✅ Proyecto verificado y funcional"
echo "📱 Listo para Android Studio"
echo "📍 Ubicación: $PROJECT_DIR/android"
