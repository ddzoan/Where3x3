json.(@tournament, :name, :location, :venue, :start_date, :end_date)
json.events(@tournament.events, :event_type)
json.organizer(@tournament.organizer)
json.delegate(@tournament.delegate)
