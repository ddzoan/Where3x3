Where3x3.Views.DateBar = Backbone.CompositeView.extend({
  template: JST['search/date_bar'],
  tagName: 'form',
  className: 'form-inline',

  initialize: function(options){
    this.start_date = options.start_date;
    this.end_date = options.end_date;
  },

  render: function(){
    var content = this.template({ start_date: this.start_date, end_date: this.end_date });
    this.$el.html(content);
    return this;
  }
});
