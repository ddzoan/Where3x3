Where3x3.Views.TournamentIndex = Backbone.CompositeView.extend({
  template: JST['tournaments/index'],

  initialize: function(){
    this.listenTo(this.collection, 'add', this.addTournament);
    this.listenTo(this.collection, 'reset', this.removeTournaments);

    this.collection.each(this.addTournament.bind(this));
  },

  addTournament: function(tournament){
    var tournamentIndexItem = new Where3x3.Views.TournamentIndexItem({
      model: tournament
    });
    this.addSubview(".tournaments", tournamentIndexItem);
  },

  removeTournaments: function(){
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
