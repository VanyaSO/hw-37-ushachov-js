'use strict';

function view() {

    const creatTodoItem = (data) => {
        const wrapperElement = document.createElement('div');
        wrapperElement.classList.add('col-4');
        wrapperElement.setAttribute('data-todo-id', data.id);
        wrapperElement.setAttribute('data-select-status', data.status);

        wrapperElement.innerHTML = `<div class="taskWrapper">
                <div class="taskHeading">${data.title}</div>
                <div class="taskDescription">${data.description}</div>
                <button class="btn btn-danger mt-3 delete">Delete</button>
                <select class="select-todo-item" name="select" >
                    <option value="no-status">Без статуса</option>
                    <option value="pending">В работе</option>
                    <option value="сompleted">Завершен</option>
                </select>
            </div>`;

        return wrapperElement
    }

    return {
        form: null,
        todoContainer: null,

        renderTodoItem(data) {
            const itemTemplate = creatTodoItem(data);
            this.todoContainer.append(itemTemplate);
        },

        deleteTodoItem(id) {
            document.querySelector(`[data-todo-id ='${id}']`).remove();
        },

        init(formElements, todoContainer) {
            this.form = formElements;
            this.todoContainer = todoContainer;
        }

    }
}