Where3x3.FormAddons = {
  attachDatePickers: function(){
    $('input[name="start_date"]').datetimepicker({ timepicker: false, format: 'm-d-Y' });
    $('input[name="end_date"]').datetimepicker({ timepicker: false, format: 'm-d-Y' });
  },
  attachAutocomplete: function(placeChangedCallback){
    var locationBox = $('input#autocomplete')[0];
    this.autocomplete = new google.maps.places.Autocomplete(locationBox, { types: ['geocode'] });
    google.maps.event.addListener(this.autocomplete, 'place_changed', placeChangedCallback);
  },
};
