Where3x3.Views.EventsList = Backbone.CompositeView.extend({
  template: JST['tournaments/events_list'],
  initialize: function(){
    this.listenTo(this.model, 'sync', this.render);
  },
  render: function(){
    var content = this.template({ events: this.model.events, keys: this.keys() });
    this.$el.html(content);
    return this;
  }
});

_.extend(Where3x3.Views.EventsList.prototype, Where3x3.EventsView);
