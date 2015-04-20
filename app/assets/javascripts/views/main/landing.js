Where3x3.Views.LandingPage = Backbone.CompositeView.extend({
  template: JST['main/landing_page'],
  id: 'landing',
  events: {
    'submit': 'submit'
  },

  render: function(){
    var content = this.template();
    this.$el.html(content);
    this.attachAutocomplete(function(){
      var place = this.autocomplete.getPlace();
      $('input[name="lat"]').val(place.geometry.location.lat());
      $('input[name="lng"]').val(place.geometry.location.lng());
    }.bind(this));
    this.attachDatePickers({ offest: {years: 1} });

    this.$('#submit').tooltip('show');
    return this;
  },

  submit: function(event){
    event.preventDefault();
    var formData = this.$('form').serializeJSON();
    if(formData.loc && formData.lat === "" && formData.lng === ""){
      this.getLatLng(formData.loc, function(resp){
        var lat = resp.results[0].geometry.location.lat;
        var lng = resp.results[0].geometry.location.lng;
        var search_w_params = 'search?loc=' + formData.loc +
          '&start=' + formData.start_date +
          '&end=' + formData.end_date +
          '&lat=' + lat +
          '&lng=' + lng;
        Backbone.history.navigate(search_w_params, { trigger: true });
      });
    } else {
      var search_w_params = 'search?loc=' + formData.loc +
        '&start=' + formData.start_date +
        '&end=' + formData.end_date +
        '&lat=' + formData.lat +
        '&lng=' + formData.lng;
      Backbone.history.navigate(search_w_params, { trigger: true });
    }
  }
});

_.extend(Where3x3.Views.LandingPage.prototype, Where3x3.MapView);
_.extend(Where3x3.Views.LandingPage.prototype, Where3x3.FormAddons);
