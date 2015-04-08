Where3x3.Views.LandingPage = Backbone.CompositeView.extend({
  template: JST['main/landing_page'],
  id: 'landing',
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
    Backbone.history.navigate('search', { trigger: true });
  }
});
