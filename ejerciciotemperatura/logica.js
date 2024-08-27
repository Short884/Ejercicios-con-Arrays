// Inicialización de variables
const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
let temperaturas = [];

// Función para solicitar temperaturas al usuario
function solicitarTemperaturas() {
  const anio = document.getElementById('anio').value;
  if (anio === '') {
    alert('Por favor, ingrese un año válido.');
    return;
  }

  // Mostrar formulario para ingresar temperaturas
  const formularioTemperaturas = document.getElementById('formularioTemperaturas');
  const inputsTemperaturas = document.getElementById('inputsTemperaturas');
  inputsTemperaturas.innerHTML = ''; // Limpiar formulario previo

  meses.forEach((mes, indice) => {
    const label = document.createElement('label');
    label.textContent = `Temperatura media en ${mes}:`;
    const input = document.createElement('input');
    input.type = 'number';
    input.min = '-50';
    input.max = '50';
    input.placeholder = `Temperatura de ${mes}`;
    input.id = `temp${indice}`;
    inputsTemperaturas.appendChild(label);
    inputsTemperaturas.appendChild(input);
    inputsTemperaturas.appendChild(document.createElement('br'));
  });

  formularioTemperaturas.classList.remove('oculto');
}

// Función para generar el diagrama de barras
function generarDiagrama() {
  temperaturas = [];
  let inputsValidos = true;

  // Recopilar temperaturas desde los inputs
  meses.forEach((mes, indice) => {
    const temperatura = parseFloat(document.getElementById(`temp${indice}`).value);
    if (isNaN(temperatura)) {
      alert(`Por favor, ingrese una temperatura válida para ${mes}.`);
      inputsValidos = false;
      return;
    }
    temperaturas.push(temperatura);
  });

  if (!inputsValidos) return;

  // Crear diagrama de barras
  const diagramaBarras = document.getElementById('diagramaBarras');
  diagramaBarras.innerHTML = ''; // Limpiar diagrama previo

  temperaturas.forEach((temperatura, indice) => {
    const barraContenedor = document.createElement('div');
    barraContenedor.className = 'barra';
    
    const etiquetaMes = document.createElement('span');
    etiquetaMes.textContent = meses[indice];
    barraContenedor.appendChild(etiquetaMes);
    
    const barra = document.createElement('div');
    barra.className = 'barra-grafico';
    barra.style.width = `${temperatura * 3}px`; // Escalar la barra según la temperatura
    barra.textContent = temperatura >= 0 ? ` ${'*'.repeat(Math.round(temperatura))}` : ` ${'-'.repeat(Math.abs(Math.round(temperatura)))}`; // Representar la barra con asteriscos o guiones

    barraContenedor.appendChild(barra);
    diagramaBarras.appendChild(barraContenedor);
  });
}
