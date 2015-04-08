Where3x3.Views.TournamentDetails = Backbone.CompositeView.extend({
  template: JST['main/tournament_show'],
  className: 'tournament',

  initialize: function(){
    this.listenTo(this.model, 'sync', this.render);
  },

  render: function(){
    var content = this.template({ tournament: this.model });
    this.$el.html(content);
    return this;
  }
});
