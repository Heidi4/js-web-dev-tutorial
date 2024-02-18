// step 1 create an array
const todoList = [{
  name: 'make dinner',
  dueDate: '16/02/2024'
}, {
  name: 'wash dishes',
  dueDate: '16/02/2024'
}
];
renderTodoList();
function renderTodoList() {
  //  Loop through the array
  let todoListHTML = '';
  // Generating the HTML instead of writing by hand
  for (let i = 0; i < todoList.length; i++) {
    const todoObject = todoList[i];
    // const name = todoObject.name;
    // const dueDate = todoObject.dueDate;
    const { name, dueDate } = todoObject; // Object destructuring


    const html = `
    <div>${name}</div>
    <div>${dueDate} </div>
    <button class="delete-todo-button" onclick="
    todoList.splice(${i}, 1);
    renderTodoList();
    ">Delete</button>
    `;
  
    todoListHTML += html;
  }

  document.querySelector('.js-todo-list').innerHTML = todoListHTML;

}

function addTodo() {
  // step 2 and 3  when we click add it gets the text  from the text box
  const inputElement = document.querySelector('.js-name-input');
  const name = inputElement.value;

  const dateInputElement = document.querySelector('.js-due-date-input');
  const dueDate = dateInputElement.value;


  todoList.push({
    // name: name, 
    // dueDate: dueDate
    name,
    dueDate
  });

  inputElement.value = '';
  renderTodoList();
}