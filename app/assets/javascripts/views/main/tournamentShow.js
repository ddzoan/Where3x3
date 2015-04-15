Where3x3.Views.TournamentShow = Backbone.CompositeView.extend({
  template: JST['main/tournament_show'],
  className: 'tournament-details',

  initialize: function(){
    this.listenTo(this.model, 'sync', this.render);

    var regForm = new Where3x3.Views.RegistrationForm();
    this.addSubview('.reg-form', regForm);

    // Will need to pass events in later
    var eventsList = new Where3x3.Views.EventsList();
    this.addSubview('.events-list', eventsList);
  },

  render: function(){
    var content = this.template({ tournament: this.model });
    this.$el.html(content);
    this.attachSubviews();
    this.showStaticMap(this.model.get('lat'), this.model.get('lng'));
    return this;
  }
});

_.extend(Where3x3.Views.TournamentShow.prototype, Where3x3.MapView);
