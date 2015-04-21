Where3x3.Views.EventsList = Backbone.CompositeView.extend({
  template: JST['tournaments/events_list'],
  events: {
    'click .expand-events': 'showAll'
  },
  initialize: function(){
    this.listenTo(this.model, 'sync', this.render);
  },

  showAll: function(event){
    console.log("showall event");
    this.$('.some').css('display', 'none');
    this.$('.all').show("slow");
  },

  render: function(){
    var content = this.template({ events: this.model.events, events_hash: this.events_hash() });
    this.$el.html(content);
    return this;
  }
});

_.extend(Where3x3.Views.EventsList.prototype, Where3x3.EventsView);
