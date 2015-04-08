# Where3x3

[Heroku link][heroku]

[heroku]: https://where3x3.herokuapp.com/

## Minimum Viable Product
Where3x3 is a clone of AirBnb built on Rails and Backbone used to find Rubik's cube tournaments. Users can:

<!-- This is a Markdown checklist. Use it to keep track of your progress! -->

- [x] Create accounts
- [ ] Create sessions (log in) (only single session implemented)
- [x] Browse all tournaments
- [ ] View tournament
- [ ] Search for tournaments by location/date
- [ ] Sign up for tournaments
- [ ] Create tournaments
- [ ] View past tournaments

## Design Docs
* [View Wireframes][views]
* [DB schema][schema]

[views]: ./docs/views.md
[schema]: ./docs/schema.md

## Implementation Timeline

### Phase 1: User Authentication, Browse Tournament Index (~1 day)
I will implement user authentication in Rails based on the practices learned at
App Academy. Users will be able to sign up for accounts and log in. I will create
API routes to return the tournament index and show routes. Backbone will be used
to display the views for the main search page with the tournaments on the left
side.

[Details][phase-one]

### Phase 2: Tournament show page (~0.5 days)
Use backbone to create the tournament details view page.

[Details][phase-two]

### Phase 3: Search (~1.5 days)
Implement search by location and by date range on the server side.

[Details][phase-three]

### Phase 4: Google Maps API (~2 days)
Integrate google maps API with search results

[Details][phase-four]

### Phase 5: User Profile Page (~1 day)
Create user profile page with details and profile image

[Details][phase-five]

### Bonus Features (TBD)
- [ ] Super awesome Rubik's Cube CSS transitions (if possible?)
- [ ] Comments on tournaments and user pages
- [ ] Pagination/infinite scroll
- [ ] Custom tournament urls
- [ ] Notifications (new tournaments nearby)
- [ ] User avatars
- [ ] Tournament photos

[phase-one]: ./docs/phases/phase1.md
[phase-two]: ./docs/phases/phase2.md
[phase-three]: ./docs/phases/phase3.md
[phase-four]: ./docs/phases/phase4.md
[phase-five]: ./docs/phases/phase5.md
