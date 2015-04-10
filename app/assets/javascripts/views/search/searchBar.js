Where3x3.Views.SearchBar = Backbone.CompositeView.extend({
  template: JST['search/search_bar'],
  tagName: 'form',
  className: 'form-inline',

  initialize: function(options){
    this.loc = options.loc;
    this.rad = options.rad;
  },

  render: function(){
    var content = this.template({ loc: this.loc, rad: this.rad });
    this.$el.html(content);
    return this;
  }
});
