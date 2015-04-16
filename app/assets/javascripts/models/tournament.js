Where3x3.Models.Tournament = Backbone.Model.extend({
  urlRoot: '/api/tournaments',
  parse: function(response){
    if(response.events){
      this.events = response.events;
      delete response.events;
    }
    return response;
  }
});
