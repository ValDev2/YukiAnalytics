# Generated by Django 3.0.2 on 2020-01-21 08:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Matiere', '0005_auto_20200111_1726'),
    ]

    operations = [
        migrations.AlterField(
            model_name='matiere',
            name='nom',
            field=models.CharField(max_length=80, unique=True),
        ),
    ]
