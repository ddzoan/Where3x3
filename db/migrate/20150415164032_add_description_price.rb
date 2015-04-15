class AddDescriptionPrice < ActiveRecord::Migration
  def change
    add_column :tournaments, :description, :text
    add_column :tournaments, :price, :integer, default: 0
  end
end
