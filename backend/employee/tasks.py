from django.core.mail import EmailMultiAlternatives
from celery_app import app


@app.task(bind=True, default_retry_delay=300, max_retries=5)
def send_managers_email(subject, text_content, html_content, from_email, mamagers_emails):
    msg = EmailMultiAlternatives(subject, text_content, from_email, mamagers_emails)
    msg.attach_alternative(html_content, "text/html")
    msg.send()