Where3x3.MapView = {
  getLatLng: function(location, callback){
    $.ajax({
      url: 'https://maps.googleapis.com/maps/api/geocode/json',
      data: {
        key: 'AIzaSyB8pqPpYhPhCttU1OnLJY_qcbFOpWagtZM',
        address: location
      },
      success: function(resp){
        callback(resp);
      }
    });
  },
  getAndSetLatLng: function(location, options){
    this.getLatLng(location, function(resp){
      var lat = resp.results[0].geometry.location.lat;
      var lng = resp.results[0].geometry.location.lng;
      this.$('input[name="lat"]').val(lat);
      this.$('input[name="lng"]').val(lng);
      if(options.map){
        this.showStaticMap(lat, lng);
      }
    }.bind(this));
  },
  showStaticMap: function(lat, lng){
    var $imgurl = $('<img>');
    var latlng = lat + ',' + lng;
    var key = "key=AIzaSyB8pqPpYhPhCttU1OnLJY_qcbFOpWagtZM";
    $imgurl.attr('src', 'https://maps.googleapis.com/maps/api/staticmap?center=' + latlng + '&' + key + '&zoom=15&size=640x640&markers=color:red%7Clabel:C%7C' + latlng);
    this.$('.static-map').html($imgurl);
  }
};
