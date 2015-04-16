json.(@tournament, :name, :location, :venue, :start_date, :end_date, :lat, :lng)
json.events(@tournament.events)
json.organizer(@tournament.organizer)
json.delegate(@tournament.delegate)
