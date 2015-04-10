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
    this.getAndSetLatLng(loc, { map: true });
  },
});

_.extend(Where3x3.Views.CreatePage.prototype, Where3x3.MapView);
