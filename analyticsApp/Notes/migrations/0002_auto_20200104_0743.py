# Generated by Django 3.0.1 on 2020-01-04 06:43

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Notes', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='note',
            name='coefficient',
            field=models.PositiveIntegerField(default=1, validators=[django.core.validators.MaxValueValidator(20), django.core.validators.MinValueValidator(0)]),
        ),
    ]
