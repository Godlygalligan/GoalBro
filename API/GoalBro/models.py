from django.db import models

from django.contrib.auth.models import AbstractUser

# Create your models here.

class User(AbstractUser):
    ...

class Goal(models.Model):
    name = models.TextField()
    user = models.ManyToOneRel(User)
    description = models.TextField(blank=True)
    goal_amount = models.IntegerField()
    current_progress = models.IntegerField()
    last_updated = models.DateTimeField(auto_now=True)
    completed = models.BooleanField(default=False)

class Update(models.Model):
    goal = models.ManyToOneRel(Goal)
    timestamp = models.DateTimeField(auto_now=True)
    amount = models.IntegerField()


