from django.db import models
from Notes.models import Note
from django.contrib.contenttypes.fields import GenericRelation
from django.conf import settings

FA = "FA"
MO = "MO"
DI = "DI"
CHOICE = (
    (FA, "Facile"),
    (MO, "Moyenne"),
    (DI, "Difficile"),
)

# Create your models here.
class Matiere(models.Model):
    nom = models.CharField(
        max_length=80,
    )
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        default=2
    )
    coefficient = models.PositiveIntegerField(
        default=1
    )
    difficulte = models.CharField(
        choices=CHOICE,
        default=MO,
        max_length=20
    )
    notes = GenericRelation(Note)

    #Generic Relation
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE
    )

    def __str__(self):
        return f"{self.nom}"

    def save(self, *args, **kwargs):
        return super(Matiere, self).save(*args, **kwargs)
