Where3x3.Views.SearchPage = Backbone.CompositeView.extend({
  template: JST['main/search_page'],

  id: 'search',

  initialize: function(options){
    this.tournaments = this.collection;
    if(options.search.loc !== ""){
      this.extractLocation({ search: options.search });
    } else {
      delete options.search.loc;
      this.tournaments.fetch({
        data: {
          search: options.search
        }
      });
    }

    var index = new Where3x3.Views.TournamentIndex({
      collection: this.tournaments
    });
    this.addSubview('#tournament-browse', index);

    var loc = new Where3x3.Views.SearchBar({
      loc: options.search.loc,
      rad: options.search.rad
    });
    this.addSubview('.location', loc);

    var dates = new Where3x3.Views.DateBar({
      start_date: options.search.start,
      end_date: options.search.end
    });
    this.addSubview('.dates', dates);

    var default_lat = 37.781273;
    var default_lng = -122.411463;

    this.map = new Where3x3.Views.MapShow({
      center: { lat: default_lat, lng: default_lng },
      zoom: 12
    });
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
