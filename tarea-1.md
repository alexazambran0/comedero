# Tarea-1 - Guia Paso a Paso (Nivel Basico)

**Fecha:** 23 de abril de 2026  
**Meta de esta tarea:** que ustedes vean datos del comedero en una pagina web, aunque por ahora sean datos simulados.

## Lenguaje de esta tarea

En esta tarea ustedes trabajaran **solo con JavaScript**:
- Backend: **Node.js + Express (JavaScript)**.
- Frontend: **JavaScript en el navegador**.
- No usaremos Python, Java ni otros lenguajes en esta sesion.

## Antes de empezar

1. Verifiquen que tienen Node.js instalado:
```bash
node -v
npm -v
```
2. Si ambos comandos muestran version, pueden continuar.

## Paso 1: Crear carpetas y archivos

Ejecuten estos comandos en la raiz del proyecto:

```bash
mkdir -p backend/src frontend

touch backend/src/app.js
touch frontend/index.html
touch frontend/app.js
```

Al final deben tener:
- `backend/src/app.js`
- `frontend/index.html`
- `frontend/app.js`

## Paso 2: Preparar el backend

1. Entren a la carpeta backend:
```bash
cd backend
```

2. Inicialicen Node:
```bash
npm init -y
```

3. Instalen Express:
```bash
npm install express
```

4. Peguen este codigo en `backend/src/app.js`:

```js
const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

const lecturaActual = {
  nivel: 72,
  estado_motor: 'OFF',
  timestamp: new Date().toISOString()
};

const historial = [lecturaActual];

app.use(express.static(path.join(__dirname, '../../frontend')));

app.get('/api/health', (req, res) => {
  res.json({ ok: true, servicio: 'activo' });
});

app.get('/api/status', (req, res) => {
  res.json(lecturaActual);
});

app.get('/api/history', (req, res) => {
  res.json(historial.slice(-50));
});

app.listen(PORT, () => {
  console.log(`Servidor listo en http://localhost:${PORT}`);
});
```

5. Ejecuten el servidor:
```bash
node src/app.js
```

6. Prueben en el navegador:
- `http://localhost:3000/api/health`
- `http://localhost:3000/api/status`

Si funciona, sigan al paso 3.

## Paso 3: Crear el frontend

1. Peguen este codigo en `frontend/index.html`:

```html
<!doctype html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Monitor Comedero</title>
  </head>
  <body>
    <h1>Monitor del Comedero</h1>
    <p id="nivel">Nivel: ...</p>
    <p id="motor">Motor: ...</p>
    <p id="hora">Ultima lectura: ...</p>

    <script src="app.js"></script>
  </body>
</html>
```

2. Peguen este codigo en `frontend/app.js`:

```js
async function cargarEstado() {
  const respuesta = await fetch('/api/status');
  const data = await respuesta.json();

  document.getElementById('nivel').textContent = `Nivel: ${data.nivel}%`;
  document.getElementById('motor').textContent = `Motor: ${data.estado_motor}`;
  document.getElementById('hora').textContent = `Ultima lectura: ${data.timestamp}`;
}

cargarEstado();
setInterval(cargarEstado, 2000);
```

3. Abran:
- `http://localhost:3000`

Deben ver nivel, motor y hora actualizandose.

## Paso 4: Renombrar el repositorio

1. En GitHub cambien el nombre del repo a:
- `aula-iot-comedero`

2. En terminal, actualicen el remoto:

```bash
git remote set-url origin https://github.com/alexazambran0/aula-iot-comedero.git
git remote -v
```

## Entregable minimo

Cada equipo entrega:
1. Captura de `http://localhost:3000/api/status`.
2. Captura de `http://localhost:3000` con los datos en pantalla.
3. Link del repo con el nuevo nombre `aula-iot-comedero`.

---

Design by Henry by kyrbot.com

"La programacion premia a quien insiste un intento mas."
