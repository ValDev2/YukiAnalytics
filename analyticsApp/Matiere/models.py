from django.db import models
from django.conf import settings
from Notes.models import Note
from datetime import datetime
from django.core.exceptions import ValidationError
from django.template.defaultfilters import slugify
from datetime import datetime

#Queryset methods
class MatiereQuerySet(models.QuerySet):
    def user(self, user):
        return self.filter(user=user)

    def coefficient(self, coef):
        return self.filter(coefficient=int(coef))

    def matiere_type(self, type):
        return self.filter(type=type.lower())

    def difficulte(self, difficulte):
        return self.filter(difficulte=difficulte.lower())

    def semestre(self, semestre):
        return self.filter(semestre=semestre)

#call queryset methods
class MatiereManager(models.Manager):
    def get_queryset(self):
        return MatiereQuerySet(self.model, using=self._db)

    def user(self, user):
        return self.get_queryset().user(user)

    def coefficient(self, coef):
        return self.get_queryset().coefficient(coef)

    def matiere_type(self, type):
        return self.filter(type)

    def difficulte(self, difficulte):
        return self.get_queryset().difficulte(difficulte)

    def semestre(self, semestre):
        return self.get_queryset().semestre(semestre)


FA = "FA"
MO = "MO"
DI = "DI"
CHOICE = (
    (FA, "facile"),
    (MO, "moyenne"),
    (DI, "difficile"),
)

LI = "LI"
MA = "MA"
PH = "PH"
BI = "BI"
HI = "HI"
LA = "LA"

CHOICE_TYPE =(
    (LI, "Littérature"),
    (MA, "Mathématiques"),
    (PH, "Physique"),
    (BI, "Biologie"),
    (HI, "Histoire"),
    (LA, "Langue")
)



# Create your models here.
class Matiere(models.Model):
    nom = models.CharField(
        max_length=80,
        unique=True
    )
    type = models.CharField(
        choices=CHOICE_TYPE,
        default=MA,
        max_length=30
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
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE
    )
    slug = models.SlugField(
        blank=True,
        unique=True
    )
    objects = MatiereManager()

    semestre = models.ForeignKey(
        "Semestre.Semestre",
        on_delete=models.CASCADE,
        default=1
    )

    #Méthodes
    def __str__(self):
        return f"{self.nom}"

    def save(self, *args, **kwargs):
        if Matiere.objects.filter(nom=self.nom, id=not(self.id)).exists():
            raise ValidationError("Cette matière existe déjà ! ")
        self.slug = slugify(self.nom)
        return super(Matiere, self).save(*args, **kwargs)

    def notes(self):
        return Note.objects.matiere(self).order_by("creation_date")

    def get_type(self):
        return str(self.get_type_display())

    def get_difficulte(self):
        return str(self.get_difficulte_display())

    #Retourne un dictionnaire contenant la moyenne actuelle et un traceback des notes
    #de la matiere
