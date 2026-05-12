# PetFeeder Monitor EDU (Proyecto 1113)

Aplicación educativa para monitorear un comedero de mascotas en tiempo real usando **solo JavaScript**.

Stack actual:
- Backend: **Node.js + Express**
- Frontend: **HTML + JavaScript vanilla**

---

## Objetivo del proyecto

Aprender integración de software con hardware bajo un flujo real:

`Arduino -> Lectura de datos -> API backend -> Panel web -> Historial`

En esta fase se trabaja con **datos simulados** para consolidar backend y frontend antes de conectar el Arduino.

---

## Estado actual

MVP funcional:
- API de salud (`/api/health`)
- API de estado actual (`/api/status`)
- API de historial (`/api/history`)
- Panel web con actualización automática cada 2 segundos
- Simulación de lecturas de nivel y estado de motor

---

## Funcionalidades implementadas

- Visualización de nivel de comida (%)
- Visualización de estado del motor (`ON` / `OFF`)
- Fecha/hora de última lectura
- Historial de lecturas recientes
- Clasificación de estado por umbral:
  - `normal` (>= 40)
  - `bajo` (>= 20 y < 40)
  - `critico` (< 20)

---

## Estructura del repositorio

```txt
comedero/
  backend/
    package.json
    src/
      app.js
  frontend/
    index.html
    app.js
  PRD.md
  tarea-1.md
  tarea-2.md
  README.md
```

---

## Requisitos

- Node.js LTS (recomendado 18+)
- npm

Verificación:

```bash
node -v
npm -v
```

---

## Ejecución local

1. Instalar dependencias del backend:

```bash
cd backend
npm install
```

2. Iniciar servidor:

```bash
npm start
```

3. Abrir en navegador:

- Panel: `http://localhost:3000`
- Health: `http://localhost:3000/api/health`
- Estado: `http://localhost:3000/api/status`
- Historial: `http://localhost:3000/api/history?limit=20`

---

## Endpoints disponibles

### `GET /api/health`
Confirma que el servicio está activo.

### `GET /api/status`
Devuelve la última lectura disponible.

Ejemplo:

```json
{
  "nivel": 72,
  "estado_motor": "OFF",
  "timestamp": "2026-05-12T22:00:00.000Z"
}
```

### `GET /api/history?limit=20`
Devuelve las últimas lecturas (límite configurable).

---

## Guías para estudiantes

- [tarea-1.md](tarea-1.md): construcción del MVP base con API + panel.
- [tarea-2.md](tarea-2.md): validación de datos y mejoras de monitoreo.

---

## Mensaje para Nicole

Nicole, gracias por tu compromiso con el equipo. Sigamos trabajando con constancia, pruebas y buena documentación para cerrar un proyecto sólido.

---

## Próxima fase

Integrar lectura serial real desde Arduino con la librería `serialport` y reemplazar la simulación por datos del dispositivo.

---

## Regla del curso

Este proyecto se desarrolla **exclusivamente con JavaScript** en backend y frontend.
