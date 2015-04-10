# == Schema Information
#
# Table name: tournaments
#
#  id           :integer          not null, primary key
#  name         :string           not null
#  organizer_id :integer          not null
#  delegate_id  :integer
#  location     :string           not null
#  venue        :string           not null
#  start_date   :date             not null
#  end_date     :date             not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  lat          :decimal(10, 6)
#  lng          :decimal(10, 6)
#

class Tournament < ActiveRecord::Base
  validates :name, :organizer_id, :location, :venue, presence: true
  validates :start_date, :end_date, presence: true
  validate :start_date_before_end_date

  has_many :events, dependent: :destroy
  belongs_to :organizer, class_name: 'User'
  belongs_to :delegate, class_name: 'User'

  acts_as_mappable :default_units => :miles,
                   :default_formula => :sphere,
                   :distance_field_name => :distance,
                   :lat_column_name => :lat,
                   :lng_column_name => :lng

  def self.create_with_all_events(params)
    tournament = Tournament.create(params)
    18.times do |i|
      Event.create({ tournament_id: tournament.id, event_type: i})
    end
    tournament
  end

  def self.geocode_all
    Tournament.all.each do |tournament|
      unless tournament.lat && tournament.lng
        tournament.get_getcode

        sleep 0.3 # api key limited to 5 requests per second
      end
    end
  end

  def get_geocode
    resp = RestClient.get("https://maps.googleapis.com/maps/api/geocode/json",
      { params: {
          address: tournament.location,
          key: 'AIzaSyB8pqPpYhPhCttU1OnLJY_qcbFOpWagtZM'
      }
    })
    json = JSON.parse(resp)
    if json['status'] == 'OK'
      tournament.lat = json['results'][0]['geometry']['location']['lat']
      tournament.lng = json['results'][0]['geometry']['location']['lng']
      tournament.save
    else
      puts json['status']
    end
  end

  private

  def start_date_before_end_date
    if self.end_date < self.start_date
      errors[:end_date] << "can't be before start date"
    end
  end
end
