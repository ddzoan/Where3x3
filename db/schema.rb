# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20150417170731) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "events", force: :cascade do |t|
    t.integer  "tournament_id",             null: false
    t.integer  "event_type",    default: 0, null: false
    t.datetime "created_at",                null: false
    t.datetime "updated_at",                null: false
  end

  add_index "events", ["tournament_id"], name: "index_events_on_tournament_id", using: :btree

  create_table "import_comps", id: false, force: :cascade do |t|
    t.string  "id",           limit: 32,  default: "", null: false
    t.string  "name",         limit: 50,  default: "", null: false
    t.string  "cityname",     limit: 50,  default: "", null: false
    t.string  "countryid",    limit: 50,  default: "", null: false
    t.text    "information"
    t.integer "year",         limit: 2,                null: false
    t.integer "month",        limit: 2,                null: false
    t.integer "day",          limit: 2,                null: false
    t.integer "endmonth",     limit: 2,                null: false
    t.integer "endday",       limit: 2,                null: false
    t.text    "eventspecs",                            null: false
    t.string  "wcadelegate",  limit: 240, default: "", null: false
    t.string  "organiser",    limit: 200, default: "", null: false
    t.string  "venue",        limit: 240, default: "", null: false
    t.string  "venueaddress", limit: 120
    t.string  "venuedetails", limit: 120
    t.string  "website",      limit: 200
    t.string  "cellname",     limit: 45,  default: "", null: false
    t.integer "latitude",                 default: 0,  null: false
    t.integer "longitude",                default: 0,  null: false
  end

  create_table "tournaments", force: :cascade do |t|
    t.string   "name",                                              null: false
    t.integer  "organizer_id",                                      null: false
    t.integer  "delegate_id"
    t.string   "location",                                          null: false
    t.string   "venue",                                             null: false
    t.date     "start_date",                                        null: false
    t.date     "end_date",                                          null: false
    t.datetime "created_at",                                        null: false
    t.datetime "updated_at",                                        null: false
    t.decimal  "lat",          precision: 10, scale: 6
    t.decimal  "lng",          precision: 10, scale: 6
    t.text     "description"
    t.integer  "price",                                 default: 0
    t.string   "events_code"
    t.string   "image_url"
  end

  add_index "tournaments", ["delegate_id"], name: "index_tournaments_on_delegate_id", using: :btree
  add_index "tournaments", ["organizer_id"], name: "index_tournaments_on_organizer_id", using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "fname",                           null: false
    t.string   "lname",                           null: false
    t.string   "email",                           null: false
    t.string   "password_digest",                 null: false
    t.string   "session_token"
    t.string   "wca_id"
    t.boolean  "delegate",        default: false
    t.text     "description"
    t.datetime "created_at",                      null: false
    t.datetime "updated_at",                      null: false
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["session_token"], name: "index_users_on_session_token", unique: true, using: :btree

end
