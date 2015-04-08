window.Where3x3 = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    new Where3x3.Routers.Router();
    Backbone.history.start();
  }
};

$(document).ready(function(){
  Where3x3.initialize();
});
