# Tarea 2 — Validacion de datos y mejora del panel (JavaScript)

**Proyecto:** PetFeeder Monitor EDU  
**Curso:** 1113  
**Nivel:** Basico - Intermedio

---

## Objetivo de la tarea

Partiendo del MVP actual (backend + frontend con datos simulados), ustedes van a mejorar la calidad del sistema:
1. validar lecturas antes de guardarlas,
2. mostrar estado de conexion del servicio,
3. resaltar eventos criticos en historial.

> Regla de clase: esta tarea se hace **solo con JavaScript**.

---

## Contexto actual

El proyecto ya tiene:
- `GET /api/health`
- `GET /api/status`
- `GET /api/history`
- Panel web que actualiza cada 2 segundos.

Ahora vamos a reforzar robustez y visualizacion.

---

## Requerimientos funcionales de esta tarea

### RF1 — Validacion de lectura en backend
En `backend/src/app.js` creen una funcion `esLecturaValida(lectura)` que verifique:
- `nivel` es numero entero entre 0 y 100,
- `estado_motor` es `ON` o `OFF`,
- `timestamp` existe y es una fecha valida.

Si la lectura no es valida:
- no se guarda en historial,
- se incrementa un contador de errores.

### RF2 — Endpoint de salud con mas info
Mejoren `GET /api/health` para devolver:
- `ok`
- `servicio`
- `errores_lectura`
- `lecturas_guardadas`
- `timestamp`

### RF3 — Indicador de conexion en frontend
En `frontend/index.html` agreguen un texto `Estado de conexion`.
En `frontend/app.js`:
- si la API responde, mostrar `Conectado`.
- si falla `fetch`, mostrar `Desconectado`.

### RF4 — Resaltar lecturas criticas
En la tabla de historial, cuando `nivel < 20`:
- la fila debe tener estilo visual de alerta (ej. fondo rojo suave),
- debe ser facil identificar riesgo.

---

## Paso a paso sugerido

1. Crear validacion en backend.
2. Aplicar validacion donde se generan/reciben lecturas.
3. Agregar campos nuevos al endpoint `/api/health`.
4. En frontend, agregar indicador de conexion.
5. Aplicar clase CSS para filas criticas.
6. Probar errores desconectando temporalmente el backend.

---

## Criterios de evaluacion

1. No se guardan lecturas invalidas.
2. `/api/health` muestra metricas tecnicas solicitadas.
3. El frontend informa si esta conectado o no.
4. Lecturas criticas se distinguen visualmente.
5. El sistema sigue actualizando cada 2 segundos sin romperse.

---

## Pruebas manuales obligatorias

1. Levantar backend y frontend; verificar panel en `http://localhost:3000`.
2. Abrir `http://localhost:3000/api/health` y revisar nuevos campos.
3. Confirmar que existen filas criticas cuando el nivel baja de 20.
4. Apagar backend y confirmar que el estado cambie a `Desconectado`.
5. Volver a encender backend y confirmar reconexion.

---

## Entregable

1. Codigo actualizado en:
- `backend/src/app.js`
- `frontend/index.html`
- `frontend/app.js`
- (opcional) estilos en `frontend/index.html` o archivo CSS separado

2. Evidencias:
- Captura de `/api/health`.
- Captura del panel con estado `Conectado`.
- Captura del panel con una lectura critica resaltada.

---

**Nota docente:** Esta tarea prepara el proyecto para la siguiente fase: conectar lectura serial real desde Arduino.
