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

Django Admin [Documentation](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Django/Admin_site)

1. The admin.py file is already setup, you need to create a superuser. Navigate to the same directory as manage.py
2. In the terminal: `$python manage.py createsuperuser`  (You will be prompted to enter a username, email address and strong password)
3. Start the development server `$python manage.py runserver`
4. In the browser, open the /admin URL `http://127.0.0.1:8000/admin`, enter your new superuser credentials.
5.  The page you will be brought to displays all the models, which you can explore the data and create, edit or delete records.

<div style="text-align: center">
  <img src="../assets/diagrams/screenshots/django-admin.png" alt="Django Admin Screenshot" width="500" >
</div>

#### PostgreSQL Database Diagram

<div style="text-align: center">
  <img src="../assets/diagrams/sql3.png" alt="Database relationship diagram" width="500" >
</div>

### User Authentication and Authorization

***ADD***************************************



### API Endpoints

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
