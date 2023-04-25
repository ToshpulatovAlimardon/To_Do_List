let formInput = document.getElementById("form-input");
const btn = document.getElementById("form-btn");
let todoList = document.getElementById("todo-list");
let todos = [];
let todo = new Object();
btn.onclick = () => {
    if (formInput.value !== "") {
        todo = {
            text: formInput.value,
            check: false,
        };
        todos.push(todo);
        localStorage.setItem("todos", JSON.stringify(todos));
        if (todoList.querySelector("i"))
            todoList.querySelector("i").style.display = "none";
        document
            .querySelector(".order-active-none")
            .classList.add("order-active");
        document.querySelector(".todo-order div").onclick = () => {
            document
                .querySelector(".todo-order div span")
                .classList.toggle("todo-order-active");
        };
        let index = todos.length - 1;
        todoList.innerHTML += fillHtml(todo, index);
        endTodo(todos);
        deleteTodo(todos);
        formInput.value = "";
    }
};
if (localStorage.getItem("todos")) {
    todos = JSON.parse(localStorage.getItem("todos"));
    todoList.innerHTML = "";
    todos.forEach((todo, index) => {
        todoList.innerHTML += fillHtml(todo, index);
    });
    document.querySelector(".order-active-none").classList.add("order-active");
    document.querySelector(".todo-order div").onclick = () => {
        document
            .querySelector(".todo-order div span")
            .classList.toggle("todo-order-active");
    };
}
function fillHtml(todo, index) {
    return `
    <div class="todo todo-id-${index}">
      <div class="container">
         <p class="${todo.check ? "todo-end" : ""}">${todo.text}</p>
         <span>
            <input type="checkbox" name="checkbox" id="check-box" ${
                todo.check ? "checked" : ""
            }/>
            <button id="delete-todo">
               <svg style="width:25px;" xmlns="http://www.w3.org/2000/svg" 
               viewBox="0 0 448 512"><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg>
            </button>
         </span>
      </div>
    </div>
       `;
}
// end todo
function endTodo(todos) {
    todos.forEach((todo, index) => {
        let checkBox = document.querySelector(`.todo-id-${index} #check-box`);
        let parent =
            checkBox.parentNode.parentNode.querySelector("p").textContent;
        let todoParagraph = document.querySelectorAll(".todo .container p");
        checkBox.onclick = () => {
            todoParagraph[index].classList.toggle("todo-end");
            if (parent === todo.text) {
                todo.check = !todo.check;
                localStorage.setItem("todos", JSON.stringify(todos));
            }
        };
    });
}
// delete todo
let deleteTodo = (todos) => {
    let deleteTodo = document.querySelectorAll(".todo");
    for (let i = 0; i < deleteTodo.length; i++) {
        deleteTodo[i].onclick = (e) => {
            let parent =
                e.target.parentNode.parentNode.parentNode.parentNode.parentNode;
            if (
                e.target.parentNode.parentNode.tagName.toLowerCase() ===
                "button"
            ) {
                parent.classList.add("delete-todo");
                todos.forEach((todo, index) => {
                    if (
                        parent.querySelector(".container p").textContent ===
                        todo.text
                    ) {
                        todos.splice(index, 1);
                        localStorage.setItem("todos", JSON.stringify(todos));
                    }
                });
            }
        };
    }
};
endTodo(todos);
deleteTodo(todos);
