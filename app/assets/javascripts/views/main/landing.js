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
    if(formData.loc){
      this.getLatLng(formData.loc, function(resp){
        var lat = resp.results[0].geometry.location.lat;
        var lng = resp.results[0].geometry.location.lng;
        var search_w_params = 'search?loc=' + formData.loc +
          '&start=' + formData.start +
          '&end=' + formData.end +
          '&lat=' + lat +
          '&lng=' + lng +
          '&rad=' + formData.rad;
        Backbone.history.navigate(search_w_params, { trigger: true });
      });
    } else {
      var search_w_params = 'search?loc=' + formData.loc +
        '&start=' + formData.start +
        '&end=' + formData.end +
        '&rad=' + formData.rad;
      Backbone.history.navigate(search_w_params, { trigger: true });
    }
  }
});

_.extend(Where3x3.Views.LandingPage.prototype, Where3x3.MapView);
