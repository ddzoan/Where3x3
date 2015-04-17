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
  getStaticMapUrl: function(lat, lng, options){
    var latlng = lat + ',' + lng;
    var key = "&key=AIzaSyB8pqPpYhPhCttU1OnLJY_qcbFOpWagtZM";
    var scale = options.scale ? '&scale=' + options.scale : '';
    var zoom = '&zoom=15';
    var size = options.size ? '&size=' + options.size + 'x' + options.size : '';
    var marker = '&markers=color:red%7Clabel:C%7C' + latlng;

    var url = 'https://maps.googleapis.com/maps/api/staticmap?center=';
    url += latlng;
    url += key;
    url += zoom;
    url += size;
    url += scale;
    url += marker;
    return url;
  },
  showStaticMap: function(lat, lng, options){
    var $imgurl = $('<img>');
    var url = this.getStaticMapUrl(lat, lng, options);

    $imgurl.attr('src', url);
    this.$('.static-map').html($imgurl);
  }
};
