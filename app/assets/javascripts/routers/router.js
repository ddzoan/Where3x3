Where3x3.Routers.Router = Backbone.Router.extend({
  initialize: function(){
    this.$rootEl = $('#main');
    this.tournaments = new Where3x3.Collections.Tournaments();
  },

  routes: {
    '': 'landing',
    'search': 'search'
  },

  landing: function(){
    var view = new Where3x3.Views.LandingPage();
    this._swapView(view);
  },

  search: function(){
    var view = new Where3x3.Views.SearchPage({ collection: this.tournaments });
    this._swapView(view);
  },

  _swapView: function(view){
    if(this.currentView){
      this.currentView.remove();
    }
    this.currentView = view;
    this.$rootEl.html(view.render().$el);
  }
});
