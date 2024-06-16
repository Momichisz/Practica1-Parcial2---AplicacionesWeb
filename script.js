document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('add-form');
  const table = document.getElementById('list-table').getElementsByTagName('tbody')[0];
  const successAlert = document.getElementById('success-alert');

  // Cargar tareas desde localStorage
  loadTasksFromLocalStorage();

  form.addEventListener('submit', function (event) {
      event.preventDefault(); // Prevenir el envío del formulario de la forma tradicional

      // Obtener los valores de los campos del formulario
      const nombre = document.getElementById('input-nombre').value;
      const fechaInicio = document.getElementById('input-inicio').value;
      const fechaFin = document.getElementById('input-fin').value;
      const responsable = document.getElementById('input-respon').value;

      // Verificar que la fecha de fin no sea menor que la fecha de inicio
      if (new Date(fechaFin) < new Date(fechaInicio)) {
          alert("La fecha de fin no puede ser menor que la fecha de inicio.");
          return;
      }

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
      checkboxCompleta.className = 'form-check-input mt-1';
      checkboxCompleta.id = 'marca';

      // Deshabilitar el checkbox si la fecha de fin ha expirado
      if (new Date(fechaFin) < new Date()) {
          checkboxCompleta.disabled = true;
          nuevaFila.classList.add('expired');
      }

      // Agregar evento para cambiar el color de la fila cuando se marca/desmarca el checkbox
      checkboxCompleta.addEventListener('change', function () {
          if (checkboxCompleta.checked) {
              nuevaFila.classList.add('completed');
          } else {
              nuevaFila.classList.remove('completed');
          }
          saveTasksToLocalStorage();
      });

      celdaCheckbox.appendChild(checkboxCompleta);

      // Asignar los valores a las celdas
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

      iconoEliminar.addEventListener('click', function () {
          table.removeChild(nuevaFila);
          saveTasksToLocalStorage();
      });

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

      // Guardar la nueva tarea en localStorage
      saveTasksToLocalStorage();

      // Limpiar el formulario
      form.reset();

      // Mostrar la alerta de éxito
      successAlert.style.display = 'block';

      // Ocultar la alerta después de 3 segundos
      setTimeout(function () {
          successAlert.style.display = 'none';
      }, 3000);
  });

  function saveTasksToLocalStorage() {
      const rows = table.getElementsByTagName('tr');
      const tasks = [];

      for (let i = 0; i < rows.length; i++) {
          const cells = rows[i].getElementsByTagName('td');
          const task = {
              nombre: cells[1].textContent,
              fechaInicio: cells[2].textContent,
              fechaFin: cells[3].textContent,
              responsable: cells[4].textContent,
              completa: cells[0].getElementsByTagName('input')[0].checked
          };
          tasks.push(task);
      }

      localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  function loadTasksFromLocalStorage() {
      const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

      tasks.forEach(task => {
          const nuevaFila = document.createElement('tr');

          const celdaCheckbox = document.createElement('td');
          const celdaNombre = document.createElement('td');
          const celdaFechaInicio = document.createElement('td');
          const celdaFechaFin = document.createElement('td');
          const celdaResponsable = document.createElement('td');
          const celdaDelete = document.createElement('td');

          const checkboxCompleta = document.createElement('input');
          checkboxCompleta.type = 'checkbox';
          checkboxCompleta.className = 'form-check-input';
          checkboxCompleta.checked = task.completa;

          // Deshabilitar el checkbox si la fecha de fin ha expirado
          if (new Date(task.fechaFin) < new Date()) {
              checkboxCompleta.disabled = true;
              nuevaFila.classList.add('expired');
          }

          // Agregar evento para cambiar el color de la fila cuando se marca/desmarca el checkbox
          checkboxCompleta.addEventListener('change', function () {
              if (checkboxCompleta.checked) {
                  nuevaFila.classList.add('completed');
              } else {
                  nuevaFila.classList.remove('completed');
              }
              saveTasksToLocalStorage();
          });

          celdaCheckbox.appendChild(checkboxCompleta);

          if (task.completa) {
              nuevaFila.classList.add('completed');
          }

          celdaNombre.textContent = task.nombre;
          celdaFechaInicio.textContent = task.fechaInicio;
          celdaFechaFin.textContent = task.fechaFin;
          celdaResponsable.textContent = task.responsable;

          const iconoEliminar = document.createElement('i');
          iconoEliminar.className = 'material-icons';
          iconoEliminar.id = 'delete-icon';
          iconoEliminar.textContent = 'delete';
          iconoEliminar.style.cursor = 'pointer';

          iconoEliminar.addEventListener('click', function () {
              table.removeChild(nuevaFila);
              saveTasksToLocalStorage();
          });

          celdaDelete.appendChild(iconoEliminar);

          nuevaFila.appendChild(celdaCheckbox);
          nuevaFila.appendChild(celdaNombre);
          nuevaFila.appendChild(celdaFechaInicio);
          nuevaFila.appendChild(celdaFechaFin);
          nuevaFila.appendChild(celdaResponsable);
          nuevaFila.appendChild(celdaDelete);

          table.appendChild(nuevaFila);
      });
  }
});
