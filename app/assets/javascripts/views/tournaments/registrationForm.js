Where3x3.Views.RegistrationForm = Backbone.CompositeView.extend({
  template: JST['tournaments/registration_form'],
  tagName: 'form',
  events: {
    'submit': 'submit'
  },
  render: function(){
    var content = this.template();
    this.$el.html(content);
    return this;
  },
  submit: function(event){
    event.preventDefault();
    alert("You can't register for things yet :(");
  }
});
