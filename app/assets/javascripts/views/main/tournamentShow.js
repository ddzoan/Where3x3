Where3x3.Views.TournamentShow = Backbone.CompositeView.extend({
  template: JST['main/tournament_show'],
  className: 'tournament-details',

  initialize: function(){
    this.listenTo(this.model, 'sync', this.render);

    var regForm = new Where3x3.Views.RegistrationForm({ model: this.model });
    this.addSubview('.reg-form', regForm);

    var eventsList = new Where3x3.Views.EventsList({ model: this.model });
    this.addSubview('.events-list', eventsList);
  },

  affixFormPanel: function(){
    this.$('.panel').affix({
      offset: { top: 470 }
    });
  },

  render: function(){
    var venue = this.parseLink(this.model.escape('venue'));
    var description = this.model.escape('description') ?
      this.parseLink(this.model.escape('description')) :
      "This tournament does not have a description.";
    var content = this.template({
      tournament: this.model,
      venue: venue,
      description: description
    });
    this.$el.html(content);
    this.affixFormPanel();
    this.attachSubviews();
    this.showStaticMap(this.model.get('lat'), this.model.get('lng'), { size: '640'});
    return this;
  },

  parseLink: function(text){
    var regex = /\[\{(.*)\}\{(.*)\}\]/;
    var match = regex.exec(text);
    if(match){
      return '<a href="' + match[2] + '">' + match[1] + '</a>';
    } else {
      return text;
    }
  },

});

_.extend(Where3x3.Views.TournamentShow.prototype, Where3x3.MapView);
