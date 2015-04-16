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
      self.import_comp(import)
    end
  end

  def self.import_comp(import)
    name = import.name
    location = "#{import.venueaddress} #{import.cityname} #{import.countryid}"
    description = import.information
    venue = import.venue
    start_date = Date.new(import.year, import.month, import.day)
    end_date = Date.new(import.year, import.endmonth, import.endday)
    lat = import.latitude/1000000.0
    lng = import.longitude/1000000.0

    events_code = self.generate_code(import.eventspecs)

    tourney = Tournament.create({
      name: name,
      organizer_id: 1,
      delegate_id: 1,
      location: location,
      description: description,
      venue: venue,
      start_date: start_date,
      end_date: end_date,
      lat: lat,
      lng: lng,
      events_code: events_code
    })
  end

  def self.generate_code(eventspecs)
    code = ""

    code += '0' if(/\b333\b/ =~ eventspecs)
    code += '1' if(/\b444\b/ =~ eventspecs)
    code += '2' if(/\b555\b/ =~ eventspecs)
    code += '3' if(/\b222\b/ =~ eventspecs)
    code += '4' if(/\b333bf\b/ =~ eventspecs)
    code += '5' if(/\b333oh\b/ =~ eventspecs)
    code += '6' if(/\b333fm\b/ =~ eventspecs)
    code += '7' if(/\b333ft\b/ =~ eventspecs)
    code += '8' if(/\bminx\b/ =~ eventspecs)
    code += '9' if(/\bpyram\b/ =~ eventspecs)
    code += 'A' if(/\bsq1\b/ =~ eventspecs)
    code += 'B' if(/\bclock\b/ =~ eventspecs)
    code += 'C' if(/\bskewb\b/ =~ eventspecs)
    code += 'D' if(/\b666\b/ =~ eventspecs)
    code += 'E' if(/\b777\b/ =~ eventspecs)
    code += 'F' if(/\b444bf\b/ =~ eventspecs)
    code += 'G' if(/\b555bf\b/ =~ eventspecs)
    code += 'H' if(/\b333mbf\b/ =~ eventspecs)
    code += 'I' if(/\bmagic\b/ =~ eventspecs)
    code += 'J' if(/\bmmagic\b/ =~ eventspecs)

    code
  end
end
