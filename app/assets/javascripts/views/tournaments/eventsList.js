Where3x3.Views.EventsList = Backbone.CompositeView.extend({
  template: JST['tournaments/events_list'],
  initialize: function(options){
    // this.events = options.events;
  },
  render: function(){
    var content = this.template(); // will pass it events later
    this.$el.html(content);
    return this;
  }
});
