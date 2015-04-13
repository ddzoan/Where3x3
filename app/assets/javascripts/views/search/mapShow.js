Where3x3.Views.MapShow = Backbone.View.extend({
  id: "map-canvas",

  initialize: function(options){
    this.mapOptions = options.map;
    this._map = new google.maps.Map(this.el, this.mapOptions);
    this._markers = {};
    this.listenTo(this.collection, 'add', this.addMarker);
    this.listenTo(this.collection, 'reset', this.resetMarkers);
  },

  addMarker: function(tournament){
    if (this._markers[tournament.id]){ return; }
    var marker = new google.maps.Marker({
      position: { lat: Number(tournament.get('lat')), lng: Number(tournament.get('lng')) },
      map: this._map,
      title: tournament.get('name')
    });

    google.maps.event.addListener(marker, 'click', function (event) {
      this.showMarkerInfo(event, marker);
    }.bind(this));

    this._markers[tournament.id] = marker;
  },

  showMarkerInfo: function (event, marker) {
    var infoWindow = new google.maps.InfoWindow({
      content: marker.title
    });

    infoWindow.open(this._map, marker);
  },

  resetMarkers: function(){
    _(this._markers).each(function(marker){
      marker.setMap(null);
    });
    this._markers = {};
  },

  moveMap: function(lat, lng){
    this._map.panTo({ lat: lat, lng: lng });
    this._map.setZoom(9);
  },

  getBounds: function(){
    var bounds = this._map.getBounds();
    return bounds;
  }
});
