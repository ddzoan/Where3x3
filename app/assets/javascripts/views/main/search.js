Where3x3.Views.SearchPage = Backbone.CompositeView.extend({
  template: JST['main/search_page'],
  id: 'search',

  initialize: function(options){
    this.tournaments = this.collection;
    this.loc = options.search.loc;
    delete options.search.loc;
    this.tournaments.fetch({
      data: {
        search: options.search
      }
    });

    var index = new Where3x3.Views.TournamentIndex({
      collection: this.tournaments
    });
    this.addSubview('#tournament-browse', index);
    this.search = new Where3x3.Views.SearchBar({
      loc: this.loc,
      rad: options.search.rad,
      start_date: options.search.start,
      end_date: options.search.end
    });
    this.addSubview('.search', this.search);

    var lat = 37.781273; //default values if none specified
    var lng = -122.411463;
    if(options.search.lat !== ""){ lat = Number(options.search.lat); }
    if(options.search.lng !== ""){ lng = Number(options.search.lng); }

    this.map = new Where3x3.Views.MapShow({
      center: { lat: lat, lng: lng },
      zoom: 12
    });
    this.mapListener();
  },

  mapListener: function(){
    google.maps.event.addListener(this.map._map, 'idle', function(){
      var bounds = this.map.getBounds();
      var latBounds = [bounds.getSouthWest().lat(), bounds.getNorthEast().lat()];
      var lngBounds = [bounds.getSouthWest().lng(), bounds.getNorthEast().lng()];
      var formData = this.search.$el.serializeJSON();
      formData.lat_bounds = latBounds;
      formData.lng_bounds = lngBounds;
      this.fetchData(formData);
    }.bind(this));
  },

  fetchData: function(formData){
    this.loc = formData.loc;
    delete formData.loc;

    this.tournaments.reset();
    this.tournaments.fetch({
      data: {
        search: formData
      }
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
        this.map.centerMap(lat, lng);
        formData.lat = lat;
        formData.lng = lng;

        this.fetchData(formData);
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
        //     '&rad=' + formData.rad;
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
    this.map.render();

    return this;
  },

  remove: function(){
    Backbone.CompositeView.prototype.remove.call(this);
    this.map.remove();
  }
});

_.extend(Where3x3.Views.SearchPage.prototype, Where3x3.MapView);
