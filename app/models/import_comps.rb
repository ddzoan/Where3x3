# == Schema Information
#
# Table name: import_comps
#
#  id           :string(32)       default(""), not null
#  name         :string(50)       default(""), not null
#  cityname     :string(50)       default(""), not null
#  countryid    :string(50)       default(""), not null
#  information  :text
#  year         :integer          not null
#  month        :integer          not null
#  day          :integer          not null
#  endmonth     :integer          not null
#  endday       :integer          not null
#  eventspecs   :text             not null
#  wcadelegate  :string(240)      default(""), not null
#  organiser    :string(200)      default(""), not null
#  venue        :string(240)      default(""), not null
#  venueaddress :string(120)
#  venuedetails :string(120)
#  website      :string(200)
#  cellname     :string(45)       default(""), not null
#  latitude     :integer          default(0), not null
#  longitude    :integer          default(0), not null
#

class ImportComps < ActiveRecord::Base
  def self.seed_tournaments
    Tournament.destroy_all
    ImportComps.all.each do |import|
      name = import.name
      location = "#{import.venueaddress} #{import.cityname} #{import.countryid}"
      venue = import.venue
      start_date = Date.new(import.year, import.month, import.day)
      end_date = Date.new(import.year, import.endmonth, import.endday)
      lat = import.latitude/1000000.0
      lng = import.longitude/1000000.0

      tourney = Tournament.create({
        name: name,
        organizer_id: 1,
        delegate_id: 1,
        location: location,
        venue: venue,
        start_date: start_date,
        end_date: end_date,
        lat: lat,
        lng: lng
      })

      import.eventspecs.split.each do |spec|
        case spec
        when "333"
          event_type = 0
        when "444"
          event_type = 1
        when "555"
          event_type = 2
        when "222"
          event_type = 3
        when "333bf"
          event_type = 4
        when "333oh"
          event_type = 5
        when "333fm"
          event_type = 6
        when "333ft"
          event_type = 7
        when "minx"
          event_type = 8
        when "pyram"
          event_type = 9
        when "sq1"
          event_type = 10
        when "clock"
          event_type = 11
        when "skewb"
          event_type = 12
        when "666"
          event_type = 13
        when "777"
          event_type = 14
        when "444bf"
          event_type = 15
        when "555bf"
          event_type = 16
        when "333mbf"
          event_type = 17
        when "magic"
          event_type = 18
        when "mmagic"
          event_type = 19
        else
          known_invalids = ["un3sbf", "333ni", "333bts", "snake", "mirbl", "222oh", "360", "333si", "333r3", "333ts"]
          unless known_invalids.include?(spec)
            debugger
          end

          next
          raise "invalid event type"
        end

        Event.create({ tournament_id: tourney.id, event_type: event_type })
      end
    end
  end
end
