# Cross World Agency · sitio web

Rediseño completo del sitio de **Cross World Agencies, S.A.** (marca: Cross World Agency), agencia naviera e inspecciones marítimas independientes en el Canal de Panamá. Proyecto de ECUS Agency.

- **Plan maestro y tablero de avances:** https://munozospinad0.github.io/crossworld-agency/
- **Documento fuente del plan:** [docs/PLAN.md](docs/PLAN.md)
- **Investigación de competidores:** [docs/competidores.md](docs/competidores.md)
- **Keyword research (Google Ads Keyword Planner, ago-2026):** [research/keyword-research-crossworld.csv](research/keyword-research-crossworld.csv) · resumen en [research/kw_resumen.json](research/kw_resumen.json)
- **Sitio actual (a reemplazar):** https://crossworldagency.com/
- **Producción (próximamente):** Vercel Pro, dominio crossworldagency.com

## Estado

| Fase | Estado |
|---|---|
| 0 · Planeación (plan v1.3 auditado, keyword research, competidores, diseño v0, especificación técnica v1, contenido v0, prototipo de la home) | Hecho · 28 ago 2026 |
| 0.5 · Página puente en el dominio actual (72 h) | Pendiente · 31 ago a 2 sep |
| 1 · Fundaciones (Next.js 16, sistema de diseño, home, servicios, formulario, Vercel) | Pendiente · 31 ago a 11 sep |
| 2 · Contenido y confianza (servicios, about, certificaciones, compliance, Balboa y Cristóbal, español) | Pendiente · 14 a 25 sep |
| 3 · SEO/GEO técnico y calidad (guía del Canal, llms.txt, sitemap, CI, analítica) | Pendiente · 28 sep a 9 oct |
| 4 · Migración y lanzamiento del MVP (308/410, DNS, GBP) | Pendiente · 12 a 16 oct |
| 4.5 · Post-lanzamiento (who we serve, resources, blog + Keystatic, conversiones offline, dashboard, plataformas de DA) | Pendiente · noviembre |
| 5 · Crecimiento (1+1 piezas/mes + alertas ACP, reporte mensual, outreach) | Pendiente · desde noviembre |

## Estructura

```
docs/        plan maestro, competidores, página de avances (GitHub Pages)
research/    scripts del keyword research (Google Ads API) y resultados
(próximo)    app/, components/, content/, keystatic.config.ts, tests/   → sitio Next.js
```

## Cómo se trabaja

- Producción se despliega solo desde `main`; cada cambio pasa por PR con preview de Vercel.
- Sin secretos en el repo: credenciales en variables de entorno de Vercel.
- Contenido editable desde `/keystatic` (cuando exista el sitio); el resto por PR.
