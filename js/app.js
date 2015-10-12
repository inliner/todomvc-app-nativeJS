(function (window) {
    'use strict';

    var todoListElement = document.querySelectorAll('.todo-list')[0],
        todos = document.querySelectorAll('.todo-list li'),
        mainSection = document.querySelectorAll('.main')[0],
        footer = document.querySelectorAll('.footer')[0],
        input = document.querySelectorAll('.new-todo')[0];

    function isEmptyString(string) {
    	var sym = /^\s*$/.test(string);
    	if (sym){
    		return false;
    	} else {
    		return true;
    	}
    }
    

    // console.log(!!parseInt('  '));

    if( todos.length === 0 ) {
        footer.style.display = 'none';
        mainSection.style.display = 'none';
    }

    input.onkeypress = function(e) {
        var event = e || window.event;
        var charCode = event.which || event.keyCode;

        if ( charCode == '13' ) {
            if (isEmptyString(this.value)) {
            	var todoBody = this.value.trim(),
	            	template = '<li><div class="view"><input class="toggle" type="checkbox"><label>' + todoBody + '<button class="destroy"></button></label></div></li>',
	                todo = todoListElement.appendChild(document.createElement('li'));

	            footer.style.display = 'block';
	            mainSection.style.display = 'block';

	            
	            todo.innerHTML = template;
	            this.value = '';

	            // Enter pressed
	            return false;
            }
        }
    }

})(window);
