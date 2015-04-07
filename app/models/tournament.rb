class Tournament < ActiveRecord::Base
  validates :name, :organizer_id, :delegate_id, :location, :venue, presence: true
  validates :start_date, :end_date, presence: true
  validate :start_date_before_end_date

  private

  def start_date_before_end_date
    if this.end_date < this.start_date
      errors[:end_date] << "can't be before start_date"
    end
  end
end
