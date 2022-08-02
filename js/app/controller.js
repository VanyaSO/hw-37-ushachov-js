'use strict';

function controller(view, model, payload) {

    const formSelector = '#todoForm';
    const todosContainerSelector = '#todoItems';
    const form = document.querySelector(formSelector)
    const todosContainer = document.querySelector(todosContainerSelector)
    model.init(formSelector);
    view.init(form, todosContainer);



    const fetchFormData = inputs => {
        let data = inputs;

        if(inputs instanceof NodeList){
            data = Array.from(inputs);
        }

        return data.reduce((acc,item) => {
            acc[item.name] = item.value;
            return acc;
        }, {})
    }


    const submitHandler = event => {
        event.preventDefault();
        event.stopPropagation();

        const inputs =  form.querySelectorAll('input, textarea');
        const data = model.setData(fetchFormData(inputs));

        if(!data.success) throw new Error('Все очень плохо');

        view.renderTodoItem(data.saveData);
    }

    const loadHandler = () => {
        const todoItem = model.getData();
        if(!todoItem) return;

        todoItem.forEach(item => view.renderTodoItem(item));

    }

    const deleteHandler = event => {
        event.preventDefault();

        if(!event.target.classList.contains('delete')) return;
        const todoId = +event.target.closest('[data-todo-id]').getAttribute('data-todo-id');

        model.deleteTodoItem(todoId);
        view.deleteTodoItem(todoId);

    }

    const statusHandler = event => {
        event.stopPropagation();

        if(!event.target.classList.contains('select-todo-item')) return;

        // const index = event.target.getAttribute("data-select-status");
        const index = event.target.value;
        // console.log(index)
    

        model.setStatus(index);
    }



    form.addEventListener('submit', submitHandler);
    window.addEventListener('DOMContentLoaded', loadHandler);
    todosContainer.addEventListener('click', deleteHandler);
    todosContainer.addEventListener('change', statusHandler);

    return {}
}