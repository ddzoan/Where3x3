Where3x3.Views.MapShow = Backbone.View.extend({
  id: "map-canvas",

  initialize: function(options){
    this.mapOptions = options.map;
    this._map = new google.maps.Map(this.el, this.mapOptions);
    this._markers = {};
    this.listenTo(this.collection, 'add', this.addMarker);
    this.listenTo(this.collection, 'remove', this.removeMarker);
    this.listenTo(this.collection, 'reset', this.resetMarkers);
  },

  addMarker: function(tournament){
    if (this._markers[tournament.id]){ return; }
    var contentString = '<div id="content"><a href="/#tournament/' + tournament.get('id') + '">' +
      tournament.escape('name') + '</a></div>';
    var marker = new google.maps.Marker({
      position: { lat: Number(tournament.get('lat')), lng: Number(tournament.get('lng')) },
      map: this._map,
      animation: google.maps.Animation.DROP,
      content: contentString
    });

    google.maps.event.addListener(marker, 'click', function(event){
      this.showMarkerInfo(event, marker);
    }.bind(this));

    google.maps.event.addListener(this._map, 'click', this.closeInfoWindow.bind(this));

    this._markers[tournament.id] = marker;
  },

  removeMarker: function(tournament){
    var marker = this._markers[tournament.id];
    marker.setMap(null);
    delete this._markers[tournament.id];
  },

  closeInfoWindow: function(){
    if(this.infoWindow){
      this.infoWindow.close();
    }
  },

  showMarkerInfo: function (event, marker){
    this.closeInfoWindow();
    this.infoWindow = new google.maps.InfoWindow({
      content: marker.content
    });

    this.infoWindow.open(this._map, marker);
  },

  toggleBounce: function(id, turn_on){
    var marker = this._markers[id];
    if(turn_on){
      marker.setAnimation(google.maps.Animation.BOUNCE);
    } else {
      marker.setAnimation(null);
    }
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
