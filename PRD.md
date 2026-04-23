# PRD - Monitor en Tiempo Real para Comedero de Mascotas (Arduino + JavaScript)

## Mensaje del profesor al equipo

Estimados estudiantes: en este proyecto ustedes van a aprender programación de forma aplicada, conectando código real con hardware real. Vamos a trabajar con disciplina técnica, buena documentación y colaboración, porque en programación no gana quien adivina: ganan quienes prueban, corrigen y mejoran.

---

## 1. Resumen del proyecto

### Nombre del proyecto
**PetFeeder Monitor EDU**

### Propósito
Ustedes van a construir una aplicación web educativa que lea en tiempo real la información de un comedero de mascotas basado en **Arduino Uno**, la muestre en un panel web y guarde un historial inicial para consulta.

### Enfoque pedagógico
Con este proyecto ustedes aprenderán JavaScript de forma práctica, integrando software con hardware real.

### Regla de lenguaje del proyecto
Durante este proyecto, ustedes trabajarán **solo con JavaScript**:
- Backend: Node.js + Express.
- Frontend: JavaScript en el navegador.
- Integración hardware: lectura serial desde JavaScript.
No se usarán otros lenguajes para el desarrollo principal de las actividades.

---

## 2. Contexto y problema

En muchos proyectos escolares con Arduino, ustedes solo ven los datos en el Monitor Serial del IDE. Eso limita su aprendizaje de:
- Integración entre hardware y software.
- Visualización de datos en interfaces web.
- Persistencia de datos (historial).

En este proyecto ustedes resolverán eso con un flujo completo:
**Arduino -> Puerto serial -> Backend Node.js -> Frontend web -> Almacenamiento de historial**

---

## 3. Objetivos

### Objetivo general
Ustedes desarrollarán un monitor web en tiempo real para un comedero de mascotas que permita visualizar el estado actual y guardar histórico básico como base de formación en programación.

### Objetivos de aprendizaje (para estudiantes)
Al finalizar, ustedes podrán:
1. Leer datos por puerto serial desde JavaScript.
2. Crear un servidor web básico con Node.js y Express.
3. Exponer datos mediante una API REST sencilla.
4. Actualizar una interfaz web con datos en vivo.
5. Guardar y consultar historial en una base local (SQLite o JSON).
6. Aplicar validación y manejo básico de errores.
7. Documentar y presentar una solución técnica funcional.

---

## 4. Alcance

### Incluye (MVP educativo)
- Lectura de datos del Arduino por Serial.
- Visualización del estado actual en una página web.
- Registro histórico de lecturas (inicialmente cada lectura entrante).
- Consulta de últimas lecturas.
- Indicadores simples de estado (normal, bajo, crítico).

### No incluye (fase futura)
- Control remoto del comedero (activar motor desde web).
- Autenticación de usuarios.
- Despliegue en nube.
- App móvil nativa.

---

## 5. Usuarios y roles

### Usuario principal
- **Ustedes (estudiantes):** programan, prueban y depuran el sistema.

### Usuario secundario
- **Docente:** guía el desarrollo y evalúa resultados.

### Usuario final de demostración
- **Propietario de mascota (simulado):** consulta nivel y eventos del comedero.

---

## 6. Arquitectura propuesta

### Componentes
1. **Arduino Uno**
   - Lee sensores (por ejemplo nivel de comida y estado del mecanismo).
   - Envía mensajes seriales en el formato definido.
2. **Backend Node.js**
   - Abre puerto serial.
   - Parsea y valida datos.
   - Guarda historial.
   - Expone API para el frontend.
3. **Frontend web**
   - Consulta API periódicamente.
   - Muestra estado actual.
   - Muestra tabla de últimas lecturas.
4. **Persistencia**
   - Opción recomendada: SQLite.
   - Opción inicial ultra básica: archivo JSON.

### Flujo de datos
`Arduino -> SerialPort (Node.js) -> Parse/Validación -> Base de datos -> API -> UI`

---

## 7. Requerimientos funcionales

### RF-01 Lectura serial en tiempo real
Ustedes deberán lograr que el sistema se conecte a un puerto serial configurable y procese lecturas entrantes.

### RF-02 Visualización de estado actual
Ustedes deberán mostrar en la interfaz al menos:
- Nivel de comida (% o escala equivalente).
- Estado general del comedero.
- Fecha/hora de última lectura.

### RF-03 Historial inicial
Ustedes deberán guardar cada lectura válida en almacenamiento local con marca de tiempo.

### RF-04 Consulta de historial
Ustedes deberán mostrar en la interfaz al menos las últimas 50 lecturas.

### RF-05 Indicadores por umbral
Ustedes deberán clasificar el estado por nivel:
- Normal
- Bajo
- Crítico

### RF-06 Tolerancia a datos inválidos
Si llega una lectura mal formada, ustedes deberán descartarla y registrar el error sin detener la aplicación.

---

## 8. Requerimientos no funcionales

### RNF-01 Facilidad didáctica
Ustedes deberán mantener código modular y comentado para un nivel inicial/intermedio.

### RNF-02 Rendimiento básico
Ustedes deberán lograr actualización de panel en menos de 2 segundos desde la llegada del dato serial.

### RNF-03 Confiabilidad educativa
Si se pierde la conexión serial, ustedes deberán mostrar aviso y permitir reconexión.

### RNF-04 Portabilidad
Ustedes deberán asegurar funcionamiento en laboratorio con equipos comunes (Windows/Linux) y Node.js LTS.

---

## 9. Formato de datos serial (propuesto)

Para simplificar el aprendizaje, ustedes usarán JSON por línea:

```json
{"timestamp":"2026-04-23T15:30:00Z","nivel":72,"estado_motor":"OFF","evento":"lectura"}
```

### Campos mínimos
- `timestamp`: fecha/hora ISO.
- `nivel`: número entero 0-100.
- `estado_motor`: `ON` o `OFF`.
- `evento`: texto corto (`lectura`, `dispensado`, `error`).

---

## 10. Stack tecnológico recomendado

- **Node.js LTS**
- **Express**
- **serialport** (lectura de Arduino)
- **SQLite** (mejor para enseñar persistencia real)
- **HTML + CSS + JavaScript vanilla** (sin framework, para base sólida)

---

## 11. Estructura sugerida del proyecto

```txt
petfeeder-monitor/
  backend/
    src/
      serial/
        serialReader.js
        parser.js
      db/
        db.js
        feederReadings.repository.js
      api/
        routes.js
      app.js
    package.json
  frontend/
    index.html
    styles.css
    app.js
  docs/
    PRD.md
    API.md
```

---

## 12. API inicial (contrato mínimo)

### GET `/api/status`
Ustedes devolverán el último estado del comedero.

Ejemplo:
```json
{
  "nivel": 72,
  "estado": "normal",
  "estado_motor": "OFF",
  "timestamp": "2026-04-23T15:30:00Z"
}
```

### GET `/api/history?limit=50`
Ustedes devolverán las últimas lecturas.

### GET `/api/health`
Ustedes devolverán la salud del backend y el estado de conexión serial.

---

## 13. Reglas de negocio iniciales

1. Si `nivel >= 40`: estado = `normal`.
2. Si `nivel >= 20 y < 40`: estado = `bajo`.
3. Si `nivel < 20`: estado = `critico`.
4. Lecturas fuera de 0-100 son inválidas.
5. Cada lectura válida se almacena con timestamp de recepción del servidor (si falta el del dispositivo).

---

## 14. Plan de implementación por fases

### Fase 1 - Base técnica (Clase 1-2)
- Ustedes configurarán Node.js + Express.
- Ustedes probarán un endpoint simple.
- Ustedes conectarán `serialport` y mostrarán datos en consola.

### Fase 2 - Estado en vivo (Clase 3-4)
- Ustedes parsearán JSON serial.
- Ustedes guardarán el último estado en memoria.
- Ustedes crearán `/api/status`.
- Ustedes construirán un frontend básico que refresque cada 1-2 segundos.

### Fase 3 - Historial (Clase 5-6)
- Ustedes integrarán SQLite/JSON.
- Ustedes guardarán lecturas.
- Ustedes crearán `/api/history`.
- Ustedes mostrarán tabla de últimas lecturas.

### Fase 4 - Calidad y cierre (Clase 7-8)
- Ustedes implementarán manejo de errores y reconexión serial.
- Ustedes reforzarán validaciones.
- Ustedes ejecutarán pruebas funcionales guiadas.
- Ustedes cerrarán con documentación y presentación final.

---

## 15. Criterios de aceptación (Definition of Done)

El proyecto se considera logrado si ustedes cumplen lo siguiente:
1. El sistema lee datos del Arduino en tiempo real.
2. La web muestra nivel y estado actualizado.
3. El historial guarda y muestra al menos 50 registros.
4. Datos inválidos no rompen la app.
5. Existe documentación mínima de ejecución.
6. El equipo puede hacer demo de extremo a extremo en clase.

---

## 16. Plan de pruebas educativas

### Prueba A - Dato válido
- Enviar lectura válida.
- Verificar actualización en UI y registro en historial.

### Prueba B - Dato inválido
- Enviar `nivel = 150` o JSON incompleto.
- Verificar que se registre error y no se inserte en historial.

### Prueba C - Desconexión
- Desconectar Arduino.
- Verificar alerta de desconexión y recuperación al reconectar.

### Prueba D - Umbrales
- Probar niveles 50, 30 y 10.
- Verificar estado normal/bajo/crítico correctamente.

---

## 17. Riesgos y mitigaciones

1. **Puerto serial cambia entre equipos**
   - Mitigación: archivo de configuración (`.env`) y guía de detección de puertos.
2. **Mensajes seriales inconsistentes**
   - Mitigación: parser con validación estricta y logging.
3. **Tiempo de clase limitado**
   - Mitigación: priorizar MVP y dejar alertas/gráficas como extra.
4. **Diferencias de nivel entre estudiantes**
   - Mitigación: trabajo por parejas (driver/navigator) y tareas escalonadas.

---

## 18. Entregables esperados

1. Código fuente backend y frontend.
2. Archivo de base de datos o JSON con historial de prueba.
3. README con pasos de instalación y ejecución.
4. Video o demo en vivo de 3-5 minutos.
5. Breve reflexión del equipo: qué funcionó, qué falló y qué mejorarán.

---

## 19. Rúbrica sugerida (100 puntos)

1. Funcionamiento técnico (40 pts): lectura, API, UI y persistencia.
2. Calidad de código (20 pts): orden, nombres claros, modularidad.
3. Manejo de errores (15 pts): validaciones y estabilidad.
4. Documentación (15 pts): claridad para ejecutar y entender.
5. Presentación final (10 pts): demo y explicación del flujo.

---

## 20. Próximos incrementos (post-MVP)

1. Gráfica temporal del nivel.
2. Alertas automáticas (correo/Telegram).
3. Botón de dispensado con control seguro.
4. Modo simulación para practicar sin hardware.

---

## 21. Definición de éxito pedagógico

Este proyecto será exitoso si ustedes pueden explicar y demostrar, con evidencia, el flujo completo de datos desde Arduino hasta la interfaz web, incluyendo cómo se almacena y consulta el historial.

---

## Firma

Design by Henry by kyrbot.com

## Frase épica de programación

"El código no se rinde: se prueba, se depura y se vuelve más fuerte en cada versión."
