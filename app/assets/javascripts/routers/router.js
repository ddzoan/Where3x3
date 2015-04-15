Where3x3.Routers.Router = Backbone.Router.extend({
  initialize: function(){
    this.$rootEl = $('#main');
    this.tournaments = new Where3x3.Collections.Tournaments();
  },

  routes: {
    '': 'landing',
    'search': 'search',
    'tournament/:id': 'tournamentShow',
    'create': 'create'
  },

  landing: function(){
    var view = new Where3x3.Views.LandingPage();
    this._swapView(view);
  },

  search: function(params){
    var view = new Where3x3.Views.SearchPage({
      collection: this.tournaments,
      search: params
    });
    this._swapView(view);
  },

  tournamentShow: function(id){
    var tournament = this.tournaments.getOrFetch(id);
    var view = new Where3x3.Views.TournamentShow({ model: tournament });
    this._swapView(view);
  },

  create: function(){
    var view = new Where3x3.Views.CreatePage({ collection: this.tournaments });
    this._swapView(view);
  },

  _swapView: function(view){
    if(this.currentView){
      this.currentView.remove();
    }
    this.currentView = view;
    this.$rootEl.html(view.$el);
    view.render();
  }
});
