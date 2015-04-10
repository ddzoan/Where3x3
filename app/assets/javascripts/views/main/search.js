Where3x3.Views.SearchPage = Backbone.CompositeView.extend({
  template: JST['main/search_page'],
  id: 'search',
  initialize: function(params){
    this.tournaments = new Where3x3.Collections.Tournaments();
    if(params.search.loc !== ""){
      this.extractLocation(params);
    } else {
      this.tournaments.fetch({ data: params });
    }
    var view = new Where3x3.Views.TournamentIndex({ collection: this.tournaments });
    this.addSubview('#tournament-browse', view);
  },
  extractLocation: function(params){
    this.getLatLng(params.search.loc, function(resp){
      var lat = resp.results[0].geometry.location.lat;
      var lng = resp.results[0].geometry.location.lng;
      var center = [lat, lng];
      delete params.search.loc;
      params.search.center = center;
      this.tournaments.fetch({ data: params });
    }.bind(this));
  },
  render: function(){
    var content = this.template();
    this.$el.html(content);
    this.attachSubviews();
    return this;
  }
});

_.extend(Where3x3.Views.SearchPage.prototype, Where3x3.MapView);
