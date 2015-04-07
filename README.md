# Where3x3

[Heroku link][heroku]

[heroku]: https://where3x3.herokuapp.com/

## Minimum Viable Product
Where3x3 is a clone of AirBnb built on Rails and Backbone used to find Rubik's cube tournaments. Users can:

<!-- This is a Markdown checklist. Use it to keep track of your progress! -->

- [ ] Create accounts
- [ ] Create sessions (log in)
- [ ] Browse tournaments
- [ ] Create tournaments
- [ ] Sign up for tournaments
- [ ] Search for tournaments by location/date
- [ ] View past tournaments

## Design Docs
* [View Wireframes][views]
* [DB schema][schema]

[views]: ./docs/views.md
[schema]: ./docs/schema.md

## Implementation Timeline

### Phase 1: User Authentication, Browse Tournament List, Create New Tournaments (~1 day)
I will implement user authentication in Rails based on the practices learned at
App Academy. Users will be able to sign up for accounts and log in. I will create
API routes to create a new tournament and to get all tournaments.

[Details][phase-one]

### Phase 2: Viewing Tournament Index and Tournament show page (~2 days)
Use backbone to create the list view page and the tournament details view.

[Details][phase-two]

### Phase 3: Search (~1 day)
Implement search by location and by date range on the server side.

[Details][phase-three]

### Phase 4: Google Maps API (~2 days)
Integrate google maps API with search results

[Details][phase-four]

### Phase 5: User Profile Page (~1 day)
Create user profile page with details and profile image

[Details][phase-five]

### Bonus Features (TBD)
- [ ] Comments on tournaments and user pages
- [ ] Pagination/infinite scroll
- [ ] Custom tournament urls
- [ ] Notifications (new tournaments nearby)
- [ ] User avatars

[phase-one]: ./docs/phases/phase1.md
[phase-two]: ./docs/phases/phase2.md
[phase-three]: ./docs/phases/phase3.md
[phase-four]: ./docs/phases/phase4.md
[phase-five]: ./docs/phases/phase5.md
