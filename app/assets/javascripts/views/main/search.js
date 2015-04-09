Where3x3.Views.SearchPage = Backbone.CompositeView.extend({
  template: JST['main/search_page'],
  id: 'search',
  initialize: function(search_params){
    this.tournaments = new Where3x3.Collections.Tournaments();
    this.tournaments.fetch({ data: search_params });
    var view = new Where3x3.Views.TournamentIndex({ collection: this.tournaments });
    this.addSubview('#tournament-browse', view);
  },
  render: function(){
    var content = this.template();
    this.$el.html(content);
    this.attachSubviews();
    return this;
  }
});
