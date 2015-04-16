json.array! @tournaments do |tournament|
  json.id tournament.id
  json.name tournament.name
  json.location tournament.location
  json.venue tournament.venue
  json.start_date tournament.start_date
  json.end_date tournament.end_date
  json.lat tournament.lat
  json.lng tournament.lng
  json.description tournament.description
  json.price tournament.price
  json.events tournament.events

  json.organizer tournament.organizer
  json.delegate tournament.delegate
end
