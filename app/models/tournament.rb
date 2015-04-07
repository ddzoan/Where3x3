# == Schema Information
#
# Table name: tournaments
#
#  id           :integer          not null, primary key
#  name         :string           not null
#  organizer_id :integer          not null
#  delegate_id  :integer          not null
#  location     :string           not null
#  venue        :string           not null
#  start_date   :date             not null
#  end_date     :date             not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#

class Tournament < ActiveRecord::Base
  validates :name, :organizer_id, :delegate_id, :location, :venue, presence: true
  validates :start_date, :end_date, presence: true
  validate :start_date_before_end_date

  has_many :events

  private

  def start_date_before_end_date
    if self.end_date < self.start_date
      errors[:end_date] << "can't be before start date"
    end
  end
end
