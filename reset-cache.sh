#!/bin/bash
echo "🧹 Limpiando todo el caché..."

# Detener procesos de Expo
pkill -f "expo start" 2>/dev/null || true

# Limpiar cachés
rm -rf node_modules/.cache
rm -rf .expo
rm -rf .metro-health-check*
rm -rf ios/build

# Limpiar watchman si está instalado
watchman watch-del-all 2>/dev/null || true

echo "✅ Caché limpiado"
echo "🚀 Iniciando servidor con caché limpio..."
npx expo start --clear

