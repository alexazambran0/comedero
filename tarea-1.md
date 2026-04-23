# Tarea-1 - Proyecto Comedero (JavaScript + Arduino)

**Fecha:** 23 de abril de 2026  
**Objetivo de la clase:** dejar funcionando el flujo mínimo `Arduino -> Backend -> Web`.

## 1. Tareas principales (obligatorias)

1. Crear estructura base del proyecto:
   - `backend/src/app.js`
   - `backend/src/api/routes.js`
   - `frontend/index.html`
   - `frontend/app.js`

2. Configurar backend con Express:
   - Levantar servidor en puerto `3000`.
   - Crear endpoint `GET /api/health`.

3. Simular una lectura del comedero:
   - Definir un objeto con: `nivel`, `estado_motor`, `timestamp`.
   - Exponerlo en `GET /api/status`.

4. Conectar frontend con backend:
   - Hacer `fetch('/api/status')`.
   - Mostrar nivel, estado y hora en pantalla.

5. Guardar historial inicial:
   - Crear arreglo en memoria para lecturas.
   - Crear endpoint `GET /api/history?limit=50`.

6. Estandarizar nombre del repositorio:
   - Renombrar repositorio en GitHub a `aula-iot-comedero`.
   - Actualizar remoto local:
     - `git remote set-url origin https://github.com/alexazambran0/aula-iot-comedero.git`
     - `git remote -v`

## 2. Ideas extra (si terminan rápido)

1. Agregar color por estado:
   - `normal` verde
   - `bajo` amarillo
   - `critico` rojo

2. Mostrar tabla con últimas 10 lecturas en la web.

3. Crear validación:
   - Si `nivel < 0` o `nivel > 100`, no guardar lectura.

4. Botón de “Actualizar ahora” en frontend.

## 3. Evidencias que deben entregar en esta sesión

1. Captura de endpoint `GET /api/status` funcionando.
2. Captura de interfaz mostrando datos.
3. Código subido a GitHub con commit del día.
4. Captura o evidencia del repo renombrado a `aula-iot-comedero`.

## 4. Cierre de clase (reflexión rápida)

Cada equipo responde:
1. ¿Qué parte técnica fue la más difícil en esta sesión?
2. ¿Qué error resolvieron y cómo lo solucionaron?
3. ¿Qué van a mejorar en la próxima sesión?

---

Design by Henry by kyrbot.com

"No programan para evitar errores; programan para aprender a vencerlos."
