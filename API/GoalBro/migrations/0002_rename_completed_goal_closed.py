# Generated by Django 5.1 on 2025-01-23 22:25

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('GoalBro', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='goal',
            old_name='completed',
            new_name='closed',
        ),
    ]
