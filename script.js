const tasks = [];

function addTask() {
  const description = prompt('Ingrese la descripción de la tarea:');
  if (description) {
    const task = {
      id: tasks.length + 1,
      description: description,
      completed: false
    };
    tasks.push(task);
    console.log('Tarea agregada:');
    console.log(task);
    showMenu();
  }
}

function deleteTask() {
  const taskId = prompt('Ingrese el ID de la tarea a eliminar:');
  const index = tasks.findIndex(task => task.id === Number(taskId));
  if (index !== -1) {
    const deletedTask = tasks.splice(index, 1);
    console.log('Tarea eliminada:');
    console.log(deletedTask);
  } else {
    console.log('No se encontró una tarea con ese ID.');
  }
  showMenu();
}

function completeTask() {
  const taskId = prompt('Ingrese el ID de la tarea a marcar como completada:');
  const task = tasks.find(task => task.id === Number(taskId));
  if (task) {
    task.completed = true;
    console.log('Tarea marcada como completada:');
    console.log(task);
  } else {
    console.log('No se encontró una tarea con ese ID.');
  }
  showMenu();
}

function showMenu() {
  console.log('------');
  console.log('Seleccione una opción:');
  console.log('1. Agregar tarea');
  console.log('2. Eliminar tarea');
  console.log('3. Marcar tarea como completada');
  console.log('4. Salir');
  const option = prompt('Opción seleccionada:');
  switch (option) {
    case '1':
      addTask();
      break;
    case '2':
      deleteTask();
      break;
    case '3':
      completeTask();
      break;
    case '4':
      console.log('¡Hasta luego!');
      break;
    default:
      console.log('Opción no válida. Intente nuevamente.');
      showMenu();
      break;
  }
}

console.log('Bienvenido/a a la lista de tareas');
showMenu();
