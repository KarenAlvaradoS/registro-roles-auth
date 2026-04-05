# Proyecto: Autenticación con Roles y JWT

## Descripción

Aplicación móvil multiplataforma desarrollada con React Native (Expo), integrada con un backend en Node.js y Express, utilizando autenticación con JSON Web Token (JWT), base de datos MySQL y funcionalidades nativas como cámara y geolocalización.

Este proyecto implementa un sistema de autenticación completo con registro, login, roles (admin/user), persistencia de sesión, ruta protegida y cierre de sesión. Incluye backend con Node.js/Express, frontend web y app móvil con Expo (React Native). El sistema está listo para demostración en clase.

---

## Tecnologías utilizadas

- React Native (Expo)
- Node.js
- Express
- Sequelize
- MySQL
- JSON Web Token (JWT)
- AsyncStorage

---

## A) Creación y estructura del proyecto

El repositorio está organizado en tres módulos principales: backend, frontend web y app móvil. En el backend se usa una estructura por carpetas (controllers, routes, models, middleware, config) para separar responsabilidades. El frontend web consume la API REST. La app móvil (Expo) consume la misma API y guarda la sesión en el dispositivo.

### Estructura de carpetas (resumen)

- backend/src: servidor Express, rutas, controladores, modelos, middleware  
- frontend: interfaz web (index.html, style.css, app.js)  
- app-movil: aplicación móvil Expo (React Native)  

---

## B) Configuración de variables de entorno (.env)

El backend usa un archivo `.env` para guardar configuraciones sensibles como la conexión a MySQL y la clave JWT.

⚠️ Por seguridad, el `.env` no se sube a GitHub. En su lugar se incluye un archivo de ejemplo.

### Crear el .env en backend usando el ejemplo

En la carpeta backend existe un archivo `backend/.env.example`. Copiarlo y renombrarlo a `.env`.

### Variables requeridas:

- PORT  
- DB_HOST  
- DB_PORT  
- DB_USER  
- DB_PASS  
- DB_NAME  
- JWT_SECRET  

---

## Configuración de la API

En el frontend web y la app móvil se utiliza una variable `API_URL` para consumir el backend.

⚠️ Importante:

- No usar `localhost` en el celular  
- Usar:
  - IP local (ej: http://192.168.x.x:4000 )  
  - o ngrok  

---

## C) Base de datos, tablas y relación Usuarios-Roles

El modelo mínimo incluye Usuarios y Roles. Cada usuario pertenece a un rol (admin o user).

En la base de datos la tabla Users contiene una clave foránea `RoleId` que referencia a Roles.

El backend crea/actualiza las tablas automáticamente mediante Sequelize (`sequelize.sync`) al iniciar el servidor y también crea los roles base si no existen (admin y user).

---

## D) Implementación de funcionalidades principales

### Registro de usuario con selección de rol

El registro de usuarios se realiza mediante el endpoint:

POST /api/auth/register  

El body de la petición debe incluir los campos:

- name  
- email  
- password  
- roleName (admin o user)  

El backend valida que el rol exista antes de crear el usuario y lo asocia correctamente en la base de datos.

---

### Inicio de sesión (login)

Endpoint: POST /api/auth/login  

Body:

- email  
- password  

Respuesta:

- token JWT  
- datos del usuario incluyendo role  

---

### Persistencia de sesión y control de acceso a ruta protegida

El token se guarda en el cliente:

- Web: localStorage  
- App móvil: AsyncStorage  

Para acceder a la ruta protegida se envía el token en el header:

Authorization: Bearer TOKEN  

---

### Ruta protegida

Endpoint: GET /api/protected  

Solo accesible con token válido.

---

### Cierre de sesión y restricciones

El logout elimina el token guardado.

Si no hay token, se bloquea el acceso a la ruta protegida y se muestra un mensaje indicando que el usuario debe iniciar sesión.

---

## Funcionalidades nativas

### 📸 Cámara
Permite capturar imágenes desde la aplicación.

### 📍 Geolocalización
Permite obtener la ubicación del usuario (latitud y longitud).

### Gestión de permisos

Se manejan correctamente los estados:

- granted  
- denied  
- blocked  

---

## Cómo ejecutar el proyecto

### Backend

Tener MySQL activo  

Configurar backend/.env  

Instalar dependencias y ejecutar servidor:

```bash
npm install
node src/server.js
El backend corre por defecto en el puerto 4000.
Frontend Web
cd frontend
npx http-server
App móvil (Expo)
cd app-movil
npm install
npx expo start

Escanear QR con Expo Go.

Configurar API_URL para que apunte al backend accesible desde el celular (ngrok o IP local).

Video demostrativo

Link del video:
[https://youtu.be/q6Kk0S_TUeI?si=bxBVUhR5AQgEnJgw  ]

Repositorio

https://github.com/KarenAlvaradoS/registro-roles-auth.git

Notas
No se suben:
node_modules
.env
.expo
Los roles admin y user se crean automáticamente al iniciar el backend.
Autor

Estefania Karen Alvarado Santi
Universidad Estatal Amazónica
