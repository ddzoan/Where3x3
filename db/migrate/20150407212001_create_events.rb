class CreateEvents < ActiveRecord::Migration
  def change
    create_table :events do |t|
      t.integer :tournament_id, null: false
      t.integer :event_type, default: 0, null: false

      t.timestamps null: false
    end

    add_index :events, :tournament_id
  end
end
