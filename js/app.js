(function (window) {
    'use strict';

    var todoListElement = document.querySelectorAll('.todo-list')[0],
        todos = document.querySelectorAll('.todo-list li'),
        mainSection = document.querySelectorAll('.main')[0],
        footer = document.querySelectorAll('.footer')[0],
        input = document.querySelectorAll('.new-todo')[0],
        ENTER_KEY_CODE = 13;

    function isEmptyString(string) {
    	var sym = /^\s*$/.test(string);
    	return !sym;
    }
    
    if( todos.length === 0 ) {
        footer.style.display = 'none';
        mainSection.style.display = 'none';
    }

    input.onkeypress = function(event) {
        var charCode = event.keyCode;
        

        if ( charCode === ENTER_KEY_CODE && isEmptyString(this.value) ) {

        	var todoBody = this.value.trim(),
        	template = '<li><div class="view"><input class="toggle" type="checkbox"><label>' + todoBody + '<button class="destroy"></button></label></div></li>',
            todo = todoListElement.appendChild(document.createElement('li'));        	

            footer.style.display = 'block';
            mainSection.style.display = 'block';
            
            todo.innerHTML = template;
            this.value = '';
        }
    }	

})(window);
