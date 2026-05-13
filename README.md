# Comedero Automatico para Gatos

Proyecto educativo para estudiantes que estan empezando a programar. La meta es construir una aplicacion web que permita ver el estado del comedero y, en las siguientes fases, controlar un `Arduino Uno` que mueve un tornillo sinfin para dispensar comida.

## Que se va a construir

Este proyecto se hara por etapas.

### Etapa 1. Monitoreo web

La aplicacion debe mostrar:

- nivel de comida,
- estado del motor,
- hora de la ultima lectura,
- historial reciente.

### Etapa 2. Control manual

La aplicacion debe permitir:

- presionar un boton en la web,
- enviar un comando al backend,
- hacer que el Arduino dispense comida una vez.

### Etapa 3. Horarios

La aplicacion debe permitir:

- crear horarios de alimentacion,
- guardar esos horarios,
- ejecutar el dispensado automaticamente cuando llegue la hora.

## Objetivo educativo

Los estudiantes aprenderan a:

1. Crear un servidor con `Node.js` y `Express`.
2. Consumir una API desde `JavaScript` en el navegador.
3. Mostrar datos en una pagina web.
4. Conectar software con hardware usando `Arduino Uno`.
5. Organizar un proyecto por fases pequenas y claras.

## Estado actual

Hoy el proyecto ya tiene una base funcional, pero todavia esta en etapa de monitoreo con datos simulados.

Ya existe:

- backend con `Node.js + Express`,
- frontend con `HTML + JavaScript`,
- endpoint `GET /api/health`,
- endpoint `GET /api/status`,
- endpoint `GET /api/history`,
- actualizacion del panel cada 2 segundos,
- historial en memoria.

Todavia falta:

- conexion real con `Arduino Uno`,
- boton de dispensado manual,
- formulario para horarios,
- almacenamiento permanente,
- comandos reales hacia el motor.

## Que hace el codigo actual

### Backend

Archivo principal: [backend/src/app.js](/home/hog/Documentos/1113-2026-proyectos/comedero/backend/src/app.js:1)

Actualmente el backend:

- sirve el frontend,
- guarda una lectura actual en memoria,
- guarda un historial en memoria,
- responde tres endpoints,
- simula nuevas lecturas cada 2 segundos.

### Frontend

Archivos principales:

- [frontend/index.html](/home/hog/Documentos/1113-2026-proyectos/comedero/frontend/index.html:1)
- [frontend/app.js](/home/hog/Documentos/1113-2026-proyectos/comedero/frontend/app.js:1)

Actualmente el frontend:

- consulta el backend,
- muestra nivel, motor y hora,
- clasifica el nivel como `normal`, `bajo` o `critico`,
- muestra una tabla con lecturas recientes.

## Flujo del proyecto

Hoy:

`Frontend -> Backend -> Simulacion`

Meta final:

`Frontend -> Backend -> Arduino Uno -> Motor -> Comida`

## Estructura del repositorio

```txt
comedero/
  backend/
    src/
      app.js
    package.json
  frontend/
    index.html
    app.js
  README.md
  PRD.md
  tarea-1.md
  tarea-2.md
```

## Requisitos

- `Node.js` 18+
- `npm`

Verificacion:

```bash
node -v
npm -v
```

## Como ejecutar el proyecto

1. Entrar a `backend`:

```bash
cd backend
```

2. Instalar dependencias:

```bash
npm install
```

3. Iniciar el servidor:

```bash
npm start
```

4. Abrir:

- `http://localhost:3000`
- `http://localhost:3000/api/health`
- `http://localhost:3000/api/status`
- `http://localhost:3000/api/history?limit=20`

## API actual

### `GET /api/health`

Confirma que el backend esta activo.

### `GET /api/status`

Devuelve la ultima lectura simulada.

Ejemplo:

```json
{
  "nivel": 72,
  "estado_motor": "OFF",
  "timestamp": "2026-05-13T12:00:00.000Z"
}
```

### `GET /api/history?limit=20`

Devuelve las ultimas lecturas simuladas.

## Plan del proyecto

### Fase 1. Mejorar el monitoreo

Se va a trabajar en:

- validacion de lecturas,
- mejor endpoint de salud,
- indicador de conexion,
- mejor visualizacion del historial.

### Fase 2. Agregar control manual

Se va a trabajar en:

- boton de dispensado,
- endpoint `POST` para ordenar dispensado,
- estructura de comando para Arduino.

### Fase 3. Agregar horarios

Se va a trabajar en:

- crear horarios desde la web,
- guardar horarios en backend,
- ejecutar horarios automaticamente.

### Fase 4. Conectar Arduino real

Se va a trabajar en:

- lectura serial,
- envio de comandos al dispositivo,
- manejo de errores de conexion.

## Endpoints que probablemente se agregaran

- `POST /api/feed/manual`
- `GET /api/schedules`
- `POST /api/schedules`
- `DELETE /api/schedules/:id`
- `GET /api/device/status`

## Documentos de clase

- [PRD.md](/home/hog/Documentos/1113-2026-proyectos/comedero/PRD.md)
- [tarea-1.md](/home/hog/Documentos/1113-2026-proyectos/comedero/tarea-1.md)
- [tarea-2.md](/home/hog/Documentos/1113-2026-proyectos/comedero/tarea-2.md)

## Nota importante

Este repositorio todavia no controla el comedero real. En este momento sirve como base para que los estudiantes entiendan primero el monitoreo y luego agreguen control manual y horarios sin saltarse pasos.
