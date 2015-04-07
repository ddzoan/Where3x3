class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :fname, null: false
      t.string :lname, null: false
      t.string :email, null: false
      t.string :password_digest, null: false
      t.string :session_token
      t.string :wca_id
      t.boolean :delegate, default: false
      t.text :description

      t.timestamps null: false
    end

    add_index :users, :session_token, unique: true
    add_index :users, :email,  unique: true
  end
end
