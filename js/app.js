(function (window) {
    'use strict';

    var todoListElement = document.querySelectorAll('.todo-list')[0],
        todos = document.querySelectorAll('.todo-list li'),
        mainSection = document.querySelectorAll('.main')[0],
        footer = document.querySelectorAll('.footer')[0],
        input = document.querySelectorAll('.new-todo')[0];
    

    // console.log(input);

    if( todos.length === 0 ) {
        footer.style.display = 'none';
        mainSection.style.display = 'none';
    }

    input.onkeypress = function(e) {
        var event = e || window.event;
        var charCode = event.which || event.keyCode;

        if ( charCode == '13' ) {
            
            var template = '<li><div class="view"><input class="toggle" type="checkbox"><label>' + this.value + '<button class="destroy"></button></label></div></li>',
                todo = todoListElement.appendChild(document.createElement('li'));

            footer.style.display = 'block';
            mainSection.style.display = 'block';

            
            todo.innerHTML = template;
            this.value = '';
            console.log(this.value);

            // Enter pressed
            return false;
        }
    }

})(window);
