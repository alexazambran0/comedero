function clasificarNivel(nivel) {
  if (nivel >= 40) return 'normal'
  if (nivel >= 20) return 'bajo'
  return 'critico'
}

function renderEstado(data) {
  const estado = clasificarNivel(data.nivel)
  const badge = document.getElementById('estado-badge')

  document.getElementById('nivel').textContent = `Nivel: ${data.nivel}%`
  document.getElementById('motor').textContent = `Motor: ${data.estado_motor}`
  document.getElementById('hora').textContent = `Ultima lectura: ${new Date(data.timestamp).toLocaleString()}`

  badge.textContent = estado
  badge.className = `badge ${estado}`
}

function renderHistorial(items) {
  const tbody = document.getElementById('tabla-historial')
  tbody.innerHTML = ''

  items.slice().reverse().forEach((item) => {
    const tr = document.createElement('tr')
    tr.innerHTML = `
      <td>${new Date(item.timestamp).toLocaleTimeString()}</td>
      <td>${item.nivel}%</td>
      <td>${item.estado_motor}</td>
    `
    tbody.appendChild(tr)
  })
}

async function cargarPanel() {
  try {
    const [statusRes, historyRes] = await Promise.all([
      fetch('/api/status'),
      fetch('/api/history?limit=20')
    ])

    if (!statusRes.ok || !historyRes.ok) throw new Error('Error de API')

    const status = await statusRes.json()
    const history = await historyRes.json()

    renderEstado(status)
    renderHistorial(history)
  } catch (error) {
    console.error('No se pudo actualizar el panel:', error)
  }
}

cargarPanel()
setInterval(cargarPanel, 2000)
