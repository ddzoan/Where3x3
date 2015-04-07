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

require 'test_helper'

class TournamentTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
