Where3x3.Views.SearchBar = Backbone.CompositeView.extend({
  template: JST['search/search_bar'],
  tagName: 'form',

  initialize: function(options){
    this.loc = options.loc;
  },

  render: function(){
    var content = this.template({ loc: this.loc });
    this.$el.html(content);
    return this;
  }
});
