Where3x3.FormAddons = {
  attachDatePickers: function(options){
    if(!options){
      options = {};
    }
    var end_date_box = $('input[name="end_date"]');
    $('input[name="start_date"]').datetimepicker({
      timepicker: false,
      format: 'm-d-Y',
      scrollInput: false,
      closeOnDateSelect: true,
      onChangeDateTime: function(dp, $input){
        var start_date = moment($input.val(), "MM-DD-YYYY");
        var plusOffset = start_date.add(options.offset).format("MM-DD-YYYY");
        end_date_box.val(plusOffset);
        end_date_box.focus();
      }
    });
    end_date_box.datetimepicker({
      timepicker: false,
      format: 'm-d-Y',
      closeOnDateSelect: true,
      scrollInput: false,
      onChangeDateTime: options.endDateCallback
    });
  },
  attachAutocomplete: function(placeChangedCallback){
    var locationBox = $('input#autocomplete');
    // need to use locationBox[0] because it needs dom element, not jquery obj
    this.autocomplete = new google.maps.places.Autocomplete(locationBox[0], { types: ['geocode'] });
    google.maps.event.addListener(this.autocomplete, 'place_changed', placeChangedCallback);

    locationBox.keydown(function(e){
      if (e.which == 13 && $('.pac-container:visible').length) {
        google.maps.event.trigger(autocomplete, 'place_changed');
        return false;
      }
    });
  },
};
