Where3x3.Routers.Router = Backbone.Router.extend({
  initialize: function(){
    this.$rootEl = $('#tournaments');
    this.tournaments = new Where3x3.Collections.Tournaments();
  },

  routes: {
    '': 'tournamentIndex'
  },

  tournamentIndex: function(){
    this.tournaments.fetch();
    var view = new Where3x3.Views.TournamentIndex({ collection: this.tournaments });
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
