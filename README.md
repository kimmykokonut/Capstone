#  Foray Friends (name wip)
### by [Kim Robinson](https://github.com/kimmykokonut)

---------------------------
### Jump around!* <a href="#about">About the Project</a>
  * <a href="#description">Description</a>
  * <a href="#built-with">Built With</a>
  * <a href="#known-bugs">Known Bugs</a>
* <a href="#getting-started">Getting Started</a>
  * <a href="#prerequisites">Prerequisites</a>
  * <a href="#setup">Setup</a>
* <a href="#api-documentation">API Documention</a>
  * <a href="#user-authentication">User Authentication & Authorization</a>
  * <a href="#api-endpoints">API Endpoints</a>
* <a href="#miscellaneous">Miscellaneous</a>
  * <a href="#license">License</a>
  * <a href="#acknowledgements">Acknowledgements</a>
  * <a href="#stretch-goals">Stretch Goals</a>
  * <a href="#contact">Contact</a>
---------------------------
### About the Project

### Description

Myco Matrix API allows users to register and sign in to their own account as well as edit their profile information, register for upcoming field trips and access resources such as packing lists and parking and foraging permits needed by location.  Administrators and users within the Coordinator group can create, edit and delete field trips and manually run the lottery, which randomizes registrants and assigns them their trip status (accepted, waitlisted, rejected).  The automated lottery function emails the registrants their status once the lottery is complete and emails the trip leader the group's contact information.  There is also a mushroom model in the database with a many to many relationship with trips, with a stretch goal for users to attach mushrooms seen on specific field trips.  This API utilizes RESTful principles and uses Token Authentication for user authentication and authorization.  Tokens are stored in browser cookies.

### Built With
python, django, react, typescript, postgresql
![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)
![Django](https://img.shields.io/badge/django-%23092E20.svg?style=for-the-badge&logo=django&logoColor=white)
![DjangoREST](https://img.shields.io/badge/DJANGO-REST-ff1709?style=for-the-badge&logo=django&logoColor=white&color=ff1709&labelColor=gray)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![Markdown](https://img.shields.io/badge/Markdown-000000?style=for-the-badge&logo=markdown&logoColor=white)
![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)
![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white)
* Psycopg2
* Python Decouple
* Django CORS Headers
* SMTP Email Backend
* Testing: Django TestCase class

### Known Bugs 
* None known for WebAPI

_Please [report](https://github.com/kimmykokonut/Capstone/issues) any issues or bugs_ 

### Getting Started

### Prerequisites

#### Install Postman
(Optional) Download and install [Postman] to test API calls(https://www.postman.com/downloads/).
(Optional) Download and install VS Code [RestClient extension](https://marketplace.visualstudio.com/items?itemName=humao.rest-client)

#### Code Editor
  To view or edit the code, you will need a code editor or text editor. The open-source code editor we used is VisualStudio Code.

  1) Code Editor Download: [VisualStudio Code](https://www.npmjs.com/)
  2) Click the download most applicable to your OS and system.
  3) Wait for download to complete, then install -- Windows will run the setup exe and macOS will drag and drop into applications.


### Known Bugs 
* `POST /trips/10/register HTTP/1.1" 400` Once a user registers for a trip, the page disables the register button and lets then know they have registered for the trip.  If they navigate away from the page and back, it is the same.  If they refresh the page /trips/{id} right after they register, they are offered the registration button again and can sign up for the trip.  I have error handling in the api endpoint that won't allow the user to register twice and in react, an error message has been created to address this error. (if the user leaves the page and comes back, it is functional.)
* MushroomList: issue displaying image-console log says the cookie will expire. The issue is not related to storing the URLs, but to the same-origin policy of the browser, which restricts how resources loaded from different origins can interact.  Look into GoogleCloud Storage and django-storages library
* Issue with state updating: after lottery closes, can navigate to dashboard but trip status is not updated unless I refresh the page, then it is fine.
* Chrome console warning: Reading cookie in cross-site context will be blocked in future Chrome versions. Once deployed in https, try: cookie = "name=value; SameSite=None; Secure";  (currently: response.set_cookie('auth_token', token.key, httponly=True, samesite='None', secure=True))

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