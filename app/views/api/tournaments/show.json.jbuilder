json.(@tournament, :id, :name, :location, :venue, :start_date, :end_date, :lat, :lng, :description, :price)
json.events(@tournament.events)
json.organizer(@tournament.organizer)
json.delegate(@tournament.delegate)
