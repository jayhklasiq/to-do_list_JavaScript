// Initialize arrays to store tasks and completed tasks
let todoTasks = [];
let completedTasks = [];

// Function to create Edit and Complete buttons for a task
function createTaskButtons(taskText, isCompleted) {
  const editBtn = document.createElement('button');
  editBtn.textContent = 'Edit';
  editBtn.classList.add('edit-btn');
  editBtn.addEventListener('click', function () {
    // Create a pop-up/modal for editing the task
    const modal = document.createElement('div');
    modal.classList.add('modal');

    const modalContent = document.createElement('div');
    modalContent.classList.add('modal-content');

    const inputField = document.createElement('input');
    inputField.type = 'text';
    inputField.value = taskText;

    const saveBtn = document.createElement('button');
    saveBtn.textContent = 'Save';
    saveBtn.addEventListener('click', function () {
      const newText = inputField.value.trim();
      if (newText !== '') {
        if (!isCompleted) {
          // Update the task text in the todoTasks array
          const index = todoTasks.indexOf(taskText);
          if (index !== -1) {
            todoTasks[index] = newText;
          }
        } else {
          // Update the task text in the completedTasks array
          const index = completedTasks.indexOf(taskText);
          if (index !== -1) {
            completedTasks[index] = newText;
          }
        }
        // Update the task text in the UI
        taskText = newText;
        renderTasks(); // Re-render tasks after editing
        modal.remove();
      }
    });

    modalContent.appendChild(inputField);
    modalContent.appendChild(saveBtn);
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
  });

  const completeBtn = document.createElement('button');
  completeBtn.textContent = 'Complete';
  completeBtn.classList.add('complete-btn');
  completeBtn.addEventListener('click', function () {
    // Move the task text to the Completed section
    const index = todoTasks.indexOf(taskText);
    if (index !== -1) {
      // Remove the task from todoTasks and add it to completedTasks
      const completedTask = todoTasks.splice(index, 1)[0];
      completedTasks.push(completedTask);
    }
    // Update the UI
    renderTasks();
  });

  return [editBtn, completeBtn];
}

/// Function to render tasks in the ToDo List and Completed List
function renderTasks() {
  try {
    const todoList = document.getElementById('todo-list');
    const completedList = document.getElementById('completed-list');

    // Clear existing tasks
    todoList.innerHTML = '';
    completedList.innerHTML = '';

    // Render tasks from todoTasks array
    todoTasks.forEach(task => {
      const li = document.createElement('li');
      li.textContent = task;
      const [editBtn, completeBtn] = createTaskButtons(task, false);
      li.appendChild(editBtn);
      li.appendChild(completeBtn);
      todoList.appendChild(li);
    });

    // Render tasks from completedTasks array
    completedTasks.forEach(task => {
      const li = document.createElement('li');
      li.textContent = task;
      completedList.appendChild(li);
    });
  } catch (error) {
    console.error('An error occurred while rendering tasks:', error.message);
    // You can add further error handling here if needed
  }
}

// Handle user input and add tasks to the ToDo List accordingly
document.getElementById('add-task-btn').addEventListener('click', function () {
  const taskInput = document.getElementById('task-input');
  const taskText = taskInput.value.trim();
  if (taskText !== '') {
    // Add the task to the todoTasks array
    todoTasks.push(taskText);
    // Render tasks
    renderTasks();
    // Clear input field
    taskInput.value = '';
  }
});

// Initialize tasks when the page loads
window.addEventListener('load', function () {
  // Check if tasks exist in local storage
  const storedTodoTasks = JSON.parse(localStorage.getItem('todoTasks'));
  const storedCompletedTasks = JSON.parse(localStorage.getItem('completedTasks'));
  if (storedTodoTasks) {
    todoTasks = storedTodoTasks;
  }
  if (storedCompletedTasks) {
    completedTasks = storedCompletedTasks;
  }
  // Render tasks
  renderTasks();
});

// Save tasks to local storage when the page is unloaded
window.addEventListener('beforeunload', function () {
  localStorage.setItem('todoTasks', JSON.stringify(todoTasks));
  localStorage.setItem('completedTasks', JSON.stringify(completedTasks));
});
