Where3x3.Views.CreatePage = Backbone.CompositeView.extend({
  template: JST['main/create_page'],
  events: {
    'click .refresh': 'refreshMap'
  },
  initialize: function(){
    var tournament = new Where3x3.Models.Tournament();
    var form = new Where3x3.Views.TournamentForm({ model: tournament, collection: this.collection });
    this.addSubview('.form', form);
  },
  render: function(){
    var content = this.template({ model: this.model });
    this.$el.html(content);
    this.attachSubviews();
    return this;
  },
  refreshMap: function(event){
    event.preventDefault();
    var loc = this.$('form input[name="location"]').val();
    $.ajax({
      url: 'https://maps.googleapis.com/maps/api/geocode/json',
      data: {
        key: 'AIzaSyB8pqPpYhPhCttU1OnLJY_qcbFOpWagtZM',
        address: loc
      },
      success: function(resp){
        var center = this.getAndSetLatLng(resp);
        this.showMap(center);
      }.bind(this)
    });
  },
  getAndSetLatLng: function(resp){
    var lat = resp.results[0].geometry.location.lat;
    var lng = resp.results[0].geometry.location.lng;
    this.$('input[name="lat"]').val(lat);
    this.$('input[name="lng"]').val(lng);
    return [lat, lng];
  },
  showMap: function(center){
    var $imgurl = $('<img>');
    var latlon = center[0] + ',' + center[1];
    var key = "key=AIzaSyB8pqPpYhPhCttU1OnLJY_qcbFOpWagtZM";
    $imgurl.attr('src', 'https://maps.googleapis.com/maps/api/staticmap?center=' + latlon + '&' + key + '&zoom=16&size=640x640&markers=color:red%7Clabel:C%7C' + latlon);
    this.$('.map').html($imgurl);
  }
});
