var TodoApp = (function (TodoApp) {
	TodoApp = TodoApp || {};	
	
	TodoApp.views = TodoApp.views || {};	

	TodoApp.views.MainView = Backbone.View.extend({
		template: _.template('<!-- underscore template for input --><form><input type="text" class="todo-input"><button type="submit" class="add-button">Add todo</button></form>'),

		events: {
			//add click event handler with to call this.onAddTodoClick
			'click .add-button': 'onAddTodoClick'
		},

		initialize: function () {
		},

		render: function () {
			//call compile of underscore template
			this.$el.html(this.template());
			return this.$el;
		},

		onAddTodoClick: function (e) {
			
			e.preventDefault();

			console.log('clicked');
		}
	});


	return TodoApp;
})(TodoApp);


