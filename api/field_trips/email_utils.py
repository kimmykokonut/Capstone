from django.core.mail import send_mail
import os

def send_email(to_emails, subject, message):
  from_email = os.getenv('EMAIL_HOST_USER')
  if not isinstance(to_emails, (list, tuple)):
    to_emails = [to_emails]
  send_mail(subject, message, from_email, to_emails)

def send_leader_email(trip):
  from django.contrib.auth.models import Group, User
  
  accepted, waitlisted = trip.get_registrations_by_status()

  accepted_users = [f"{reg.user.first_name}, {reg.user.email}" for reg in accepted]
  waitlisted_users = [f"{reg.user.first_name}, {reg.user.email}" for reg in waitlisted]

  formatted_date = trip.date.strftime('%B %d, %Y')

  subject = f'List for OMS field trip: {formatted_date}'
  message = f'Accepted: \n{", ".join(accepted_users)}\nWaitlisted:\n{", ".join(waitlisted_users)}'
  
  try:
    coordinators = Group.objects.get(name='Coordinator')
    coordinator = User.objects.filter(groups=coordinators).first()
    if coordinator is not None:
      coordinator_email = coordinator.email
    else:
      coordinator_email = None
  except Group.DoesNotExist:
    coordinators = None  
  # pin for later: to send leader a link to the contact list for the day? or email the contact list (name, email, phone, e-name, e-phone etc etc)
  send_email([trip.leader.email, coordinator_email], subject, message)

def send_applicant_email(registration):
  formatted_date = registration.trip.date.strftime('%B %d, %Y')

  subject = f'Status for OMS Field Trip: {formatted_date}'
  
  if registration.status == 'rejected':
    message = 'Sorry, you were not chosen for this trip. We had more members interested than space available. Please try again on a future trip.  ---OMS Field Trip Team'
  else:
    message = f'Your status is: {registration.status}.  The leader, {registration.trip.leader}, will be in touch directly.'

  send_email(registration.user.email, subject, message)