document.addEventListener('DOMContentLoaded', function() {
    const taskForm = document.getElementById('taskForm');
    const taskList = document.getElementById('taskList');
    const searchInput = document.getElementById('search');
    const counters = document.getElementById('counters');
  
    taskForm.addEventListener('submit', function(event) {
      event.preventDefault();
      const taskName = document.getElementById('taskName').value;
      const dueDate = document.getElementById('dueDate').value;
      const priority = document.getElementById('priority').value;
  
      const task = {
        name: taskName,
        date: dueDate,
        priority: priority,
        status: 'to-do'
      };
  
      let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
      tasks.push(task);
      localStorage.setItem('tasks', JSON.stringify(tasks));
  
      displayTasks();
      taskForm.reset();
    });
  
    function displayTasks() {
      taskList.innerHTML = '';
      let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
      const searchTerm = searchInput.value.toLowerCase();
  
      let startedCount = 0;
      let completedCount = 0;
      let highPriorityCount = 0;
  
      tasks.forEach(function(task, index) {
        if (task.name.toLowerCase().includes(searchTerm)) {
          const taskElement = document.createElement('div');
          taskElement.classList.add('task');
  
          const checkbox = document.createElement('input');
          checkbox.type = 'checkbox';
          checkbox.addEventListener('change', function() {
            const taskInfo = taskElement.querySelector('.task-info');
            if (checkbox.checked) {
              taskInfo.style.textDecoration = 'line-through';
              tasks[index].status = 'completed';
              updateCounters();
            } else {
              taskInfo.style.textDecoration = 'none';
              tasks[index].status = 'to-do';
              updateCounters();
            }
            localStorage.setItem('tasks', JSON.stringify(tasks));
          });
  
          const taskInfo = document.createElement('div');
          taskInfo.classList.add('task-info');
          taskInfo.textContent = `${task.name} - ${task.date} - ${task.priority}`;
  
          const deleteButton = document.createElement('button');
          deleteButton.textContent = 'Delete';
          deleteButton.classList.add('delete-btn');
          deleteButton.addEventListener('click', function() {
            deleteTask(index);
          });
  
          taskElement.appendChild(checkbox);
          taskElement.appendChild(taskInfo);
          taskElement.appendChild(deleteButton);
          taskList.appendChild(taskElement);
  
          if (task.status === 'completed') {
            checkbox.checked = true;
            taskInfo.style.textDecoration = 'line-through';
          }
  
          switch (task.status) {
            case 'to-do':
              startedCount++;
              break;
            case 'completed':
              completedCount++;
              break;
          }
  
          if (task.priority === 'high') {
            highPriorityCount++;
          }
        }
      });
  
      const counterHTML = `
        <p>Started Tasks: ${startedCount}</p>
        <p>Completed Tasks: ${completedCount}</p>
        <p>High Priority Tasks: ${highPriorityCount}</p>
      `;
      counters.innerHTML = counterHTML;
    }
  
    function deleteTask(index) {
      let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
      tasks.splice(index, 1);
      localStorage.setItem('tasks', JSON.stringify(tasks));
      displayTasks();
    }
  
    searchInput.addEventListener('input', displayTasks);
  
    function updateCounters() {
      displayTasks();
    }
  
    displayTasks();
  });
  