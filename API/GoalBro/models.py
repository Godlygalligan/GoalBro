from django.db import models

from django.contrib.auth.models import AbstractUser, Group, Permission

# Create your models here.

class User(AbstractUser):
    groups = models.ManyToManyField(Group, related_name="goalbro_user_groups")
    user_permissions = models.ManyToManyField(Permission, related_name="goalbro_user_permissions")

    def __str__(self):
        return self.username

CATEGORIES = [
    ("fitness", "Fitness 💪"),
    ("content", "Content 🎬"),
    ("finances", "Finances 💲"),
    ("skills", "Skills 🎯"),
    ("personal", "Personal 💖"),
    ("mental", "Mental 🧠"),
    ("career", "Career 💼"),
    ("other", "Other ❓")
]

class Goal(models.Model):
    name = models.TextField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    description = models.TextField(blank=True)
    goal_amount = models.IntegerField()
    current_progress = models.IntegerField()
    last_updated = models.DateTimeField(auto_now=True)
    closed = models.BooleanField(default=False)
    category = models.CharField(
        max_length=20,
        choices=CATEGORIES,
        default="other"
    )

    def __str__(self):
        return f"Goal by {self.user} to {self.name}. They are {(self.current_progress/self.goal_amount) * 100 if not self.closed else 100}% of the way there!"

class Update(models.Model):
    goal = models.ForeignKey(Goal, on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now=True)
    amount = models.IntegerField()
    type = models.CharField(max_length=10, choices=[("increase","Increase"),("decrease","Decrease")], default="increase")


