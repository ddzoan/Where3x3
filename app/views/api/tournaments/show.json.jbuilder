json.(@tournament, :name, :organizer_id, :delegate_id, :location, :venue, :start_date, :end_date)
json.events(@tournament.events, :event_type)
