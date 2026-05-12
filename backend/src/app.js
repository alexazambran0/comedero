const express = require('express')
const path = require('path')

const app = express()
const PORT = 3000

let lecturaActual = {
  nivel: 72,
  estado_motor: 'OFF',
  timestamp: new Date().toISOString()
}

const historial = [lecturaActual]

app.use(express.static(path.join(__dirname, '../../frontend')))

app.get('/api/health', (req, res) => {
  res.json({ ok: true, servicio: 'activo' })
})

app.get('/api/status', (req, res) => {
  res.json(lecturaActual)
})

app.get('/api/history', (req, res) => {
  const limit = Number(req.query.limit) || 50
  res.json(historial.slice(-Math.max(1, Math.min(limit, 200))))
})

// Simulador de lecturas para practica sin hardware
setInterval(() => {
  const delta = Math.floor(Math.random() * 9) - 4
  const nivelNuevo = Math.max(0, Math.min(100, lecturaActual.nivel + delta))

  lecturaActual = {
    nivel: nivelNuevo,
    estado_motor: Math.random() > 0.75 ? 'ON' : 'OFF',
    timestamp: new Date().toISOString()
  }

  historial.push(lecturaActual)
  if (historial.length > 500) historial.shift()
}, 2000)

app.listen(PORT, () => {
  console.log(`Servidor listo en http://localhost:${PORT}`)
})
