Where3x3.Collections.Tournaments = Backbone.Collection.extend({
  url: '/api/tournaments',
  model: Where3x3.Models.Tournament,
  comparator: 'start_date',
  getOrFetch: function(id){
    var tournament = this.get(id);
    if(!tournament){
      tournament = new Where3x3.Models.Tournament({ id: id });
      tournament.fetch({
        success: function(){
          this.add(tournament);
        }.bind(this)
      });
    } else {
      tournament.fetch();
    }
    return tournament;
  }
});
