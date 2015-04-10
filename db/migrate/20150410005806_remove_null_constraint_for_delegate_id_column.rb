class RemoveNullConstraintForDelegateIdColumn < ActiveRecord::Migration
  def change
    change_column :tournaments, :delegate_id, :integer, :null => true
  end
end
