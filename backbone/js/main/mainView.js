var TodoApp = (function (TodoApp) {
	TodoApp = TodoApp || {};	
	
	TodoApp.views = TodoApp.views || {};	

	TodoApp.views.MainView = Backbone.View.extend({
		template: '<!-- underscore template for input -->',

		events: {
			//add click event handler with to call this.onAddTodoClick 
		},

		initialize: function () {
		},

		render: function () {
			//call compile of underscore template
			return this.$el;
		},

		onAddTodoClick: function () {
			console.log('clicked');
		}
	});

	return TodoApp;
})(TodoApp);