const list = document.getElementById('todo-list');
const itemCountSpan = document.getElementById('item-count');
const uncheckedCountSpan = document.getElementById('unchecked-count');

let todos = [];

function loadTodos() {
  const todosString = localStorage.getItem('todos');
  if (todosString) {
    todos = JSON.parse(todosString);
  }
}

function saveTodos() {
  localStorage.setItem('todos', JSON.stringify(todos));
}

function newTodo() {
  const todoName = prompt('Enter the new todo:');
  if (todoName) {
    const newTodo = {
      name: todoName,
      completed: false
    };
    todos.push(newTodo);
    saveTodos();
    render();
    updateCounter();
  }
}

function renderTodo(todo, index) {
  return `
    <li class="list-group-item">
      <input type="checkbox" class="form-check-input me-2" id="${index}" onchange="checkTodo(${index})" ${todo.completed ? 'checked' : ''}>
      <label for="${index}" class="${todo.completed ? 'text-success text-decoration-line-through' : ''}">${todo.name}</label>
      <button class="btn btn-danger btn-sm float-end" onclick="deleteTodo(${index})">delete</button>
    </li>
  `;
}

function render() {
  const todoListHTML = todos.map((todo, index) => renderTodo(todo, index)).join('');
  list.innerHTML = todoListHTML;
}

function updateCounter() {
  itemCountSpan.textContent = todos.length;
  uncheckedCountSpan.textContent = todos.filter(todo => !todo.completed).length;
}

function deleteTodo(index) {
  todos.splice(index, 1);
  saveTodos();
  render();
  updateCounter();
}

function checkTodo(index) {
  todos[index].completed = !todos[index].completed;
  saveTodos();
  render();
  updateCounter();
}

loadTodos();
render();
updateCounter();
