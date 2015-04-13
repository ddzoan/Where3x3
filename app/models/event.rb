# == Schema Information
#
# Table name: events
#
#  id            :integer          not null, primary key
#  tournament_id :integer          not null
#  event_type    :integer          default(0), not null
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#

class Event < ActiveRecord::Base
  enum event_type: [:e3x3, :e4x4, :e5x5, :e2x2, :bld, :oh, :fm, :feet, :minx, :pyramix, :sq1, :clock, :skewb, :e6x6, :e7x7, :bld4, :bld5, :multibld, :magic, :mmagic]

  validates :tournament_id, :event_type, presence: true

  belongs_to :tournament
end
