Where3x3.Views.TournamentIndexItem = Backbone.CompositeView.extend({
  template: JST['tournaments/indexItem'],
  tagName: 'li',
  render: function(){
    var content = this.template({ tournament: this.model });
    this.$el.html(content);
    return this;
  }
});
