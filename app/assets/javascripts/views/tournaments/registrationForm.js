Where3x3.Views.RegistrationForm = Backbone.CompositeView.extend({
  template: JST['tournaments/registration_form'],
  tagName: 'form',
  events: {
    'submit': 'submit'
  },
  initialize: function(){
    this.listenTo(this.model, 'sync', this.render);
  },
  render: function(){
    var content = this.template({ events: this.model.events, keys: this.keys() });
    this.$el.html(content);
    return this;
  },
  submit: function(event){
    event.preventDefault();
    alert("You can't register for things yet :(");
  }
});

_.extend(Where3x3.Views.RegistrationForm.prototype, Where3x3.EventsView);
