from django.core.mail import send_mail
import os
#from django.contrib.auth.models import User, Group

def send_email(to_emails, subject, message):
  print(f'senidng email to {to_emails}...')
  from_email = os.getenv('EMAIL_HOST_USER')
  if not isinstance(to_emails, (list, tuple)):
    to_emails = [to_emails]
  send_mail(subject, message, from_email, to_emails)
  print('finished sending email')


def send_leader_email(trip):
  from django.contrib.auth.models import Group, User
  
  accepted, waitlisted, rejected = trip.get_registrations_by_status()

  subject = f'List for {trip.date} field trip'
  print(f'Accepted: {accepted}')  # print the value of accepted
  print(f'Waitlisted: {waitlisted}')  # print the value of waitlisted
  print(f'Rejected: {rejected}') 
  message = f'Accepted: {accepted}\nWaitlisted: {waitlisted}\nRejected:{rejected}'
  
  print(Group.objects.values_list('name', flat=True))  # print all group names before

  try:
    coordinators = Group.objects.get(name='Coordinator')
    coordinator = User.objects.filter(groups=coordinators).first()
    if coordinator is not None:
      coordinator_email = coordinator.email
    else:
      coordinator_email = None
  except Group.DoesNotExist:
    print("coordinator group doesn't exist")
    coordinators = None
  
  print(Group.objects.values_list('name', flat=True))  # print all group names before


  send_email([trip.leader.email, coordinator_email], subject, message)

def send_applicant_email(registration):
  subject = f'Status for {registration.trip.date} field trip'
  message = f'Your status is: {registration.status}.  If chosen, {registration.trip.leader} will be in touch.'
  # update msg if rejected to be nicer...

  send_email(registration.user.email, subject, message)