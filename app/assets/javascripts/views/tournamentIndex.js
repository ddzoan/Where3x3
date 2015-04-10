Where3x3.Views.TournamentIndex = Backbone.CompositeView.extend({
  template: JST['tournaments/index'],

  initialize: function(){
    this.listenTo(this.collection, 'add', this.addTournament);
    this.collection.each(this.addTournament.bind(this));
  },

  addTournament: function(tournament){
    var tournamentIndexItem = new Where3x3.Views.TournamentIndexItem({
      model: tournament
    });
    this.addSubview(".tournaments", tournamentIndexItem);
  },

  render: function(){
    var content = this.template({ tournaments: this.collection });
    this.$el.html(content);
    this.attachSubviews();
    return this;
  }
});
