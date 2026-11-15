# MiJourney

Aplicación web para registrar entrenamientos, preparada para el Reto 2 de UVEG. Permite registrar el nombre del ejercicio, las series, las repeticiones y el peso en kilogramos, consultar el historial y eliminar registros.

Los datos se conservan mediante `localStorage` en el navegador y origen utilizados. No se sincronizan entre dispositivos; borrar los datos del navegador elimina los registros guardados.

## Tecnologías

HTML, CSS y JavaScript puro. Sin frameworks, bibliotecas de JavaScript, bases de datos ni backend. El logotipo utiliza Bodoni Moda, bajo licencia SIL Open Font License 1.1 (incluida en `dist/fonts/OFL.txt`).

## Estructura

```text
MiJourney/
├── index.html
├── css/
│   └── styles.css
│   └── styles.min.css
├── js/
│   └── app.js
│   └── app.min.js
├── img/                     # Actualmente vacía; Git no registra carpetas vacías
├── dist/                    # Versión autónoma para despliegue
│   ├── index.html
│   ├── css/styles.min.css
│   ├── js/app.min.js
│   └── fonts/
│       ├── bodoni-moda-500.ttf
│       └── OFL.txt
├── MiJourney.zip            # Paquete generado; excluido de Git
├── README.md
└── .gitignore
```

## Ejecución local

Abre `index.html` en un navegador moderno. Utiliza los archivos minificados y carga la fuente desde Google Fonts, por lo que necesita conexión para mostrar esa tipografía. Para utilizar la versión autónoma, abre `dist/index.html`: incluye la misma fuente de forma local.

## Minificación

Se conservan `css/styles.css` y `js/app.js` como fuentes legibles, junto con sus versiones `.min`. La optimización elimina comentarios CSS y espacios innecesarios, preservando cadenas de texto y literales de plantilla de JavaScript. No requiere dependencias de ejecución.

| Archivo | Original | Minificado | Reducción |
| --- | ---: | ---: | ---: |
| `css/styles.css` | 4,059 bytes | 3,483 bytes | 14.19 % |
| `js/app.js` | 4,200 bytes | 3,726 bytes | 11.29 % |

Estas medidas corresponden a los archivos de la raíz del proyecto; el CSS de `dist` también incluye la declaración de la fuente local. Después de modificar las fuentes, regenera los minificados y actualiza sus copias en `dist` antes de desplegar.

## Despliegue

1. Usa el contenido de `dist` como raíz del sitio en un alojamiento de archivos estáticos.
2. Conserva la estructura de `css`, `js` y `fonts`, incluida la licencia tipográfica. No es necesaria la carpeta `img` mientras permanezca vacía y sin referencias.
3. Comprueba el registro, la recarga de la página y la eliminación de ejercicios desde la dirección publicada. Los registros de otro origen no se trasladan automáticamente.

Para generar el paquete desde PowerShell, en la raíz del proyecto:

```powershell
Compress-Archive -Path dist/* -DestinationPath MiJourney.zip -Force
```

El ZIP contiene los archivos directamente en su raíz, sin una carpeta `dist` adicional. Descomprímelo y abre `index.html` para comprobarlo, o publica todo su contenido en el alojamiento. El paquete ZIP es un artefacto generado y no se versiona; `dist` sí se conserva en Git. Este repositorio no configura el servidor ni publica automáticamente el sitio.

## Verificación realizada

Se comprobó la sintaxis de JavaScript y se ejecutaron pruebas automatizadas con un DOM simulado para registro, recuperación desde `localStorage` y eliminación. También se comprobaron las rutas locales de `dist` y la integridad SHA-256 del contenido del ZIP después de descomprimirlo. Estas verificaciones no sustituyen una revisión visual y funcional en el navegador de destino.
