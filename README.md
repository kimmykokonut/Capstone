#  Foray Friends (name wip)
### by [Kim Robinson](https://github.com/kimmykokonut)

---------------------------
### Jump around!
* <a href="#about-the-project">About the Project</a>
* <a href="#description">Description</a>
* <a href="#built-with">Built With</a>
* <a href="#known-bugs">Known Bugs</a>
* <a href="#getting-started">Getting Started</a>
* <a href="#prerequisites">Prerequisites</a>
* <a href="#setup">Setup</a>
* <a href="#api-documentation">API Documention</a>
* <a href="#setup-client-side">Setup Client Side</a>
* <a href="#stretch-goals">Stretch Goals</a>
* <a href="#license">License</a>
* <a href="#acknowledgements">Acknowledgements</a>
---------------------------
### About the Project

### Description
describe here

### Built With
python, django, react, typescript, postgresql

### Known Bugs
* `POST /trips/10/register HTTP/1.1" 400` Once a user registers for a trip, the page disables the register button and lets then know they have registered for the trip.  If they navigate away from the page and back, it is the same.  If they refresh the page /trips/{id} right after they register, they are offered the registration button again and can sign up for the trip.  I have error handling in the api endpoint that won't allow the user to register twice and in react, an error message has been created to address this error. (if the user leaves the page and comes back, it is functional.)
* MushroomList: issue displaying image-console log says the cookie will expire. The issue is not related to storing the URLs, but to the same-origin policy of the browser, which restricts how resources loaded from different origins can interact.  Look into GoogleCloud Storage and django-storages library
* TripEditForm: works except for updating Permits
* Issue with state updating: after lottery closes, can navigate to dashboard but trip status is not updated unless I refresh the page, then it is fine.

Please [report](https://github.com/kimmykokonut/Capstone/issues) any issues or bugs 


### Getting Started

### Prerequisites

### Setup


notes:
Install Homebrew `/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"`

Install python 3 `$ brew install python@3`
download python.
clone project

create virtual env
`$ python3 -m venv .venv`

enter virtual env
`$ . .venv/bin/activate`

install dependencies
`$ pip install -r requirements.txt
run server (http://127.0.0.1:8000/)
`$ python manage.py runserver`

to exit virtual env
`$ . deactivate`

setupadmin?

#### Database

![Sql Relationship Diagram](./assets/diagrams/sql2.png)


### API Documention

```
/signup (post)
/login (post)
/logout (post)
/profile (get, put)-permission to authenticated user, coordinator and admin
/mushrooms (get, post)-all members. (put/delete in rest admin)
/trips (get-all members, post-admin/coordinator)
/trips/{id} (get-all members, put-admin/coordinator, delete-admin/coordinator)
/trips/{id}/register (post-user registers for trip, their token is their id)
/trips/{id}/results (get-get results of lottery and users' status on trip) 
```

### Setup Client Side
- This is a React App scaffolded with Vite using Typescript
- cd into client
- in terminal: 
  ```
  npm install
  npm run dev  
  ```
Local server will be at  `http://localhost:5173/`

### Stretch Goals

- there might be a bug if there is more than 1 coordinator in database for auto-email
- 100% line coverage for testing.  Haven't tested the actual lottery data because it is random-but testing passes for the right number of people chosen per category.
- make lottery weighted. might need more dummy users and more trips to test.
- add leaflet map component (ranger stations? trip locations?)
- data vis for ? # people applied on trips over time...
- google sign in functionality

### Notes to self
- should test.rest be in git or not?
- need to add listener for trip lottery to happen on reg_close date (right now an endpoint which will be a button for testing.)
- make pw stricter but not during testing
- better security: https at deploy
- in deploy: change views-login&signup: secure=False to TRUE once in https
- may need to rewrite tests now that i've switched from Token header auth to Cookie holding token in browser
** LEFT OFF: want to have user do full registration at sign in? 
- currently weather results are a 5 day forecast. i want when the trip closes, to have the weather for that date saved and displayed indefinitely and then hide the forecast


### License
GNU, see license.md for more information

### Acknowledgements
-----------------------------