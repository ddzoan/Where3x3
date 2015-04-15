Where3x3.Views.TournamentShow = Backbone.CompositeView.extend({
  template: JST['main/tournament_show'],
  className: 'tournament-details',
  events: {
    'submit': 'register'
  },

  initialize: function(){
    this.listenTo(this.model, 'sync', this.render);
  },

  register: function(event){
    event.preventDefault();
    alert("Can't sign up for stuff yet :(");
  },

  render: function(){
    var content = this.template({ tournament: this.model });
    this.$el.html(content);
    this.showStaticMap(this.model.get('lat'), this.model.get('lng'));
    return this;
  }
});

_.extend(Where3x3.Views.TournamentShow.prototype, Where3x3.MapView);
