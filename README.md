# MiJourney

MiJourney es una aplicación web que desarrollé para llevar un registro de mis entrenamientos. La idea es poder guardar los ejercicios que realizo, junto con las series, repeticiones y el peso utilizado, para tener un seguimiento más organizado.

La aplicación permite registrar, consultar y eliminar ejercicios. Los datos se guardan en una base de datos MySQL local, no en localStorage. Actualmente no es necesario crear una cuenta para utilizarla.

## Tecnologías utilizadas

Para desarrollar MiJourney utilicé HTML, CSS, JavaScript, Node.js, Express.js y MySQL.

HTML me permitió organizar el contenido de la página, CSS se utilizó para el diseño y JavaScript para las funciones de registro, consulta y eliminación de ejercicios. Node.js ejecuta el servidor con Express.js, que conecta la aplicación con MySQL para guardar y recuperar los registros.

También utilicé Git y GitHub para llevar un control de los cambios realizados en el proyecto.

## Organización y optimización

Organicé los archivos en carpetas para separar los estilos, el código JavaScript y los recursos de la aplicación.

Después preparé versiones minificadas de los archivos CSS y JavaScript para reducir su tamaño. Conservé los archivos originales por si necesito realizar modificaciones más adelante.

## Preparación para el despliegue

Creé una carpeta llamada `dist` con los archivos que Express entrega al navegador.

En ella incluí las páginas HTML, los archivos CSS y JavaScript minificados y la fuente que utiliza el logotipo.

También preparé un ZIP con los archivos de la versión estática anterior. Para ejecutar la versión actual se necesita el proyecto con su servidor Express, las dependencias y la configuración de MySQL; ese ZIP por sí solo no es suficiente.

## Versionamiento

Utilicé Git para registrar los cambios del proyecto y GitHub para almacenar el repositorio.

Esto me permite conservar las versiones del código y consultar las modificaciones realizadas durante el desarrollo.

## Cómo ejecutar MiJourney

Con las dependencias instaladas, MySQL funcionando y las variables de entorno configuradas, inicia el servidor desde la carpeta principal del proyecto:

```bash
npm start
```

Después abre [http://127.0.0.1:3000](http://127.0.0.1:3000) en un navegador. Los ejercicios permanecen guardados en MySQL al actualizar la página. Para utilizar las funciones de la aplicación hay que acceder desde el servidor, no abrir directamente `index.html`.

Las instrucciones para instalar y configurar el proyecto en otra computadora están en [INSTALL.md](INSTALL.md).

## Ejecución con Apache

También configuré Apache mediante XAMPP para acceder a MiJourney desde el dominio local [https://mijourney.local](https://mijourney.local), con un certificado HTTPS local. Apache recibe las solicitudes y las envía al servidor Express.

Para utilizar esta dirección deben estar funcionando Apache, Express y MySQL. El dominio y el certificado se configuraron en esta computadora; no se configuran automáticamente al copiar el proyecto.

## Aviso de Privacidad y Términos y Condiciones

La aplicación cuenta con un [Aviso de Privacidad](privacidad.html) y unos [Términos y Condiciones](terminos.html). Ambos documentos se pueden consultar desde los enlaces del pie de página.
