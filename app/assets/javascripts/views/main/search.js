Where3x3.Views.SearchPage = Backbone.CompositeView.extend({
  template: JST['main/search_page'],

  id: 'search',

  initialize: function(options){
    this.tournaments = this.collection;
      delete options.search.loc;
      this.tournaments.fetch({
        data: {
          search: options.search
        }
      });

    var index = new Where3x3.Views.TournamentIndex({
      collection: this.tournaments
    });
    this.addSubview('#tournament-browse', index);

    var loc = new Where3x3.Views.SearchBar({
      loc: options.search.loc,
      rad: options.search.rad,
      start_date: options.search.start,
      end_date: options.search.end
    });
    this.addSubview('.search', loc);

    var lat = 37.781273; //default values if none specified
    var lng = -122.411463;
    if(options.search.lat !== ""){ lat = Number(options.search.lat); }
    if(options.search.lng !== ""){ lng = Number(options.search.lng); }

    this.map = new Where3x3.Views.MapShow({
      center: { lat: lat, lng: lng },
      zoom: 12
    });
  },

  attachAutocomplete: function(){
    var locationBox = $('input#autocomplete')[0];
    var autocomplete = new google.maps.places.Autocomplete(locationBox, { types: ['geocode'] });
    google.maps.event.addListener(autocomplete, 'place_changed', function(){
      var place = autocomplete.getPlace();
      console.log('do search');
      console.log('render map');
      var lat = place.geometry.location.lat();
      var lng = place.geometry.location.lng();
    });
  },


  render: function(){
    var content = this.template();
    this.$el.html(content);
    this.attachSubviews();
    this.attachAutocomplete();

    this.$('#map').html(this.map.$el);
    this.map.render();

    return this;
  },

  remove: function(){
    Backbone.CompositeView.prototype.remove.call(this);
    this.map.remove();
  }
});
