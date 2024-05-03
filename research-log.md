### Research and Planning Log for capstone

#### Friday, 03/22/24
* 830: set up repository and first steps
* 900: working on proposal
* 1030: proposal completed
* 1045: going through teacher's notes and earlier thoughts on project to organize today and next week's goals
* 1115: work on sql diagram
* 1200: finish sql diagram, located in proposal for feedback
      : rough sketch of react component diagram
* 1330: working on miro board
* 1430: wip
* 1500: upload miro board to proposal with notes
* 1530: job application pause
* 1615: responsive web design, [fcc](https://www.freecodecamp.org/learn/2022/responsive-web-design/)
* 1645: finished Part 1 of 4 for Responsive Web Design Certification, CatPhotoApp

#### Monday 4/15/24
* 1300: Making goals for the week and finalizing database models
* 1330: Researching Auth alternative than straight-up django auth: [Oath](https://www.turing.com/kb/django-rest-framework-authentication)
* 1400: Scaffold Django project
* 1500: Initialize database and setup Django Admin
* 1540: Reworking database to add Registration model

### Tuesday 4/16/24
* 0815: Working on seeding database for Mushroom model.
* 0930: Write cover letters for internship applications
* 1030: Working on applications
* 1100: Whiteboard practice
* 1200: Django Rest Auth/Oath2.0 research
* 1300: continue setting up auth
* 1430: testing api endpoints with django test
* 1700: eod

### Wednesday 4/17/24
* 0815: whiteboarding
* 0915: adding oath to api
* 1000: clean up cover letters/resume for intership applications, update github profile
* 1100: wip [googlelogin over oath2 or allauth](https://www.hacksoft.io/blog/adding-google-login-to-your-existing-django-and-django-rest-framework-applications)
* 1130: pause on google login, pin as stretch goal-[tutorial](https://www.youtube.com/watch?v=yO6PP0vEOMc)

### Thurs 4/18/24
* 0800: whiteboarding
* 0830: job boards
* 0900: testing final api endpoints
* 0930: scrum
* 1000: troubleshooting testing
* 1100: created dummy accounts in database
* 1300: working on lottery logic
* 1415: meeting with Erik
* 1530: need to change Trip model to make number of people in accepted in field trip dynamic.

### Fri 4/19/24
* 0815: whiteboarding
* 0845: testing business logic for lottery and list 
* 1030: lottery functional, email sending function WIP
* 1330: working on adding react to project
* 1730: user could sign in but bug in signing out
* 1930: debugging issue with cookies and /logout 

### Sun 4/21/24
* 1215: picking back up cookie issue

### Mon 4/22/24
* 0815: whiteboarding practice
* 0900: bug in name in registration 

### Tues 4/23/24
* 0800: whiteboarding practice
* 0840: job applications (2)
* 1000: refactoring tripreports component to move state up a level to minimize api calls.
* 1215: issue rendering trip detail page, api call successful, console error that no routes matched location
* 1315: wip

### Wed 4/24/24
* 0815: interview prep
* 1330: interview
* 1545: career services meeting

### Thurs 4/25/24
* 0830: whiteboarding practice
* 1000: interview
* 1415: interview
* 1900: thank you emails to interviewers and epicenter rankings

### Fri 4/26/24
* 0830: building out lottery button on front end
* 1200: stuck with details page rendering accurate data

### Sun 4/28/24
* 1000: adding weather api data to app
* 1230: update portfolio to include capstone repository and put portfolio link in github profile page.

### Mon 4/29/24
* 0830: bug: working on state issue with page not rendering accurate data
* 1000: bug: working on updating permit info on edit trip form.
* 1315: starting styling
* 2015: debug issue, application isn't working on Chrome. 401, possible issue with samesite='none' for bypassing https in dev mode

### Tues 4/30/24
* 0815: bug: changed code to allow permits to be set as list of ids, but now it is showing as permit objects like before, so permits are not rendering on trip details page.
* 1300: styling dashboard
* 1600: Material UI wip

### Wed 5/1/24
* 0800: Working on README (3!)

### Thurs 5/2/24
* 0830: Job applications
* 0900: Scrum
* 1100: styling resources page
* 2000: adding content to discord capstone channel
* 2030: working on deploying project to render and db to supabase

### Fri 5/3/24
* 1330: deployment troubleshooting
* 1530: db success to supabase, issue with render backend host: django.db.utils.OperationalError: connection to server at "aws-0-us-west-1.pooler.supabase.com" (54.177.55.191), port 5432 failed: FATAL:  Tenant or user not found
going to try hosting on python anywhere instead.