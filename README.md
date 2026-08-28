# Cross World Agency · sitio web

Rediseño completo del sitio de **Cross World Agency, S.A.** (agencia naviera, inspecciones marítimas, bunker y reclamos en el Canal de Panamá). Proyecto de ECUS Agency.

- **Plan maestro y tablero de avances:** https://munozospinad0.github.io/crossworld-agency/
- **Documento fuente del plan:** [docs/PLAN.md](docs/PLAN.md)
- **Investigación de competidores:** [docs/competidores.md](docs/competidores.md)
- **Keyword research (Google Ads Keyword Planner, ago-2026):** [research/keyword-research-crossworld.csv](research/keyword-research-crossworld.csv) · resumen en [research/kw_resumen.json](research/kw_resumen.json)
- **Sitio actual (a reemplazar):** https://crossworldagency.com/
- **Producción (próximamente):** Vercel Pro, dominio crossworldagency.com

## Estado

| Fase | Estado |
|---|---|
| 0 · Planeación (plan, keyword research, competidores, repo, página de avances) | Hecho · 27 ago 2026 |
| 1 · Fundaciones (Next.js 16, sistema de diseño, home, servicios, contacto, formulario, Vercel) | Pendiente |
| 2 · Contenido y confianza (servicios, about, certificaciones, puertos, español) | Pendiente |
| 3 · Contenidos y SEO/GEO (blog + Keystatic, schema, llms.txt, CI de calidad, analítica) | Pendiente |
| 4 · Migración y lanzamiento (301, DNS, GBP, directorios) | Pendiente |
| 5 · Crecimiento (2+2 piezas/mes, reporte mensual, sondeo de IA) | Pendiente |

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
