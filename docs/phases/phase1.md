# Phase 1: User Authentication, Browse Tournament List, Create New Tournaments

## Rails
### Models
* User
* Tournaments
* Events

### Controllers
* UsersController (create, new)
* SessionsController (create, new, destroy)
* Api::TournamentsController (create, show, index)

### Views
* tournaments/show.json.jbuilder

## Backbone
### Models
* Tournament

### Collections
* Tournament

### Views
* TournamentIndex
* TournamentIndexItem

## Gems/Libraries
