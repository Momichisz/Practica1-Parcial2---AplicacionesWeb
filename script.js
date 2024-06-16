document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('add-form');
  const table = document.getElementById('list-table').getElementsByTagName('tbody')[0];
  const successAlert = document.getElementById('success-alert');

  form.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevenir el envío del formulario de la forma tradicional

    // Obtener los valores de los campos del formulario
    const nombre = document.getElementById('input-nombre').value;
    const fechaInicio = document.getElementById('input-inicio').value;
    const fechaFin = document.getElementById('input-fin').value;
    const responsable = document.getElementById('input-respon').value;

    // Crear una nueva fila
    const nuevaFila = document.createElement('tr');

    // Crear las celdas para la nueva fila
    const celdaCheckbox = document.createElement('td');
    const celdaNombre = document.createElement('td');
    const celdaFechaInicio = document.createElement('td');
    const celdaFechaFin = document.createElement('td');
    const celdaResponsable = document.createElement('td');
    const celdaDelete = document.createElement('td');

    // Crear el checkbox para la celda de "Completa"
    const checkboxCompleta = document.createElement('input');
    checkboxCompleta.type = 'checkbox';
    checkboxCompleta.className = 'form-check-input';
    celdaCheckbox.appendChild(checkboxCompleta);

    // Asignar los valores a las celdas
    celdaNumero.textContent = table.rows.length + 1; // Número de fila
    celdaNombre.textContent = nombre;
    celdaFechaInicio.textContent = fechaInicio;
    celdaFechaFin.textContent = fechaFin;
    celdaResponsable.textContent = responsable;

    // Crear el ícono de eliminar
    const iconoEliminar = document.createElement('i');
    iconoEliminar.className = 'material-icons';
    iconoEliminar.id = 'delete-icon';
    iconoEliminar.textContent = 'delete';
    iconoEliminar.style.cursor = 'pointer';


    // Añadir evento de clic al ícono de eliminar
    iconoEliminar.addEventListener('click', function () {
      table.removeChild(nuevaFila);
    });

    // Añadir el ícono de eliminar a la celda
    celdaDelete.appendChild(iconoEliminar);

    // Añadir las celdas a la nueva fila
    nuevaFila.appendChild(celdaCheckbox);
    nuevaFila.appendChild(celdaNombre);
    nuevaFila.appendChild(celdaFechaInicio);
    nuevaFila.appendChild(celdaFechaFin);
    nuevaFila.appendChild(celdaResponsable);
    nuevaFila.appendChild(celdaDelete);

    // Añadir la nueva fila al cuerpo de la tabla
    table.appendChild(nuevaFila);

    // Limpiar el formulario
    //form.reset();

    // Mostrar la alerta de éxito
    successAlert.style.display = 'block';

    // Ocultar la alerta después de 3 segundos
    setTimeout(function() {
      successAlert.style.display = 'none';
    }, 3500);


  });
});