
(function (window) {
    'use strict';

    var todoList = JSON.parse(localStorage.getItem('storeTodo')) || [],
        todoListElement = document.querySelectorAll('.todo-list')[0],
        todos = document.querySelectorAll('.todo-list li'),
        mainSection = document.querySelectorAll('.main')[0],
        footer = document.querySelectorAll('.footer')[0],
        input = document.querySelectorAll('.new-todo')[0],
        toggle = todoListElement.querySelectorAll('.toggle'),
        todoCount = footer.querySelector('.todo-count strong'),
        deleteElement = document.querySelectorAll('destroy'),
        ENTER_KEY_CODE = 13;

    var lineThrough = function(event) {
        var todoCountValue = parseInt(todoCount.innerHTML),
            todoContainer = $parent(event.target, 'li');
        
        todoContainer.classList.toggle('completed');

        if ( hasClass(todoContainer, 'completed') ) {
            todoCount.innerHTML = todoCountValue - 1;
        } else {
            todoCount.innerHTML = todoCountValue + 1;
        };
    };

    window.$parent = function (element, tagName) { //Stolen from tastejs
        if (!element.parentNode) {
            return;
        }
        if (element.parentNode.tagName.toLowerCase() === tagName.toLowerCase()) {
            return element.parentNode;
        }
        return window.$parent(element.parentNode, tagName);
    };

    function hasClass(el, className) {
        if (el.classList) {
            return el.classList.contains(className);
        }
        else {
            return new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className); // It does nothing...
        }
    };

    function isEmptyString(string) {
    	var sym = /^\s*$/.test(string);
    	return sym;
    };

    function showElements() {
        footer.classList.remove('hidden');
        mainSection.classList.remove('hidden');
    };

    function hideElements() {
        footer.classList.add('hidden');
        mainSection.classList.add('hidden');
    };

    function buildTodos() {
        todoList.forEach ( function(elem, index, array) {
            // console.log(elem, index, array);
            var template = '<div class="view"><input class="toggle" type="checkbox"><label>' + elem + '<button class="destroy"></button></label></div>',
                todo = todoListElement.appendChild(document.createElement('li'));

            todo.innerHTML = template;
            todoCount.innerHTML = todoList.length;
        });
    };



    if ( todoList.length ) { // if we have todos in LS on page load
        
        showElements();
        buildTodos();
        
    } else {
        hideElements();
    }

    input.onkeypress = function(event) {
        var charCode = event.keyCode,
            inputField = this;
        

        if ( charCode === ENTER_KEY_CODE && !isEmptyString(inputField.value) ) {

        	var todoBody = inputField.value.trim() + '',
            	template = '<div class="view"><input class="toggle" type="checkbox"><label>' + todoBody + '<button class="destroy"></button></label></div>',
                todo = todoListElement.appendChild(document.createElement('li')),
                todoString;        	

            showElements();
            
            todoList.push(todoBody); // add new todo to todoList array
            todo.innerHTML = template;
            inputField.value = '';
            todoCount.innerHTML = todoList.length;
            todoString = JSON.stringify(todoList);

            localStorage.setItem('storeTodo', todoString);

            // console.log(localStorage.getItem('storeTodo'));
        }
    };

    todoListElement.addEventListener('change', lineThrough, false);

    var deleteHandler = function () {

        var toggle = event.target;

        if ( toggle.classList.contains('destroy') ) {
            var thisTodoWrapper = $parent(toggle, 'label'),
                thisTodoLi = $parent(toggle, 'li'),
                thisTodoText = thisTodoWrapper.textContent,
                thisTodoIndex = todoList.indexOf(thisTodoText);

            event.preventDefault();
            todoList.splice(thisTodoIndex, 1);
            localStorage.setItem('storeTodo', JSON.stringify(todoList));
            thisTodoLi.className = 'deleted';
            todoListElement.removeChild(todoListElement.querySelector('.deleted'));
            todoCount.innerHTML = todoList.length;

            if (!todoList.length) {
                hideElements();
            }
        }

    };

    document.addEventListener('click', deleteHandler, false);

})(window);
