# Tarea 2 - Preparar el control manual del comedero

**Proyecto:** Comedero Automatico para Gatos  
**Nivel:** Basico - Intermedio  
**Objetivo:** preparar la aplicacion para que pueda ordenar un dispensado manual desde la web.

## Que van a aprender

En esta tarea ustedes van a practicar:

- creacion de endpoints `POST`,
- envio de datos desde el frontend,
- manejo de eventos de botones,
- registro simple de acciones,
- preparacion del proyecto para integrarse con Arduino.

## Contexto

Despues de tener un panel de monitoreo mas claro, el siguiente paso del proyecto es el control manual.

Todavia no vamos a mover el hardware real si aun no esta conectado, pero si vamos a dejar lista la estructura de software para hacerlo.

## Meta de la tarea

Al terminar, el sistema debe:

1. tener un boton `Dispensar ahora` en la web,
2. enviar una solicitud al backend,
3. registrar el evento de dispensado manual,
4. reflejar ese evento en el historial o en el estado actual,
5. dejar clara la ruta que luego usara Arduino.

## Archivos que deben revisar

- [backend/src/app.js](/home/hog/Documentos/1113-2026-proyectos/comedero/backend/src/app.js:1)
- [frontend/index.html](/home/hog/Documentos/1113-2026-proyectos/comedero/frontend/index.html:1)
- [frontend/app.js](/home/hog/Documentos/1113-2026-proyectos/comedero/frontend/app.js:1)

## Actividades

### 1. Crear el endpoint de dispensado manual

Agreguen un endpoint:

`POST /api/feed/manual`

Ese endpoint debe:

- recibir la solicitud del frontend,
- crear un evento de dispensado,
- responder con un mensaje claro.

Ejemplo de respuesta:

```json
{
  "ok": true,
  "mensaje": "Dispensado manual solicitado",
  "origen": "web"
}
```

### 2. Registrar el evento en memoria

Cuando se use el endpoint manual, agreguen un registro al historial con informacion como:

- `timestamp`
- `evento`
- `estado_motor`

Si quieren, pueden agregar tambien:

- `origen`
- `duracion_ms`

### 3. Agregar un boton en el frontend

En la interfaz debe existir un boton con un texto claro, por ejemplo:

`Dispensar ahora`

### 4. Enviar la solicitud desde `frontend/app.js`

Cuando el usuario haga clic:

- el frontend debe llamar a `POST /api/feed/manual`,
- debe mostrar un mensaje de exito o error,
- debe actualizar el panel.

### 5. Preparar la integracion futura con Arduino

Aunque todavia no exista conexion serial, dejen comentado o documentado en el codigo donde despues se enviara el comando al dispositivo.

## Paso a paso sugerido

1. Agregar el nuevo endpoint en backend.
2. Probarlo con navegador o herramienta simple.
3. Agregar el boton en `index.html`.
4. Conectar el boton con `fetch` en `app.js`.
5. Actualizar historial despues del dispensado.
6. Verificar que el panel siga funcionando.

## Pruebas minimas

1. Abrir `http://localhost:3000`.
2. Hacer clic en `Dispensar ahora`.
3. Confirmar que el backend responde correctamente.
4. Confirmar que aparece un nuevo evento en el historial.
5. Confirmar que el panel no deja de actualizar.

## Entregable

El equipo debe entregar:

1. Codigo actualizado.
2. Captura del boton en la interfaz.
3. Captura o evidencia de la respuesta del endpoint manual.
4. Explicacion corta de como se conectara despues con Arduino.

## Por que esta tarea existe

El objetivo real del proyecto no es solo mirar datos. El objetivo es poder controlar el comedero. Esta tarea crea el puente entre el monitoreo y el control real.
