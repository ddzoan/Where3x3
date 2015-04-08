Where3x3.Views.TournamentIndexItem = Backbone.CompositeView.extend({
  template: JST['tournaments/indexItem'],
  tagName: 'li',
  events: {
    'click': 'tournamentShow'
  },

  render: function(){
    var content = this.template({ tournament: this.model });
    this.$el.html(content);
    return this;
  },

  tournamentShow: function(event){
    Backbone.history.navigate('tournament/' + this.model.id, { trigger: true });
  }
});
