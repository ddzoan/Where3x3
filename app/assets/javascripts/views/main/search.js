Where3x3.Views.SearchPage = Backbone.CompositeView.extend({
  template: JST['main/search_page'],
  id: 'search',
  events: {
    'change #autocomplete': 'clearLocationForm',
    'mouseover .tournament': 'toggleBounce',
    'mouseout .tournament': 'toggleBounce'
  },

  initialize: function(options){
    this.tournaments = this.collection;

    this.index = new Where3x3.Views.TournamentIndex({
      collection: this.tournaments
    });
    this.addSubview('#tournament-browse', this.index);

    this.setOptions(options);

    this.search = new Where3x3.Views.SearchBar({
      loc: this.loc,
      start_date: this.start_date,
      end_date: this.end_date
    });
    this.addSubview('.search', this.search);
    this.map = new Where3x3.Views.MapShow({
      collection: this.tournaments,
      map: {
        center: { lat: this.lat, lng: this.lng },
        zoom: this.zoom
      }
    });
    this.mapListener();
  },

  setOptions: function(options){
    // Default options for search bar params
    this.loc = "";
    this.start_date = "";
    this.end_date = "";

    // Default map values if none specified
    this.lat = 37.781273;
    this.lng = -122.411463;
    this.zoom = 2;

    if(options.search){
      this.loc = options.search.loc;
      this.start_date = options.search.start;
      this.end_date = options.search.end;

      if(options.search.lat !== "" && options.search.lng !== ""){
        this.lat = Number(options.search.lat);
        this.lng = Number(options.search.lng);
        this.zoom = 8;
      }
    }
  },

  mapListener: function(){
    google.maps.event.addListener(this.map._map, 'idle', function(){
      var formData = this.search.$el.serializeJSON();
      this.fetchDataInMap(formData);
    }.bind(this));
  },

  updateTournaments: function(){
    var formData = this.search.$el.serializeJSON();
    if(!(formData.start_date === this.start_date && formData.end === this.end_date )){
      this.fetchDataInMap(formData);
    }
  },

  fetchDataInMap: function(formData){
    var bounds = this.map.getBounds();
    var latBounds = [bounds.getSouthWest().lat(), bounds.getNorthEast().lat()];
    var lngBounds = [bounds.getSouthWest().lng(), bounds.getNorthEast().lng()];

    formData.lng_bounds = lngBounds;
    formData.lat_bounds = latBounds;

    this.loc = formData.loc;
    delete formData.loc;

    this.updateUrl(formData);
    this.tournaments.fetch({
      data: {
        search: formData
      },
      error: function(){
        this.index.$('.tournaments').html('Something went wrong...');
      }.bind(this)
    });
  },

  updateUrl: function(formData){
    var search_w_params = 'search?loc=' + this.loc +
      '&start=' + formData.start_date +
      '&end=' + formData.end_date +
      '&lat=' + (formData.lat || '') +
      '&lng=' + (formData.lng || '');
    Backbone.history.navigate(search_w_params);
  },

  toggleBounce: function(event){
    var id = $(event.currentTarget).data('id');
    if(event.type === "mouseover"){
      this.map.toggleBounce(id, true);
    } else {
      this.map.toggleBounce(id, false);
    }
  },

  placeChanged: function(){
    var place = this.autocomplete.getPlace();
    var formData = this.search.$el.serializeJSON();

    if(place.geometry){
      this.lat = place.geometry.location.lat();
      this.lng = place.geometry.location.lng();
      this.map._map.fitBounds(place.geometry.viewport);
      formData.lat = this.lat;
      formData.lng = this.lng;
      this.$('input[name="lat"]').val(place.geometry.location.lat());
      this.$('input[name="lng"]').val(place.geometry.location.lng());

      this.fetchDataInMap(formData);
    } else {
      if(formData.loc === ""){
        this.clearLocationForm();
      }
      // use geocode to search name

      // this.getLatLng(place.name, function(resp){
      //   var lat = resp.results[0].geometry.location.lat;
      //   var lng = resp.results[0].geometry.location.lng;
      //   var search_w_params = 'search?loc=' + formData.loc +
      //     '&start=' + formData.start_date +
      //     '&end=' + formData.end_date +
      //     '&lat=' + lat +
      //     '&lng=' + lng +
      //   Backbone.history.navigate(search_w_params, { trigger: true });
      // });
    }
  },

  clearLocationForm: function(){
    console.log("clearform");
    var formData = this.search.$el.serializeJSON();
    this.loc = '';
    this.$('input[name="lat"]').val('');
    this.$('input[name="lng"]').val('');
    this.map._map.setZoom(2);
    formData.lat = "";
    formData.lng = "";
    this.updateUrl(formData);
  },

  render: function(){
    var content = this.template();
    this.$el.html(content);
    this.attachSubviews();
    this.attachAutocomplete(this.placeChanged.bind(this));
    this.attachDatePickers({
      offset: {years: 1},
      endDateCallback: function(){
        this.updateTournaments();
      }.bind(this)
    });

    this.$('#map').html(this.map.$el);
    google.maps.event.trigger(this.map._map, 'resize');
    this.map._map.setCenter({ lat: this.lat, lng: this.lng });

    return this;
  },

  remove: function(){
    Backbone.CompositeView.prototype.remove.call(this);
    this.map.remove();
  }
});

_.extend(Where3x3.Views.SearchPage.prototype, Where3x3.MapView);
_.extend(Where3x3.Views.SearchPage.prototype, Where3x3.FormAddons);
