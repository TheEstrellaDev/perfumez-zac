# NOVA SCENTS

Catálogo digital de fragancias de inspiración para NOVA SCENTS. La experiencia permite explorar referencias, buscar por nombre o casa, filtrar por colección y consultar por WhatsApp. No procesa pagos ni afirma afiliación con las casas de inspiración.

## Tecnologías

- React 19, TypeScript y Vite 8.
- Lucide React para iconografía.
- CSS modular, diseño adaptable y preferencia `prefers-reduced-motion`.
- GitHub Actions y GitHub Pages para publicación estática.

## Catálogo auditado

Los tres PDF suministrados tienen 67 fichas de fragancias. Al cotejarlas se encontraron dos duplicados exactos: NOX Young (código 08 y 20) y NOX Élite (código 07 repetido en los catálogos de hombre y mujer). El catálogo contiene **65 referencias únicas** y tres productos de feromonas descritos en las páginas informativas (68 productos en total), con página y PDF de origen en cada registro. Los nombres y casas se transcribieron de las fichas; `aliases` conserva nombres de equivalencia cuando son legibles en el documento.

El brief indica más de 100 fragancias, pero los PDF entregados documentan 65 referencias únicas. No se añadieron perfumes para completar la diferencia. Las fichas informativas de feromonas se deduplicaron y se incluyen como tres productos sin códigos; sus presentaciones quedan por confirmar. Los filtros de Nicho y Artistas están implementados, pero muestran cero referencias hasta que se clasifiquen productos en los datos.

## Estructura

```text
src/
  App.tsx                  Interfaz, buscador, filtros y diálogo de detalle
  styles.css               Identidad visual y responsive design
  data/
    business.ts            Datos comerciales y WhatsApp
    fragrances.ts          Catálogo tipado y funciones de búsqueda
public/
  images/                  Imagen de campaña, logotipo y fotos de presentación
  robots.txt
  sitemap.xml              Plantilla; URL final se genera en el build
catalogo/                  PDF originales, sin modificaciones
assets/                    Recursos originales, sin modificaciones
.github/workflows/deploy.yml
```

## Instalar y ejecutar

Requiere Node.js 22.12 o superior y npm.

```sh
npm ci
npm run dev
```

## Modificar el catálogo

Edita `src/data/fragrances.ts`. Cada fragancia tiene un identificador, nombre de referencia, casa, colección, clasificaciones, código y página/fuente PDF. `aliases` contiene términos alternativos de búsqueda, incluidos equivalentes transcritos cuando se distinguen con claridad.

Para agregar una ficha:

1. Confirma el nombre y la casa en el catálogo o en una fuente comercial verificada.
2. Añade una entrada al grupo correspondiente, asigna un `id` único y conserva el código y origen.
3. Asigna únicamente clasificaciones respaldadas por la fuente. Para actualizar filtros, agrega etiquetas a `classifications` cuando el dato se haya confirmado.
4. El buscador omite acentos y no distingue mayúsculas.

Las imágenes de producto solo deben asignarse cuando exista una fotografía específica comprobable. Las ilustraciones de las tarjetas son decorativas y genéricas.

## Imágenes y logotipo

Las fuentes originales de `assets/` permanecen intactas. Las versiones optimizadas para web están en `public/images/`. El logotipo mostrado procede del recurso oficial proporcionado; la portada y las tres imágenes de colección se generaron para esta identidad y no representan productos comerciales concretos.

## Configuración comercial

Edita `src/data/business.ts` para actualizar el nombre, teléfono/WhatsApp, redes sociales, presentaciones o texto de equivalencia. El teléfono actual se transcribió de la página de contacto incluida en los catálogos (`492-330-66-16`) y se normalizó como `52 492 330 6616` para `wa.me`. Verifica que siga vigente antes de publicar.

Los enlaces de Instagram y Facebook están vacíos porque no se proporcionaron perfiles; no se muestran hasta que se configuren. El porcentaje de equivalencia se presenta como información comunicada por NOVA SCENTS.

## SEO

El documento incluye título, descripción, Open Graph, favicon y datos estructurados tipo `Store` sin precio, inventario, dirección ni valoraciones. El build de GitHub Actions genera `sitemap.xml`, canonical y `robots.txt` usando la URL de Pages; si el repositorio contiene un `CNAME`, utiliza el dominio personalizado. Un build local usa `localhost` solo en sus metadatos.

## Publicar en GitHub Pages

1. Sube el proyecto a un repositorio GitHub con rama principal `main`.
2. En **Settings → Pages**, selecciona **GitHub Actions** como origen de despliegue.
3. Cada push a `main` compila y publica el sitio. El workflow también puede iniciarse manualmente.

```sh
npm run build
npm run preview
npm test
npm run typecheck
```

La carpeta `dist/` se puede revisar localmente; la URL pública solo se confirma una vez que el repositorio y el workflow existan en GitHub. El directorio recibido no tenía `.git` ni remoto configurado; se inicializó aquí un repositorio local en la rama `main`, pero aún no hay un `origin` de GitHub al cual publicar.
