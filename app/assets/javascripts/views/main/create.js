Where3x3.Views.CreatePage = Backbone.CompositeView.extend({
  template: JST['main/create_page'],

  initialize: function(){
    var tournament = new Where3x3.Models.Tournament();
    var form = new Where3x3.Views.TournamentForm({ model: tournament, collection: this.collection });
    this.addSubview('.form', form);
  },
  render: function(){
    var content = this.template({ model: this.model });
    this.$el.html(content);
    this.attachSubviews();
    this.attachAutocomplete();
    return this;
  },
  attachAutocomplete: function(){
    var locationBox = $('input#autocomplete')[0];
    var autocomplete = new google.maps.places.Autocomplete(locationBox, { types: ['geocode'] });
    google.maps.event.addListener(autocomplete, 'place_changed', function(){
      var place = autocomplete.getPlace();
      if(place.geometry){
        var lat = place.geometry.location.lat();
        var lng = place.geometry.location.lng();
        this.$('input[name="lat"]').val(lat);
        this.$('input[name="lng"]').val(lng);
        this.showStaticMap(lat, lng);
      }
    }.bind(this));
  }
});

_.extend(Where3x3.Views.CreatePage.prototype, Where3x3.MapView);
