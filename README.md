# Sistema de Registro y Login con Roles

## Descripción
Aplicación backend desarrollada con Node.js, Express y MySQL que permite:
- Registro de usuarios con rol
- Inicio de sesión con JWT
- Acceso a rutas protegidas
- Control de autenticación

## Tecnologías
- Node.js
- Express
- Sequelize
- MySQL (MariaDB)
- JWT

## Instalación
1. Clonar el repositorio
2. Entrar a la carpeta backend
3. Instalar dependencias:
   npm install
4. Configurar el archivo .env
5. Ejecutar:
   npm run dev

## Endpoints
- POST /api/auth/register
- POST /api/auth/login
- GET /api/protected
