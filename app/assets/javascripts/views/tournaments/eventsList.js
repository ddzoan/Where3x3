Where3x3.Views.EventsList = Backbone.CompositeView.extend({
  template: JST['tournaments/events_list'],
  initialize: function(){
    this.listenTo(this.model, 'sync', this.render);
  },
  render: function(){
    var keys = {
      '333': '3x3x3',
      '444': '4x4x4',
      '555': '5x5x5',
      '222': '2x2x2',
      '333bf': '3x3x3 Blindfolded',
      '333oh': '3x3x3 One Handed',
      '333fm': '3x3x3 Fewest Moves',
      '333ft': '3x3x3 With Feet',
      'minx': 'Megaminx',
      'pyram': 'Pyraminx',
      'sq1': 'Square-1',
      'clock': 'Rubik\'s Clock',
      'skewb': 'Skewb',
      '666': '6x6x6',
      '777': '7x7x7',
      '444bf': '4x4x4 Blindfolded',
      '555bf': '5x5x5 Blindfolded',
      '333mbf': '3x3x3 Multi-Blind'
    };
    var content = this.template({ events: this.model.events, keys: keys });
    this.$el.html(content);
    return this;
  }
});
