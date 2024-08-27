// Inicializamos un array para representar las mesas con un número aleatorio de comensales (0 a 4)
let mesas = Array.from({ length: 10 }, () => Math.floor(Math.random() * 5)); 

// Función para mostrar el estado actual de las mesas
function mostrarEstadoMesas() {
  const estadoMesas = document.getElementById('estadoMesas');
  estadoMesas.innerHTML = '';  // Limpiamos la lista antes de mostrar el estado actual

  mesas.forEach((comensales, indice) => {
    const item = document.createElement('li');
    item.textContent = `Mesa ${indice + 1}: ${comensales} comensales`;
    estadoMesas.appendChild(item);
  });
}

// Función para asignar una mesa a un nuevo grupo de clientes
function asignarMesa() {
  const numeroPersonas = parseInt(document.getElementById('numeroPersonas').value);
  const mensaje = document.getElementById('mensaje');
  
  if (numeroPersonas > 4) {
    mensaje.textContent = `Lo siento, no admitimos grupos de ${numeroPersonas}, haga grupos de 4 personas como máximo e intente de nuevo.`;
    return;
  }

  let mesaAsignada = false;
  mensaje.textContent = '';

  // Primero buscamos una mesa completamente vacía (0 personas)
  for (let i = 0; i < mesas.length; i++) {
    if (mesas[i] === 0) {
      mesas[i] = numeroPersonas;
      mesaAsignada = true;
      mensaje.textContent = `Grupo de ${numeroPersonas} personas asignado a la mesa ${i + 1}.`;
      break;
    }
  }

  // Si no encontramos mesa vacía, buscamos una con suficiente espacio para el grupo
  if (!mesaAsignada) {
    for (let i = 0; i < mesas.length; i++) {
      if (mesas[i] + numeroPersonas <= 4) {
        mesas[i] += numeroPersonas;
        mesaAsignada = true;
        mensaje.textContent = `Grupo de ${numeroPersonas} personas asignado a la mesa ${i + 1}.`;
        break;
      }
    }
  }

  // Si no fue posible asignar una mesa, mostramos un mensaje de error
  if (!mesaAsignada) {
    mensaje.textContent = 'Lo siento, no hay mesas disponibles para este grupo.';
  }

  mostrarEstadoMesas();  // Actualizamos el estado de las mesas después de intentar asignar una mesa
}

// Mostrar el estado inicial de las mesas al cargar la página
mostrarEstadoMesas();
