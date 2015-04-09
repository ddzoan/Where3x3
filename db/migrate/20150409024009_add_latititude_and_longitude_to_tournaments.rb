class AddLatititudeAndLongitudeToTournaments < ActiveRecord::Migration
  def change
    add_column :tournaments, :lat, :decimal, { precision: 10, scale: 6 }
    add_column :tournaments, :lng, :decimal, { precision: 10, scale: 6 }
  end
end
