Where3x3.Views.TournamentForm = Backbone.CompositeView.extend({
  template: JST['tournaments/form'],
  tagName: 'form',
  events: {
    'click .submit':'submit',
  },

  initialize: function(){
    this.listenTo(this.model, 'sync', this.render);
  },

  render: function(){
    var content = this.template({ tournament: this.model });
    this.$el.html(content);
    return this;
  },

  submit: function(event){
    event.preventDefault();
    var formData = this.$el.serializeJSON();
    //need to fetch lat and lng data here if user hasn't clicked on 'confirm on map'
    this.model.save(formData, {
      success: function(model){
        this.collection.add(model, { merge: true });
        Backbone.history.navigate('tournament/' + model.id, { trigger: true });
      }.bind(this)
    });
  }
});
