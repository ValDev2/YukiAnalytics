# Generated by Django 3.0.2 on 2020-02-09 21:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('User', '0002_auto_20200208_1637'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='creation_date',
            field=models.DateTimeField(auto_now=True),
        ),
    ]
