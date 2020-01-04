from django.db import models
from django.contrib.auth.models import AbstractUser
import datetime
from Matiere.models import Matiere

L1 = "L1"
L2 = "L2"
L3 = "L3"
M1 = "M1"
M2 = "M2"

CHOICES = (
    (L1, "Licence 1"),
    (L2, "Licence 2"),
    (L3, "Licence 3"),
    (M1, "Master 1"),
    (M2, "Master 2")
)

class User(AbstractUser):
    classe = models.CharField(
        max_length = 70,
        default="NA",
    )
    niveau = models.CharField(
        choices = CHOICES,
        default=L1,
        max_length=5
    )
    birth_date = models.DateField(
        auto_now=False,
        auto_now_add=False,
        default=datetime.datetime.now()
    ),
    ville = models.CharField(
        max_length = 70,
        default="NA",
    )

    def __str__(self):
        return self.username

    def save(*args, **kwargs):
        return super(User, self).save(*args, **kwargs)

    def get_matieres(self):
        return Matiere.objects.filter(user=self.id)
