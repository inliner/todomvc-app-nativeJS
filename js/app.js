
(function (window) {
    'use strict';

    var todoList = JSON.parse(localStorage.getItem('storeTodo')) || [],
        todoListElement = document.querySelector('.todo-list'),
        todos = document.querySelectorAll('.todo-list li'),
        mainSection = document.querySelector('.main'),
        footer = document.querySelector('.footer'),
        input = document.querySelector('.new-todo'),
        toggle = todoListElement.querySelectorAll('.toggle'),
        todoCount = footer.querySelector('.todo-count strong'),
        deleteElement = document.querySelectorAll('destroy'),
        ENTER_KEY_CODE = 13;

    function createTodoRecord(id, txt, completed) {
        this.id = id;
        this.txt = txt;
        this.completed = completed;
    };

    function updateTodoRecord(record, newTxt, newCompleted) {
        record.txt = newTxt;
        record.completed = !!newCompleted;
    };

    function arrayObjectIndexOf(myArray, property, searchTerm) {
        for(var i = 0, len = myArray.length; i < len; i++) {
            if (myArray[i][property] === searchTerm) return i;
        }
        return -1;
    }

    var markCompleted = function(event) {
        var todoCountValue = parseInt(todoCount.innerHTML),
            todoContainer = $parent(event.target, 'li'),
            todoTxt = todoContainer.textContent,
            recordIndex = arrayObjectIndexOf(todoList, 'txt', todoTxt);

        

        

        todoContainer.classList.toggle('completed');

        
        if ( todoContainer.classList.contains('completed') ) {

            updateTodoRecord(todoList[recordIndex], todoTxt, true);

        }

        var countCompeleted = function() {
            for(var i = 0, j = 0, len = todoList.length; i < len; i++) {
                if (todoList[i]['completed'] === true) {j++}
                return j;
            }
        };

        console.log(countCompeleted());
        console.log(todoList);



        // var countCompeleted = todoList.filter(function (item) {
        // 	return item.completed
        // }).length;

        todoCount.innerHTML = countCompeleted();


        // console.log(todoList);
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

    function hasClass(el, className) { // classList.contains ( String )
        if (el.classList) {
            return el.classList.contains(className);
        }
        else {
            return new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className); // It does nothing...
        }
    };

    function showMainAndFooter() {
        footer.classList.remove('hidden');
        mainSection.classList.remove('hidden');
    };

    function hideMainAndFooter() {
        footer.classList.add('hidden');
        mainSection.classList.add('hidden');
    };

    function buildTodos() {
        todoList.forEach ( function(elem, index, array) {
            // console.log(elem, index, array);
            var template = '<div class="view"><input class="toggle" type="checkbox"><label>' + elem.txt + '<button class="destroy"></button></label></div>',
                todo = todoListElement.appendChild(document.createElement('li'));

            todo.innerHTML = template;
            todoCount.innerHTML = todoList.length;
        });
    };



    if ( todoList.length ) { // if we have todos in LS on page load
        
        showMainAndFooter();
        buildTodos();
        
    } else {
        hideMainAndFooter();
    }

    input.onkeypress = function(event) {
        var charCode = event.keyCode,
            inputField = this,
            val = inputField.value.trim(),
            todoRecord = {},
        	template,
            todo,
            todoString;        	
        

        if ( charCode === ENTER_KEY_CODE && val ) {

            todoRecord = new createTodoRecord(todoList.length + 1, val, false);

        	template = '<div class="view"><input class="toggle" type="checkbox"><label>%%<button class="destroy"></button></label></div>';
        	var result = template.replace(/%%/g, val),
                todo = todoListElement.appendChild(document.createElement('li'));

            showMainAndFooter();
            
            todoList.push(todoRecord); // add new todo to todoList array
            todo.innerHTML = result;
            inputField.value = '';
            todoCount.innerHTML = todoList.length;
            todoString = JSON.stringify(todoList);

            localStorage.setItem('storeTodo', todoString);

            console.log(todoList);

            // console.log(localStorage.getItem('storeTodo'));
        }
    };

    todoListElement.addEventListener('change', markCompleted, false);

    var deleteTodo = function () {

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
                hideMainAndFooter();
            }
        }

    };

    document.addEventListener('click', deleteTodo, false);

})(window);
