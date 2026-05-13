# Tarea 1 - Consolidar el monitoreo del comedero

**Proyecto:** Comedero Automatico para Gatos  
**Nivel:** Basico  
**Objetivo:** entender el proyecto actual y dejar listo un panel de monitoreo claro y estable.

## Que van a aprender

En esta tarea ustedes van a practicar:

- lectura de codigo existente,
- consumo de una API,
- actualizacion de datos en pantalla,
- validacion basica de datos,
- mejoras visuales simples.

## Contexto

El proyecto ya tiene:

- un backend con datos simulados,
- un frontend que consulta el backend,
- un panel que muestra el estado del comedero.

Antes de controlar el hardware real, primero necesitamos que este monitoreo funcione bien.

## Meta de la tarea

Al terminar, el sistema debe:

1. mostrar si el backend esta conectado,
2. mostrar nivel, motor y hora de ultima lectura,
3. mostrar historial reciente,
4. resaltar niveles criticos,
5. responder un `health` mas completo.

## Archivos que deben revisar

- [backend/src/app.js](/home/hog/Documentos/1113-2026-proyectos/comedero/backend/src/app.js:1)
- [frontend/index.html](/home/hog/Documentos/1113-2026-proyectos/comedero/frontend/index.html:1)
- [frontend/app.js](/home/hog/Documentos/1113-2026-proyectos/comedero/frontend/app.js:1)

## Actividades

### 1. Mejorar `GET /api/health`

El endpoint debe devolver:

- `ok`
- `servicio`
- `lecturas_guardadas`
- `timestamp`

Ejemplo esperado:

```json
{
  "ok": true,
  "servicio": "activo",
  "lecturas_guardadas": 25,
  "timestamp": "2026-05-13T14:00:00.000Z"
}
```

### 2. Validar las lecturas simuladas

Antes de guardar una lectura en historial, revisen que:

- `nivel` este entre 0 y 100,
- `estado_motor` sea `ON` o `OFF`,
- `timestamp` exista.

### 3. Agregar estado de conexion en el frontend

En la pagina debe aparecer un texto como:

- `Conectado` cuando la API responde,
- `Desconectado` cuando falla.

### 4. Resaltar niveles criticos

Si una lectura tiene `nivel < 20`, esa fila del historial debe verse diferente para que el riesgo sea evidente.

## Paso a paso sugerido

1. Ejecuten el proyecto actual.
2. Revisen como funciona `GET /api/status`.
3. Modifiquen `GET /api/health`.
4. Agreguen la validacion antes de guardar en historial.
5. Agreguen el texto de conexion en el frontend.
6. Apliquen estilo visual a filas criticas.
7. Prueben apagando y encendiendo el backend.

## Pruebas minimas

1. Abrir `http://localhost:3000`.
2. Abrir `http://localhost:3000/api/health`.
3. Confirmar que el historial se actualiza.
4. Confirmar que se ve el estado `Conectado`.
5. Confirmar que una lectura critica se distingue visualmente.

## Entregable

El equipo debe entregar:

1. Codigo actualizado.
2. Captura del panel funcionando.
3. Captura de `/api/health`.
4. Explicacion corta de que cambiaron.

## Por que esta tarea existe

Si el monitoreo no es claro ni confiable, no tiene sentido pasar a control manual o a horarios. Esta tarea prepara la base del proyecto.
