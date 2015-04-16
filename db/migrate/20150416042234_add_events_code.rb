class AddEventsCode < ActiveRecord::Migration
  def change
    add_column :tournaments, :events_code, :string
  end
end
