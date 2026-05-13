# Comedero Automático para Gatos

Aplicación web para supervisar y, en fases posteriores, controlar un comedero de gatos construido con `Arduino Uno` y un tornillo sinfín como mecanismo dispensador.

El objetivo final del proyecto es permitir dos modos de operación desde la web:

- Programar horarios de dispensado.
- Activar el dispensado manualmente.

Actualmente el repositorio ya tiene un `MVP` funcional de monitoreo con datos simulados. Todavía no existe integración real con Arduino ni control del motor desde la web.

## Objetivo del proyecto

Construir una solución educativa de `IoT` que conecte hardware y software en este flujo:

`Aplicación web -> API backend -> Arduino Uno -> motor/tornillo sinfín -> dispensado de comida`

Y, de forma complementaria:

`Arduino/lecturas -> backend -> panel web -> historial`

## Estado actual del proyecto

Lo que ya existe:

- Backend con `Node.js + Express`.
- Frontend con `HTML + JavaScript vanilla`.
- Panel web servido por el backend.
- API para consultar salud del servicio.
- API para consultar estado actual del comedero.
- API para consultar historial reciente.
- Simulación automática de lecturas cada 2 segundos.
- Clasificación visual del nivel de comida: `normal`, `bajo`, `critico`.

Lo que todavía no existe:

- Comunicación serial con `Arduino Uno`.
- Programación de horarios de alimentación.
- Botón de dispensado manual conectado al hardware.
- Persistencia real en base de datos o archivo.
- Validación robusta de lecturas.
- Estado de conexión con el dispositivo físico.

## Análisis del código actual

### Backend

El backend en [backend/src/app.js](/home/hog/Documentos/1113-2026-proyectos/comedero/backend/src/app.js:1) hace estas funciones:

- Sirve el frontend estático.
- Expone `GET /api/health`.
- Expone `GET /api/status`.
- Expone `GET /api/history?limit=20`.
- Mantiene en memoria `lecturaActual` e `historial`.
- Genera lecturas simuladas con `setInterval(...)` cada 2 segundos.

Limitaciones actuales del backend:

- Toda la información se pierde al reiniciar el servidor.
- No hay rutas para crear horarios ni para dispensado manual.
- No existe comunicación serial ni control de pines.
- `health` solo responde estado básico del servicio.

### Frontend

El frontend en [frontend/index.html](/home/hog/Documentos/1113-2026-proyectos/comedero/frontend/index.html:1) y [frontend/app.js](/home/hog/Documentos/1113-2026-proyectos/comedero/frontend/app.js:1) ya muestra:

- Nivel de comida.
- Estado del motor.
- Fecha/hora de última lectura.
- Estado visual por nivel.
- Tabla de últimas lecturas.

Limitaciones actuales del frontend:

- No hay formulario para horarios.
- No hay botón de dispensado manual.
- No hay indicador de conexión/desconexión.
- No hay vista de configuración del hardware.

## Arquitectura actual

```txt
frontend/index.html + frontend/app.js
                |
                v
       backend/src/app.js
                |
                v
     simulador en memoria
```

## Arquitectura objetivo

```txt
Frontend web
  |- panel de estado
  |- programación de horarios
  |- dispensado manual
                |
                v
Backend Node.js
  |- API REST
  |- lógica de horarios
  |- historial
  |- integración serial
                |
                v
Arduino Uno
  |- recibe comando
  |- activa motor
  |- mueve tornillo sinfín
  |- reporta estado
```

## Estructura del proyecto

```txt
comedero/
  backend/
    package.json
    package-lock.json
    src/
      app.js
  frontend/
    index.html
    app.js
  PRD.md
  tarea-1.md
  tarea-2.md
  presentacion.txt
  README.md
```

## Tecnologías actuales

- `Node.js`
- `Express`
- `HTML`
- `JavaScript vanilla`

## Requisitos para ejecutar

- `Node.js` 18 o superior
- `npm`

Verificación:

```bash
node -v
npm -v
```

## Ejecución local

1. Entrar al backend:

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

4. Abrir en el navegador:

- `http://localhost:3000`
- `http://localhost:3000/api/health`
- `http://localhost:3000/api/status`
- `http://localhost:3000/api/history?limit=20`

## Endpoints disponibles hoy

### `GET /api/health`

Retorna el estado básico del backend.

Ejemplo:

```json
{
  "ok": true,
  "servicio": "activo"
}
```

### `GET /api/status`

Retorna la última lectura simulada.

Ejemplo:

```json
{
  "nivel": 72,
  "estado_motor": "OFF",
  "timestamp": "2026-05-13T12:00:00.000Z"
}
```

### `GET /api/history?limit=20`

Retorna las lecturas recientes almacenadas en memoria.

## Funcionalidades objetivo de negocio

Cuando el proyecto avance a la siguiente fase, la aplicación debería permitir:

1. Configurar horarios de alimentación.
2. Ejecutar dispensado manual desde la web.
3. Ver estado del comedero en tiempo real.
4. Consultar historial de dispensados y lecturas.
5. Detectar nivel bajo de comida.
6. Confirmar si el Arduino está conectado.

## Roadmap recomendado

### Fase 1. Consolidar el MVP actual

- Agregar validación de lecturas.
- Agregar indicador de conexión en frontend.
- Resaltar eventos críticos.
- Mejorar respuesta de `health`.

### Fase 2. Integración con hardware

- Conectar `Arduino Uno` por puerto serial.
- Definir formato de mensajes entre backend y Arduino.
- Reemplazar simulación por lecturas reales.

### Fase 3. Control del comedero

- Crear endpoint para dispensado manual.
- Crear endpoint para guardar horarios.
- Implementar scheduler en backend.
- Enviar comandos al Arduino para activar el tornillo sinfín.

### Fase 4. Persistencia y robustez

- Guardar historial en `SQLite` o `JSON`.
- Registrar errores de comunicación.
- Manejar reconexión serial.
- Agregar logs de eventos.

## Propuesta de siguientes endpoints

Estos endpoints aún no existen, pero son consistentes con el objetivo del proyecto:

- `POST /api/feed/manual`
- `GET /api/schedules`
- `POST /api/schedules`
- `PUT /api/schedules/:id`
- `DELETE /api/schedules/:id`
- `GET /api/device/status`

## Formato sugerido para integración con Arduino

Lectura enviada por Arduino al backend:

```json
{
  "timestamp": "2026-05-13T12:00:00Z",
  "nivel": 68,
  "estado_motor": "OFF",
  "evento": "lectura"
}
```

Comando enviado por backend al Arduino:

```json
{
  "accion": "dispensar",
  "duracion_ms": 2500,
  "origen": "manual"
}
```

## Documentos de apoyo

- [PRD.md](/home/hog/Documentos/1113-2026-proyectos/comedero/PRD.md)
- [tarea-1.md](/home/hog/Documentos/1113-2026-proyectos/comedero/tarea-1.md)
- [tarea-2.md](/home/hog/Documentos/1113-2026-proyectos/comedero/tarea-2.md)

## Observaciones importantes

- El nombre actual del proyecto en la documentación previa es `PetFeeder Monitor EDU`, pero el enfoque real del repositorio ya está orientado a un comedero automático de gatos.
- `backend/node_modules/` está versionado localmente en el directorio de trabajo; normalmente no debería incluirse en Git.
- La documentación anterior describe más monitoreo que automatización. Este `README` separa claramente el estado actual del objetivo final.
