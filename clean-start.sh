#!/bin/bash
echo "🧹 Limpiando caché..."
rm -rf node_modules/.cache
rm -rf .expo
rm -rf ios/build
echo "✅ Caché limpiado"
echo "🚀 Iniciando servidor con caché limpio..."
npx expo start --clear

