
(function (window) {
    'use strict';

    var LOCALSTORAGE_KEY = 'storeTodo',
        todoList = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY)) || [],
        todoListElement = document.querySelector('.todo-list'),
        mainSection = document.querySelector('.main'),
        footer = document.querySelector('.footer'),
        input = document.querySelector('.new-todo'),
        toggle = todoListElement.querySelectorAll('.toggle'),
        todoCount = footer.querySelector('.todo-count strong'),
        deleteElement = document.querySelectorAll('destroy'),
        todoTemplate = '<div class="view"><input class="toggle" type="checkbox"><label>%%</label><button class="destroy"></button></div>',
        
        todoIdCount = function() {
            var id = 0; // Hello! I'm a closure :-)
            if (todoList.length) {//if there's something in localstorage we need to start counting from last element's ID
                id = todoList[todoList.length - 1].id;
            }
            return function() {
                return ++id;
            };
        },
        todoId = todoIdCount(),

        ENTER_KEY_CODE = 13;

    function updateLocalStorage() {
        localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(todoList));
    };

    function createTodoRecord(event) {
        updateLocalStorage();

        var charCode = event.keyCode,
            inputField = this,
            val = inputField.value.trim(),
            todo,
            todoString;

        if ( charCode === ENTER_KEY_CODE && val ) {

            var todoEntry = {
                    id: todoId(),
                    txt: val,
                    completed: false
                },
                result = todoTemplate.replace(/%%/g, val),
                todo = todoListElement.appendChild(document.createElement('li'));

            todoList.push(todoEntry); // add new todo to todoList array
            todo.innerHTML = result;
            inputField.value = '';
            todoCount.innerHTML = todoList.length;

            showMainAndFooter();

            console.log(todoEntry);
            // console.log(localStorage.getItem('storeTodo'));
        }
    };
    
    function updateTodoRecord(record, newTxt, newCompleted) {
        record.txt = newTxt;
        record.completed = !!newCompleted;
        updateLocalStorage();
    };

    function deleteTodoRecord(event) {
        var thisDestroyButton = event.target,
            thisTodoLi = $parent(thisDestroyButton, 'li'),
            thisTodoText = thisTodoLi.textContent,
            indexOfItemToDelete = arrayObjectIndexOf(todoList, 'txt', thisTodoText);

        if ( thisDestroyButton.classList.contains('destroy') ) {
            todoList.splice(indexOfItemToDelete, 1);
            updateLocalStorage();
            todoListElement.removeChild(thisTodoLi);

            todoCount.innerHTML = todoList.length - countCompeleted();

            if ( !todoList.length ) {
                hideMainAndFooter();
            }
        }
    };

    function buildTodos() {
        todoList.forEach ( function(elem, index, array) {
            
            var val = elem.txt,
                result = todoTemplate.replace(/%%/g, val),
                todo = todoListElement.appendChild(document.createElement('li')),
                checkbox;

            todo.innerHTML = result;
            todoCount.innerHTML = todoList.length - countCompeleted();

            if(array[index].completed) {
                todo.classList.add('completed');
                checkbox = todo.querySelector('.toggle');
                checkbox.checked = true;
            }
        });
    };

    function arrayObjectIndexOf(myArray, property, searchTerm) {
        for(var i = 0, len = myArray.length; i < len; i++) {
            if (myArray[i][property] === searchTerm) return i;
        }
        return -1;
    }

    function countCompeleted() {
        for(var i = 0, j = 0, len = todoList.length; i < len; i++) {
            if (todoList[i]['completed'] === true) {j++}
        }
        return j;
    };

    function markCompleted(event) {
        var todoCountValue = parseInt(todoCount.innerHTML),
            todoContainer = $parent(event.target, 'li'),
            todoTxt = todoContainer.textContent,
            recordIndex = arrayObjectIndexOf(todoList, 'txt', todoTxt);

        todoContainer.classList.toggle('completed'); //Toggle class on HTML element

        if ( todoContainer.classList.contains('completed') ) {
            updateTodoRecord(todoList[recordIndex], todoTxt, true);
        } else {
            updateTodoRecord(todoList[recordIndex], todoTxt, false);
        }

        todoCount.innerHTML = todoList.length - countCompeleted();
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

    function showMainAndFooter() {
        footer.classList.remove('hidden');
        mainSection.classList.remove('hidden');
    };

    function hideMainAndFooter() {
        footer.classList.add('hidden');
        mainSection.classList.add('hidden');
    };


    if ( todoList.length ) { // if we have todos in LS on page load
        showMainAndFooter();
        buildTodos();
    } else {
        hideMainAndFooter();
    }

    input.addEventListener('keydown', createTodoRecord, false);
    todoListElement.addEventListener('change', markCompleted, false);
    document.addEventListener('click', deleteTodoRecord, false);

})(window);
