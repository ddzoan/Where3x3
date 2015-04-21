Where3x3.Views.SearchBar = Backbone.CompositeView.extend({
  template: JST['search/search_bar'],
  tagName: 'form',

  initialize: function(options){
    this.loc = options.loc;
    this.start_date = options.start_date;
    this.end_date = options.end_date;
  },

  render: function(){
    var content = this.template({
      loc: this.loc,
      start_date: this.start_date,
      end_date: this.end_date
    });
    this.$el.html(content);
    return this;
  }
});
