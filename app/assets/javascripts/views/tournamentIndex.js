Where3x3.Views.TournamentIndex = Backbone.CompositeView.extend({
  template: JST['tournaments/index'],

  initialize: function(){
    this.listenTo(this.collection, 'add', this.addTournament);
    this.listenTo(this.collection, 'remove', this.removeTournament);

    this.listenTo(this.collection, 'reset', this.removeAll);

    this.collection.each(this.addTournament.bind(this));
  },

  addTournament: function(tournament){
    var tournamentIndexItem = new Where3x3.Views.TournamentIndexItem({
      model: tournament,
      attributes: { 'data-id': tournament.id }
    });
    this.addSubview('.tournaments', tournamentIndexItem);
  },

  removeTournament: function(tournament){
    var selector = '.tournaments';
    var subviews = this.subviews(selector);
    var i = _(subviews).findIndex(function(el){
      return el.model === tournament;
    });
    subviews[i].remove();
    subviews.splice(i, 1);
  },

  removeAll: function(){
    _(this.subviews('.tournaments')).each(function(subview){
      subview.remove();
    });
    this.$('.tournaments').html('');
  },

  render: function(){
    var content = this.template({ tournaments: this.collection });
    this.$el.html(content);
    this.attachSubviews();
    return this;
  }
});
