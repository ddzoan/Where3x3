Where3x3.Views.TournamentIndex = Backbone.CompositeView.extend({
  template: JST['tournaments/index'],
  initialize: function(){
    this.listenTo(this.collection, 'sync', this.render);
  },
  render: function(){
    var content = this.template({ tournaments: this.collection });
    this.$el.html(content);
    this.collection.each(function(tournament){
      var tournamentIndexItem = new Where3x3.Views.TournamentIndexItem({
        model: tournament
      });
      this.addSubview('.tournaments', tournamentIndexItem);
    }.bind(this));
    return this;
  }
});
