#  Web API Backend - Myco Matrix

<hr />

### by [Kim Robinson](https://github.com/kimmykokonut)

Initiated April 15, 2024

---------------------------
### Jump around!

[Return to main README](../README.md) for General information and setup instructions

* <a href="#about-the-project">About the Project</a>
  * <a href="#description">Description</a>
  * <a href="#built-with">Built With</a>
  * <a href="#known-bugs">Known Bugs</a>
* <a href="#api-documentation">API Documention</a>
  * <a href="#using-django-admin">Using Django Admin</a>
  * <a href="#postgresql-database-diagram">PostgreSQL Database Diagram</a>
  * <a href="#user-authentication">User Authentication & Authorization</a>
  * <a href="#api-endpoints">API Endpoints</a>
* <a href="#miscellaneous">Miscellaneous</a>
  * <a href="#stretch-goals">Stretch Goals</a>
  * <a href="#contact">Contact</a>
---------------------------
### About the Project

### Description

Myco Matrix API allows users to register and sign in to their own account as well as edit their profile information, register for upcoming field trips and access resources such as packing lists and parking and foraging permits needed by location.  Administrators and users within the Coordinator group can create, edit and delete field trips and manually run the lottery, which randomizes registrants and assigns them their trip status (accepted, waitlisted, rejected).  The automated lottery function emails the registrants their status once the lottery is complete and emails the trip leader the group's contact information.  There is also a mushroom model in the database with a many to many relationship with trips, with a stretch goal for users to attach mushrooms seen on specific field trips.  This API utilizes RESTful principles and uses Token Authentication for user authentication and authorization.  Tokens are stored in browser cookies.

### Built With
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
* Possible bug if there is more than 1 coordinator in database for auto-email, haven't tested


_Please [report](https://github.com/kimmykokonut/Capstone/issues) any issues or bugs_ 

---

### API Documention

Explore the API endpoints in Postman, RestClient or Django Admin

### Using Django Admin

<div style="text-align: center">
  <img src="../assets/diagrams/screenshots/django-admin.png" alt="Django Admin Screenshot" width="500" >
</div>

Django Admin [Documentation](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Django/Admin_site)

1. The admin.py file is already setup, you need to create a superuser. Navigate to the same directory as manage.py
2. In the terminal: `$python manage.py createsuperuser`  (You will be prompted to enter a username, email address and strong password)
3. Start the development server `$python manage.py runserver`
4. In the browser, open the /admin URL `http://127.0.0.1:8000/admin`, enter your new superuser credentials.
5.  The page you will be brought to displays all the models, which you can explore the data and create, edit or delete records.

#### PostgreSQL Database Diagram

<div style="text-align: center">
  <img src="../assets/diagrams/sql3.png" alt="Database relationship diagram" width="500" >
</div>

### User Authentication and Authorization

***ADD***************************************



### API Endpoints

* Pagination built into mushroom_list and trip_list (how much?)
*** UPDATE---------------------------------------

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
- Base Url: `http://127.0.0.1:8000`

#### HTTP Request Structure
```
POST /login | Log in registered user and receive auth token
POST /signup | Register new user
POST /logout | Logs out user by deleting token
GET /profile | Retrieves user profile of signed in user
PUT /profile | Edit user profile data

GET /mushrooms | Retrieves list of mushroom objects from database
POST /mushrooms | Create new mushroom object
PATCH?
DELETE?

GET /trips | Retrieves list of trip objects
POST /trips | Create new trip object
GET /trips/:id | Retrieves trip object by id
PATCH /trips/:id | Edits trip object
PUT /trips/:id | Edits entire trip object
DELETE /trips/:id | Deletes trip object by id
POST /trips/:id/register | Signed in user registers for specific field trip, upon registration, status in Registration join table is 'registered'
GET /trips/:id/register | Retrieve registration data for specific trip
POST /trips/:id/lottery | Activate lottery, where registered users are randomized, registration status changed to 'accepted, waitlisted or rejected' and automated emails sent to users with their updated status. Leader is emailed the group of accepted and waitlisted participants.
GET /trips/:id/results | Retrieve results of lottery and registrants by status

GET /user/registrations | Retrieve list of trips user is registered for and their status
GET /user/:id | Retrieve user data by id

GET /permits | Retrieve list of permit objects
GET /permits?ids={id} | Retrieve permit by id number

GET /leaders | Retrieve list of users belonging to Leader Group Class
```
---

#### Example Query
```
http://127.0.0.1:8000/trips/15
```

#### Sample JSON Response
```
  {
  "id": 15,
  "date": "2024-05-10",
  "general_location": "Kelly Point State Park",
  "specific_location": "45.64025, -122.76294",
  "time_start": "08:00:00",
  "time_end": "15:00:00",
  "capacity": 4,
  "waitlist": 2,
  "restrictions": "none",
  "image_url": "https://cdn.pixabay.com/photo/2023/10/21/11/23/ai-generated-8331261_1280.png",
  "note": "foraging not allowed, educational foray only",
  "status": "Registration Open",
  "registration_close_date": "2024-05-06",
  "leader": 22,
  "permits": [
    2
  ]
}
```
** NEEDED?
#### Example Query to create restaurant entry
```
POST http://127.0.0.1:8000/restaurants
Content-Type: application/json

 {
    "name": "Gracie's Apizza",
    "address": "7304 N Leavitt Ave, Portland, OR 97203",
    "website": "https://www.graciesapizza.com/",
    "imageUrl": "https://images.squarespace-cdn.com/content/v1/5a790307b7411c447f906450/0c65fe57-4201-4a29-9f93-a89252bf9760/Gracie%27s+Apizza+Round+12+inch+%28no+white%29.png",
    "latitude": 45.589974368346105,
    "longitude": -122.75392355397106,
    "type_id": 1
  }
```

#### Sample JSON Response
200 OK
```
{
    "id": 2, 
    "name": "Gracie's Apizza",
    "address": "7304 N Leavitt Ave, Portland, OR 97203",
    "website": "https://www.graciesapizza.com/",
    "imageUrl": "https://images.squarespace-cdn.com/content/v1/5a790307b7411c447f906450/0c65fe57-4201-4a29-9f93-a89252bf9760/Gracie%27s+Apizza+Round+12+inch+%28no+white%29.png",
    "latitude": 45.589974368346105,
    "longitude": -122.75392355397106,
    "visible": False,
    "type_id": 1
  }
```


### Miscellaneous

### Stretch Goals

- 100% line coverage for testing.  Haven't tested the actual lottery data because it is random-but testing passes for the right number of people chosen per category.
- Make lottery weighted. Need more dummy users and more trips to test.

### Notes to self
- should test.rest be in git or not?
- need to add listener for trip lottery to happen on reg_close date (right now an endpoint which will be a button for testing.)
- make pw stricter but not during testing
- better security: https at deploy
- in deploy: change views-login&signup: secure=False to TRUE once in https
- may need to rewrite tests now that i've switched from Token header auth to Cookie holding token in browser
