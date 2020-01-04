# Generated by Django 3.0.1 on 2020-01-04 08:03

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('Matiere', '0002_auto_20200104_0855'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='matiere',
            name='content_type',
        ),
        migrations.RemoveField(
            model_name='matiere',
            name='object_id',
        ),
        migrations.AlterField(
            model_name='matiere',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
    ]
