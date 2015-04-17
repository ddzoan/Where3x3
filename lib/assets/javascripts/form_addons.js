Where3x3.FormAddons = {
  attachDatePickers: function(offset){
    var end_date_box = $('input[name="end_date"]');
    $('input[name="start_date"]').datetimepicker({
      timepicker: false,
      format: 'm-d-Y',
      scrollInput: false,
      closeOnDateSelect: true,
      onChangeDateTime: function(dp, $input){
        var start_date = moment($input.val(), "MM-DD-YYYY");
        var plusOneYear = start_date.add(offset).format("MM-DD-YYYY");
        end_date_box.val(plusOneYear);
        end_date_box.focus();
      }
    });
    end_date_box.datetimepicker({
      timepicker: false,
      format: 'm-d-Y',
      closeOnDateSelect: true,
      scrollInput: false });
  },
  attachAutocomplete: function(placeChangedCallback){
    var locationBox = $('input#autocomplete')[0];
    this.autocomplete = new google.maps.places.Autocomplete(locationBox, { types: ['geocode'] });
    google.maps.event.addListener(this.autocomplete, 'place_changed', placeChangedCallback);
  },
};
