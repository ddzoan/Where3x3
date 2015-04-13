Where3x3.Views.MapShow = Backbone.View.extend({
  id: "map-canvas",

  initialize: function(options){
    this.mapOptions = options;
    this._map = new google.maps.Map(this.el, this.mapOptions);
  },

  centerMap: function(lat, lng){
    this._map.setCenter({ lat: lat, lng: lng });
  },

  getBounds: function(){
    var bounds = this._map.getBounds();
    return bounds;
  }
});
