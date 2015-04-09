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
    var formData = this.$('form').serializeJSON();
    var search_w_params = 'search?loc=' + formData.loc + '&start=' +
      formData.start + '&end=' + formData.end + '&rad=' + formData.rad;
    Backbone.history.navigate(search_w_params, { trigger: true });
  }
});
