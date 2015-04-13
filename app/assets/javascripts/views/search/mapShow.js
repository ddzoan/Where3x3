Where3x3.Views.MapShow = Backbone.View.extend({
  id: "map-canvas",

  initialize: function(options){
    this.mapOptions = options;
    this._map = new google.maps.Map(this.el, this.mapOptions);
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
