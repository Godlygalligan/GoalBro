# Generated by Django 5.1 on 2025-01-25 21:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('GoalBro', '0002_rename_completed_goal_closed'),
    ]

    operations = [
        migrations.AddField(
            model_name='goal',
            name='category',
            field=models.CharField(choices=[('fitness', 'Fitness 💪'), ('content', 'Content 🎬'), ('finances', 'Finances 💲'), ('skills', 'Skills 🎯'), ('personal', 'Personal 💖'), ('mental', 'Mental 🧠'), ('other', 'Other ❓')], default='other', max_length=20),
        ),
    ]
