Proyecto de Autenticación con Roles y JWT

Este proyecto consiste en el desarrollo de un sistema completo de autenticación de usuarios que permite el registro, inicio de sesión, manejo de roles (admin y user) y acceso a zonas protegidas mediante el uso de JSON Web Tokens (JWT). El sistema está diseñado bajo una arquitectura cliente-servidor y cuenta con tres partes principales: backend, frontend web y aplicación móvil.

El objetivo principal del proyecto es demostrar el funcionamiento de la autenticación basada en tokens, el control de acceso por roles y el consumo de una API REST desde diferentes clientes.

Tecnologías utilizadas

En el backend se utilizó Node.js junto con Express para la creación del servidor y la API REST. Para la persistencia de datos se empleó MySQL como base de datos y Sequelize como ORM, lo que permite definir modelos y relaciones de manera sencilla. Las contraseñas de los usuarios se almacenan de forma segura utilizando bcryptjs para el cifrado. La autenticación se maneja mediante JSON Web Tokens (JWT), los cuales se generan al iniciar sesión y se utilizan para proteger rutas del sistema.

El frontend web fue desarrollado utilizando HTML, CSS y JavaScript puro. Desde este frontend se consumen los endpoints del backend para realizar el registro y el login de usuarios, mostrando la información correspondiente según el rol.

La aplicación móvil fue desarrollada con React Native utilizando Expo. En esta app se implementa el registro, el inicio de sesión, la selección de rol y la visualización de la sesión activa. El token JWT y los datos del usuario se almacenan localmente mediante AsyncStorage, lo que permite mantener la sesión incluso al cerrar la aplicación.

Funcionalidades del sistema

El sistema permite registrar usuarios ingresando nombre, correo electrónico, contraseña y seleccionando un rol (admin o user). Durante el registro, la contraseña es cifrada antes de guardarse en la base de datos y el rol seleccionado se asocia correctamente al usuario.

El inicio de sesión valida las credenciales del usuario y, en caso de ser correctas, genera un token JWT que incluye información básica como el id del usuario y su rol. Este token se utiliza posteriormente para acceder a rutas protegidas del backend.

El sistema maneja roles, permitiendo diferenciar entre usuarios administradores y usuarios normales. Esta información se devuelve al frontend y a la app móvil después del login y se muestra en la interfaz.

El backend cuenta con rutas protegidas que solo pueden ser accedidas si se envía un token válido en el encabezado Authorization, siguiendo el formato Bearer TOKEN.

Estructura del proyecto

El proyecto se organiza en una carpeta principal que contiene tres subcarpetas importantes. La carpeta backend contiene todo el código del servidor, incluyendo controladores, modelos, rutas, middleware, configuración de la base de datos y los archivos principales del servidor. La carpeta frontend contiene los archivos necesarios para la interfaz web, como el archivo HTML principal, los estilos CSS y el archivo JavaScript que consume la API. La carpeta app-movil contiene el proyecto de Expo para la aplicación móvil, incluyendo componentes, assets y configuración del proyecto. En la raíz del proyecto se encuentra el archivo README que documenta todo el sistema.

Ejecución del proyecto

Para ejecutar el backend es necesario contar con MySQL activo y configurar correctamente el archivo de variables de entorno (.env) con los datos de conexión a la base de datos y la clave secreta para JWT. Una vez configurado, el servidor se inicia ejecutando el archivo server.js. Al iniciarse correctamente, la API queda disponible para ser consumida por el frontend web y la aplicación móvil.

El frontend web se ejecuta levantando un servidor estático dentro de la carpeta frontend y luego accediendo desde el navegador. Desde esta interfaz se pueden probar el registro y el login de usuarios utilizando el backend.

La aplicación móvil se ejecuta utilizando Expo. Al iniciar el proyecto con Expo, se genera un código QR que se puede escanear desde un dispositivo móvil con la aplicación Expo Go instalada. Para que la app móvil pueda comunicarse con el backend, se utiliza una URL accesible desde el celular, como una dirección IP local o un túnel generado con ngrok.

Endpoints principales

El backend expone un endpoint de registro que recibe los datos del usuario junto con el rol seleccionado. También expone un endpoint de login que devuelve un token JWT y los datos del usuario autenticado. Además, existen rutas protegidas que requieren el envío del token en el encabezado de la petición para poder ser accedidas.

Notas importantes

La carpeta .expo es generada automáticamente por Expo y contiene información local del entorno de desarrollo, por lo que no debe subirse al repositorio. El archivo .env contiene datos sensibles como credenciales de la base de datos y claves secretas, por lo que tampoco debe compartirse ni subirse a GitHub. Los roles admin y user deben existir previamente en la base de datos para que el registro funcione correctamente.

Autoría

Proyecto desarrollado por Estefania como parte de un trabajo académico sobre autenticación, control de acceso por roles y consumo de APIs REST con JWT.