#!/bin/bash

# Script mejorado para iniciar el servidor de desarrollo
# Virgilio & Team 🦅

echo "🦅 Academia Evolución - Iniciando servidor de desarrollo..."

# Colores para output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Función para verificar y limpiar puerto
check_and_clean_port() {
    local PORT=$1
    echo -e "${YELLOW}⚡ Verificando puerto $PORT...${NC}"
    
    # Verificar si el puerto está en uso
    if lsof -i :$PORT > /dev/null 2>&1; then
        echo -e "${RED}⚠️  Puerto $PORT en uso. Limpiando...${NC}"
        
        # Obtener PIDs usando el puerto
        PIDS=$(lsof -ti :$PORT)
        
        for PID in $PIDS; do
            echo -e "${YELLOW}  Terminando proceso $PID...${NC}"
            kill -9 $PID 2>/dev/null || true
        done
        
        # Esperar un momento
        sleep 2
        
        echo -e "${GREEN}✅ Puerto $PORT limpio${NC}"
    else
        echo -e "${GREEN}✅ Puerto $PORT disponible${NC}"
    fi
}

# Verificar si estamos en el directorio correcto
if [ ! -f "package.json" ]; then
    echo -e "${RED}❌ Error: No se encontró package.json${NC}"
    echo "Por favor ejecuta este script desde el directorio frontend/"
    exit 1
fi

# Verificar dependencias
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}📦 Instalando dependencias...${NC}"
    npm install
fi

# Limpiar puerto 3000
check_and_clean_port 3000

# Opcional: Limpiar puerto del backend si está configurado
# check_and_clean_port 5000

# Limpiar cache de Next.js si hay problemas
if [ "$1" == "--clean" ]; then
    echo -e "${YELLOW}🧹 Limpiando cache de Next.js...${NC}"
    rm -rf .next
fi

# Iniciar servidor
echo -e "${GREEN}🚀 Iniciando Next.js en http://localhost:3000${NC}"
echo -e "${YELLOW}📱 Academia Evolución - Donde la IA te devuelve a ti mismo${NC}"
echo ""

# Iniciar con manejo de errores
npm run dev || {
    echo -e "${RED}❌ Error al iniciar el servidor${NC}"
    echo "Intenta ejecutar: npm run dev --clean"
    exit 1
}
