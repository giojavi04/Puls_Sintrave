$(document).ready(function(){
	console.log('Starting app');

	window.ponyExpress = new PonyExpress({
		io : window.location.origin
	});
	window.collections.articles = new Pulse.Collections.ArticlesCollection();

	window.ponyExpress.bind('connect', function(){
		window.plugs.article = new PonyExpress.BackbonePlug({
			collection : window.collections.articles
		});	
	});

	window.views.articleNew = new Pulse.Views.ArticleNewView( $('#contenido > aside') );

	window.collections.articles.on('add', function(model){
		var view = new Pulse.Views.ArticleView(model);

		view.render();

		view.$el.appendTo("#contenido");
	});

	window.routers = new Pulse.Routers.BaseRouter();

	var xhr = $.get('/articles/all');

	xhr.done(function(data){
		console.log(data);

		data.forEach(function(articles){
			window.collections.articles.add(articles);
		});

		Backbone.history.start({
			root : "/",
			pushState : true,
			silent : false
		});
	});

	$('nav li:first').on('click', function(){
		Backbone.history.navigate('', {trigger: true});
	});

});