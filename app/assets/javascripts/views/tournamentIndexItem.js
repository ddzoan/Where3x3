Where3x3.Views.TournamentIndexItem = Backbone.CompositeView.extend({
  template: JST['tournaments/indexItem'],
  tagName: 'li',
  className: 'tournament',
  events: {
    'click': 'tournamentShow'
  },

  render: function(){
    var venue = this.parseVenue();
    var content = this.template({ tournament: this.model, venue: venue });
    this.$el.html(content);
    return this;
  },

  parseVenue: function(){
    var regex = /\[\{(.*)\}\{(.*)\}\]/;
    var match = regex.exec(this.model.escape('venue'));
    if(match){
      return match[1];
    } else {
      return this.model.escape('venue');
    }
  },

  tournamentShow: function(event){
    Backbone.history.navigate('tournament/' + this.model.id, { trigger: true });
  }
});
