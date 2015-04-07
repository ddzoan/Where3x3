class CreateTournaments < ActiveRecord::Migration
  def change
    create_table :tournaments do |t|
      t.string :name, null: false
      t.integer :organizer_id, null: false
      t.integer :delegate_id, null: false
      t.string :location, null: false
      t.string :venue, null: false
      t.date :start_date, null: false
      t.date :end_date, null: false

      t.timestamps null: false
    end

    add_index :tournaments, :organizer_id
    add_index :tournaments, :delegate_id
  end
end
