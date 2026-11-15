# MiJourney

MiJourney es una aplicación web que desarrollé para llevar un registro de mis entrenamientos. La idea es poder guardar los ejercicios que realizo, junto con las series, repeticiones y el peso utilizado, para tener un seguimiento más organizado.

La aplicación permite agregar y eliminar ejercicios. Los datos se guardan directamente en el navegador, por lo que no es necesario crear una cuenta ni utilizar una base de datos.

## Tecnologías utilizadas

Para desarrollar MiJourney utilicé HTML, CSS y JavaScript.

HTML me permitió organizar el contenido de la página, CSS se utilizó para el diseño y JavaScript para las funciones de registro y eliminación de ejercicios.

También utilicé Git y GitHub para llevar un control de los cambios realizados en el proyecto.

## Organización y optimización

Organicé los archivos en carpetas para separar los estilos, el código JavaScript y los recursos de la aplicación.

Después preparé versiones minificadas de los archivos CSS y JavaScript para reducir su tamaño. Conservé los archivos originales por si necesito realizar modificaciones más adelante.

## Preparación para el despliegue

Creé una carpeta llamada `dist` con los archivos necesarios para ejecutar la aplicación.

En ella incluí el HTML, los archivos CSS y JavaScript minificados y la fuente que utiliza el logotipo.

Finalmente, comprimí estos archivos en un ZIP para facilitar su traslado al servidor.

## Versionamiento

Utilicé Git para registrar los cambios del proyecto y GitHub para almacenar el repositorio.

Esto me permite conservar las versiones del código y consultar las modificaciones realizadas durante el desarrollo.

## Cómo ejecutar MiJourney

Para utilizar la aplicación, basta con abrir el archivo `index.html` en un navegador.

Los ejercicios registrados se guardan localmente, por lo que permanecen disponibles al actualizar la página, siempre que se utilice el mismo navegador y se conserven sus datos.

## Ejecución con Apache

Utilicé Apache mediante XAMPP para ejecutar MiJourney localmente. Configuré un Virtual Host en el puerto 80 y vinculé la ruta `/mijourney/` con la carpeta `dist` del proyecto.

Una vez cargada esta configuración y con Apache funcionando, la aplicación se puede abrir desde [http://localhost/mijourney/](http://localhost/mijourney/).
