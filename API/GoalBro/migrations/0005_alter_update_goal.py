# Generated by Django 5.1 on 2025-01-27 11:56

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('GoalBro', '0004_alter_goal_category'),
    ]

    operations = [
        migrations.AlterField(
            model_name='update',
            name='goal',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='GoalBro.goal'),
        ),
    ]
