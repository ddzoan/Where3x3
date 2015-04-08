Where3x3.Views.SearchPage = Backbone.CompositeView.extend({
  template: JST['main/search_page'],
  id: 'search',
  initialize: function(){
    this.tournaments = this.collection;
    this.tournaments.fetch();
    var view = new Where3x3.Views.TournamentIndex({ collection: this.tournaments });
    this.addSubview('#tournaments', view);
  },
  render: function(){
    var content = this.template();
    this.$el.html(content);
    this.attachSubviews();
    return this;
  }
});
