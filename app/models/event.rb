class Event < ActiveRecord::Base
  validates :tournament_id, :event_type, presence: true
  validates :event_type, inclusion: { in: Event.event_types.keys }

  enum event_type: [:e3x3, :e4x4, :e5x5, :e2x2, :bld, :oh, :fm, :feet, :minx, :pyramix, :sq1, :clock, :skewb, :e6x6, :e7x7, :bld4, :bld5, :multibld]
end
