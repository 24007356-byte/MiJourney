# Cómo instalar y ejecutar MiJourney

MiJourney necesita Node.js con npm, MySQL Server y un navegador. El servidor Express entrega la aplicación y se conecta a MySQL para guardar los ejercicios. Para esta versión no es necesario iniciar Apache ni XAMPP.

## Versiones utilizadas

Estas son las versiones con las que se configuró el proyecto:

- Node.js: 24.19.0.
- npm: 11.17.0.
- MySQL Server: 8.0.45.
- Express: 5.3.0.
- mysql2: 3.24.6.
- dotenv: 18.0.10.

Express, mysql2 y dotenv se instalan como dependencias del proyecto. No hace falta instalarlos por separado ni de forma global.

## 1. Preparar el proyecto

Instala Node.js con npm y MySQL Server en la otra computadora. Comprueba que MySQL esté funcionando y que tengas una cuenta con permisos para crear la base de datos y configurar su usuario.

Copia el proyecto completo, incluyendo `server.js`, `package.json`, `package-lock.json`, `.env.example`, `database` y `dist`. El ZIP estático preparado anteriormente no incluye el servidor ni todos los archivos necesarios para esta versión.

Abre una terminal en la carpeta principal de MiJourney. Puedes comprobar Node.js y npm con:

```powershell
node --version
npm --version
```

## 2. Instalar las dependencias

Desde la carpeta principal, ejecuta:

```powershell
npm install
```

Este comando instala las dependencias en `node_modules`. Conserva `package-lock.json`, que registra las versiones utilizadas.

## 3. Crear la base de datos

Abre el cliente de MySQL con una cuenta administradora. Por ejemplo, si utilizas `root` y MySQL escucha en el puerto 3306:

```powershell
mysql --host=127.0.0.1 --port=3306 --user=root --password
```

El cliente pedirá la contraseña de forma interactiva. Si el comando `mysql` no está disponible en la terminal, utiliza la ruta del archivo `mysql.exe` de tu instalación.

Si abriste el cliente desde la carpeta principal del proyecto, ejecuta dentro de MySQL:

```sql
SOURCE database/database.sql;
```

El script crea la base `mijourney` y la tabla `ejercicios` si todavía no existen. La tabla contiene las columnas `id`, `nombre`, `series`, `repeticiones` y `peso`.

El script no crea usuarios. En esa computadora también debes disponer del usuario `mijourney_app`, con una contraseña local y permisos `SELECT`, `INSERT`, `UPDATE` y `DELETE` sobre `mijourney.*`. Configúralo con una cuenta administradora y permite su conexión desde el equipo local. No es necesario usar `root` para ejecutar la aplicación.

## 4. Configurar las variables de entorno

Copia `.env.example` con el nombre `.env` en la raíz del proyecto. En PowerShell puedes utilizar este comando si `.env` todavía no existe:

```powershell
Copy-Item .env.example .env
```

Abre `.env` y revisa estos valores:

```dotenv
PORT=3000
DB_HOST=127.0.0.1
DB_PORT=3306
DB_NAME=mijourney
DB_USER=mijourney_app
DB_PASSWORD=
```

Completa `DB_PASSWORD` con la contraseña del usuario configurado en esa computadora. Si contiene `#` o espacios, escríbela entre comillas. Ajusta el puerto de MySQL si tu instalación utiliza otro.

No compartas `.env` ni lo subas al repositorio. Ya está excluido mediante `.gitignore`. `.env.example` debe mantenerse sin contraseñas reales.

## 5. Comprobar la conexión

Ejecuta desde la carpeta principal:

```powershell
npm run check-db
```

Si la configuración es correcta, aparecerá este mensaje:

```text
Conexión con MySQL y acceso a ejercicios comprobados correctamente.
```

La comprobación no agrega ni elimina ejercicios. Si falla, revisa que MySQL esté funcionando, los valores de `.env` y los permisos del usuario antes de continuar.

## 6. Iniciar MiJourney

Ejecuta:

```powershell
npm start
```

Mantén la terminal abierta y entra en [http://127.0.0.1:3000](http://127.0.0.1:3000). Si cambiaste `PORT`, utiliza ese puerto en la dirección.

Para comprobar el funcionamiento, registra un ejercicio, actualiza la página y verifica que siga apareciendo. Después puedes eliminarlo. Los registros de esta versión se guardan en MySQL.

Abre la aplicación desde Express, no directamente desde `index.html` ni desde la ruta estática de Apache, porque las funciones necesitan los endpoints del servidor. Los registros antiguos de localStorage no se importan automáticamente.

Para detener Express, presiona `Ctrl+C` en la terminal. Si modificas `.env`, vuelve a iniciar el servidor para cargar los cambios.
