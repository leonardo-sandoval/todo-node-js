const tasksContainer = document.getElementById('tasks-container');
const addTaskForm = document.getElementById('add-task-form');
const titleInput = document.getElementById('title-input');
const descriptionInput = document.getElementById('description-input');
const dateInput = document.getElementById('date-input');
const completedCounter = document.getElementById('completed-counter');
const incompleteCounter = document.getElementById('incomplete-counter');

let tasks = [];

// Función para mostrar las tareas en el navegador
const renderTasks = () => {
  tasksContainer.innerHTML = '';
  let completedCount = 0;
  let incompleteCount = 0;

  tasks.forEach(task => {
    const taskElement = document.createElement('div');
    taskElement.classList.add('task');

    const titleElement = document.createElement('h3');
    titleElement.innerText = task.title;
    if (task.completed) {
      titleElement.classList.add('completed');
      completedCount++;
    } else {
      incompleteCount++;
    }

    const descriptionElement = document.createElement('p');
    descriptionElement.innerText = task.description;

    const dateElement = document.createElement('p');
    dateElement.innerText = task.date;

    const completeButton = document.createElement('button');
    completeButton.innerText = task.completed ? 'Uncomplete' : 'Complete';
    completeButton.addEventListener('click', () => {
      toggleCompleteTask(task.id);
    });

    const updateButton = document.createElement('button');
    updateButton.innerText = 'Update';
    updateButton.addEventListener('click', () => {
      const updatedTitle = prompt('Enter updated title:', task.title);
      const updatedDescription = prompt('Enter updated description:', task.description);
      const updatedDate = prompt('Enter updated date:', task.date);

      if (updatedTitle && updatedDescription && updatedDate) {
        updateTask(task.id, updatedTitle, updatedDescription, updatedDate);
      }
    });

    const deleteButton = document.createElement('button');
    deleteButton.innerText = 'Delete';
    deleteButton.addEventListener('click', () => {
      deleteTask(task.id);
    });

    taskElement.appendChild(titleElement);
    taskElement.appendChild(descriptionElement);
    taskElement.appendChild(dateElement);
    taskElement.appendChild(completeButton);
    taskElement.appendChild(updateButton);
    taskElement.appendChild(deleteButton);

    tasksContainer.appendChild(taskElement);
  });

  completedCounter.innerText = `Completed Tasks: ${completedCount}`;
  incompleteCounter.innerText = `Incomplete Tasks: ${incompleteCount}`;
};

// Función para agregar una tarea
const addTask = (title, description, date, image) => {
  const newTask = {
    id: tasks.length + 1,
    title,
    description,
    date,
    image,
    completed: false
  };

  tasks.push(newTask);
  renderTasks();
  addTaskForm.reset();
};

// Función para actualizar una tarea
const updateTask = (taskId, updatedTitle, updatedDescription, updatedDate) => {
  const task = tasks.find(task => task.id === taskId);

  if (task) {
    task.title = updatedTitle;
    task.description = updatedDescription;
    task.date = updatedDate;
    renderTasks();
  }
};

// Función para eliminar una tarea
const deleteTask = (taskId) => {
  tasks = tasks.filter(task => task.id !== taskId);
  renderTasks();
};

// Función para marcar o desmarcar una tarea como completada
const toggleCompleteTask = (taskId) => {
  const task = tasks.find(task => task.id === taskId);

  if (task) {
    task.completed = !task.completed;
    renderTasks();
  }
};

// Evento para enviar el formulario de agregar tarea
addTaskForm.addEventListener('submit', event => {
  event.preventDefault();
  const title = titleInput.value;
  const description = descriptionInput.value;
  const date = dateInput.value;
  
  addTask(title, description, date);
});

// Simulación de datos iniciales
tasks = [
  { id: 1, title: 'Task 1', description: 'Description 1', date: '2023-06-01', completed: false },
  { id: 2, title: 'Task 2', description: 'Description 2', date: '2023-06-02', completed: true },
  { id: 3, title: 'Task 3', description: 'Description 3', date: '2023-06-03',  completed: false }
];

// Renderizar las tareas iniciales
renderTasks();
