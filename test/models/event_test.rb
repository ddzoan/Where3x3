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

require 'test_helper'

class EventTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
