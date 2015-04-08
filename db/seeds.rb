#  fname           :string           not null
#  lname           :string           not null
#  email           :string           not null
#  password_digest :string           not null
#  session_token   :string
#  wca_id          :string
#  delegate        :boolean          default(FALSE)
#  description     :text

dan = User.create({
  fname: 'Dan',
  lname: 'Dzoan',
  email: 'ddz',
  password: 'asdfasdf',
  wca_id: '2006DZOA03'
})
ty = User.create({
  fname: 'Tyson',
  lname: 'Mao',
  email: 'tmao',
  password: 'asdfasdf',
  wca_id: '2004MAOT02',

})
jeremy = User.create({
  fname: 'Jeremy',
  lname: 'Flei',
  email: 'flei',
  password: 'asdfasdf',
  wca_id: '2005FLEI01',
  delegate: true
})
berkeley_spring = Tournament.create({
  name: "Berkeley Spring 2015",
  organizer_id: dan.id,
  delegate_id: jeremy.id,
  location: "UC Berkeley, Berkeley, California, USA",
  venue: "UC Berkeley",
  start_date: Date.new(2015, 4, 12),
  end_date: Date.new(2015, 4, 12)
})
us_nats = Tournament.create({
  name: "US Nationals 2015",
  organizer_id: ty.id,
  delegate_id: ty.id,
  location: "40 Folly Field Rd, Hilton Head Island, SC 29928",
  venue: "hilton head resort",
  start_date: Date.new(2015, 7, 31),
  end_date: Date.new(2015, 8, 2),
})
sf = Tournament.create({
  name: "SF Tournament 2015",
  organizer_id: dan.id,
  delegate_id: jeremy.id,
  location: "The Warfield San Francisco, California, USA",
  venue: "The Warfield",
  start_date: Date.new(2015, 4, 30),
  end_date: Date.new(2015, 4, 30)
})
wc = Tournament.create({
  name: "World Championships 2015",
  organizer_id: dan.id,
  delegate_id: jeremy.id,
  location: "Rua Vergueiro, 1987, Sao Paulo, Brazil",
  venue: "ETAPA",
  start_date: Date.new(2015, 7, 17),
  end_date: Date.new(2015, 7, 19)
})
