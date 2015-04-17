class AddNotNullConstraint < ActiveRecord::Migration
  def change
    change_column :tournaments, :events_code, :string, null: false, default: ''
  end
end
