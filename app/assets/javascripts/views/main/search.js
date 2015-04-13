Where3x3.Views.SearchPage = Backbone.CompositeView.extend({
  template: JST['main/search_page'],
  id: 'search',

  initialize: function(options){
    this.tournaments = this.collection;
    this.loc = options.search.loc;

    this.index = new Where3x3.Views.TournamentIndex({
      collection: this.tournaments
    });
    this.addSubview('#tournament-browse', this.index);
    this.search = new Where3x3.Views.SearchBar({
      loc: this.loc,
      start_date: options.search.start,
      end_date: options.search.end
    });
    this.addSubview('.search', this.search);

    var lat = 37.781273; //default values if none specified
    var lng = -122.411463;
    var zoom = 2;
    if(options.search.lat !== "" && options.search.lng !== ""){
      lat = Number(options.search.lat);
      lng = Number(options.search.lng);
      zoom = 9;
    }

    this.map = new Where3x3.Views.MapShow({
      collection: this.tournaments,
      map: {
        center: { lat: lat, lng: lng },
        zoom: zoom
      }
    });
    this.mapListener();
  },

  mapListener: function(){
    google.maps.event.addListener(this.map._map, 'idle', function(){
      var formData = this.search.$el.serializeJSON();
      this.fetchDataInMap(formData);
    }.bind(this));
  },

  fetchDataInMap: function(formData){
    var bounds = this.map.getBounds();
    var latBounds = [bounds.getSouthWest().lat(), bounds.getNorthEast().lat()];
    var lngBounds = [bounds.getSouthWest().lng(), bounds.getNorthEast().lng()];

    // if map is zoomed out to more than one earth, set longitude range to max
    if(bounds.getSouthWest().lng() > bounds.getNorthEast().lng()){
      formData.lng_bounds = [-180, 180];
    } else {
      formData.lng_bounds = lngBounds;
    }
    formData.lat_bounds = latBounds;

    this.loc = formData.loc;
    delete formData.loc;

    this.tournaments.reset();
    this.tournaments.fetch({
      data: {
        search: formData
      },
      error: function(){
        this.index.$('.tournaments').html('Something went wrong...');
      }.bind(this)
    });
  },

  attachAutocomplete: function(){
    var locationBox = $('input#autocomplete')[0];
    var autocomplete = new google.maps.places.Autocomplete(locationBox, { types: ['geocode'] });
    google.maps.event.addListener(autocomplete, 'place_changed', function(){
      var place = autocomplete.getPlace();
      var formData = this.search.$el.serializeJSON();

      if(place.geometry){
        var lat = place.geometry.location.lat();
        var lng = place.geometry.location.lng();
        this.map.moveMap(lat, lng);
        formData.lat = lat;
        formData.lng = lng;

        this.fetchDataInMap(formData);
      } else {
        // use geocode to search name

        // this.getLatLng(place.name, function(resp){
        //   var lat = resp.results[0].geometry.location.lat;
        //   var lng = resp.results[0].geometry.location.lng;
        //   var search_w_params = 'search?loc=' + formData.loc +
        //     '&start=' + formData.start +
        //     '&end=' + formData.end +
        //     '&lat=' + lat +
        //     '&lng=' + lng +
        //   Backbone.history.navigate(search_w_params, { trigger: true });
        // });
      }
    }.bind(this));
  },


  render: function(){
    var content = this.template();
    this.$el.html(content);
    this.attachSubviews();
    this.attachAutocomplete();

    this.$('#map').html(this.map.$el);
    google.maps.event.trigger(this.map._map, 'resize');

    return this;
  },

  remove: function(){
    Backbone.CompositeView.prototype.remove.call(this);
    this.map.remove();
  }
});

_.extend(Where3x3.Views.SearchPage.prototype, Where3x3.MapView);
