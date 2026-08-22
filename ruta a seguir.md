# Ruta a Seguir — Proaudita

> Documento de orientación. Si en algún momento no sabes qué hacer, vuelve aquí.
> Objetivo único: conseguir clientes que paguen. Todo lo demás es secundario.

---

## El norte

**Proaudita** es una firma boutique de auditoría, tributación y consultoría de procesos para empresas medianas y grandes en Chile. El diferenciador es la visión tecnológica aplicada a auditoría tradicional.

**Cliente ideal:** empresa mediana (facturación $500M–$5B CLP), con procesos contables desorganizados o sin auditoría reciente, en rubros de alta complejidad contable (constructoras, clínicas, hoteles, inmobiliarias, logística).

**Meta de corto plazo:** 3 clientes pagantes en los próximos 90 días.

---

## Fases en orden estricto

### FASE 1 — Lanzar ✅ COMPLETADA (2026-08-10)

- [x] Conectar dominio proaudita.cl en Vercel
- [x] Configurar variables de entorno en Vercel
- [x] SSL activo — `https://www.proaudita.cl` resuelve correctamente
- [x] 0 errores de consola, 12/12 requests 200
- [ ] Verificar formulario en producción (enviar mensaje de prueba real)
- [ ] Subir foto profesional a `components/Profile.tsx`
- [ ] Verificar el sitio en mobile

**Estado:** dominio vivo. Pendiente foto profesional y test del formulario con email real.

---

### FASE 2 — Presencia coherente (semana 2-3)
*Cuando un prospecto busque a Matías Balbontín, que todo diga lo mismo.*

- [ ] Actualizar perfil Cal.com (bio en español, foto, nombres de reuniones)
- [ ] Actualizar LinkedIn con headline + about + servicios correctos
- [ ] Configurar WhatsApp Business con nombre "Proaudita" y mensaje de bienvenida
- [ ] Verificar que todos los links del sitio funcionen (Cal.com, WhatsApp)

**Criterio de éxito:** buscar "Proaudita" y "Matías Balbontín" en Google → sitio + Cal.com + LinkedIn consistentes.

---

### FASE 3 — Primeros contactos outbound (semana 2-4, en paralelo con fase 2)
*No esperar a que lleguen solos. Salir a buscar.*

- [ ] Actualizar script de scraping con CIUDADES y RUBROS objetivo (ver `Scripts/scraping/`)
- [ ] Correr primer scraping de prueba → revisar calidad de leads
- [ ] Preparar template de email frío (ver `marketing + ads/email-frio/`)
- [ ] Enviar primeros 20 emails (máximo 20/día)
- [ ] Registrar respuestas en CSV de seguimiento
- [ ] Ejecutar seguimiento a los 5 días sin respuesta

**Criterio de éxito:** primera reunión de diagnóstico agendada con un prospecto outbound.

---

### FASE 4 — LinkedIn como canal inbound (semana 3 en adelante, continuo)
*Construir autoridad para que los prospectos lleguen solos.*

- [ ] Publicar primeros 2 posts (ver plantillas en `marketing + ads/linkedin/`)
- [ ] Establecer cadencia: 2 posts/semana mínimo
- [ ] Conectar con 20 personas del perfil de cliente ideal por semana (LinkedIn)
- [ ] Responder todos los comentarios dentro de 24h

**Criterio de éxito:** primer mes con 8 publicaciones y al menos 1 visita referida desde LinkedIn por semana.

---

### FASE 5 — Primer cliente y proceso de entrega (cuando llegue)
*Ejecutar impecablemente el primer proyecto define la reputación.*

- [ ] Hacer diagnóstico completo (formulario en `procedimientos y procesos/formularios/`)
- [ ] Enviar propuesta en menos de 48h (template en `procedimientos y procesos/propuestas/`)
- [ ] Firmar contrato antes de iniciar trabajo (template en `procedimientos y procesos/contratos/`)
- [ ] Ejecutar proyecto con updates semanales al cliente
- [ ] Entregar informe final + reunión de presentación
- [ ] Solicitar referido o testimonial (informal, por WhatsApp)

**Criterio de éxito:** cliente satisfecho que pagaría por un segundo proyecto.

---

### FASE 6 — SEO técnico (mes 2)
*Cuando el sitio esté vivo y haya contenido, empezar a posicionar en Google.*

- [ ] Agregar sitemap.xml y robots.txt (ver `app/sitemap.ts` y `app/robots.ts`)
- [ ] Agregar schema markup JSON-LD en `app/layout.tsx` (Person + ProfessionalService)
- [ ] Crear y verificar Google Business Profile
- [ ] Conectar Google Search Console

---

## Lo que NO hacer ahora

- No construir el blog antes de tener 3 clientes
- No gastar en Google Ads antes de que el funnel orgánico esté validado
- No rediseñar el sitio — está bien como está
- No perfeccionar scripts antes de probarlos con datos reales
- No agregar más servicios — los 5 actuales son suficientes

---

## Si te pierdes, responde estas preguntas

1. ¿El sitio está vivo en proaudita.cl? Si no → Fase 1 primero.
2. ¿Se han enviado emails fríos esta semana? Si no → Fase 3.
3. ¿Se ha publicado en LinkedIn esta semana? Si no → Fase 4.
4. ¿Hay algún prospecto en conversación activa? Si sí → ese es el foco total.

---

## Recursos clave

| Recurso | Ubicación |
|---|---|
| Marketing y contenido | `marketing + ads/` |
| Flujo del cliente | `procedimientos y procesos/flujos/ciclo-cliente.md` |
| Template de propuesta | `procedimientos y procesos/propuestas/template-propuesta.md` |
| Template de contrato | `procedimientos y procesos/contratos/template-contrato.md` |
| Formulario de diagnóstico | `procedimientos y procesos/formularios/diagnostico-inicial.md` |
| Scripts de scraping | `Scripts/scraping/` |
| Conexión Nubox | `Scripts/nubox-api/ejemplo-conexion.py` |
| Skills del dominio | `skills/contador-cl/SKILL.md` |
| Decisiones de marca | `CONTEXT.md` |
| Instrucciones técnicas | `CLAUDE.md` |
