from django.db import models
from django.conf import settings
from Notes.models import Note
from django.core.exceptions import ValidationError
from django.template.defaultfilters import slugify


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


FA = "FA"
MO = "MO"
DI = "DI"
CHOICE = (
    (FA, "facile"),
    (MO, "moyenne"),
    (DI, "difficile"),
)


# Create your models here.
class Matiere(models.Model):
    nom = models.CharField(
        max_length=80,
    )
    type = models.CharField(
        max_length=80,
        default="default_type"
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
        unique=True
    )
    objects = MatiereManager()

    #Méthodes
    def __str__(self):
        return f"{self.nom}"

    def save(self, *args, **kwargs):
        if Matiere.objects.filter(nom=self.nom).exists():
            raise ValidationError("Cette matière existe déjà ! ")
        self.slug = slugify(self.nom)
        return super(Matiere, self).save(*args, **kwargs)

    def notes(self):
        return Note.objects.matiere(matiere=self)

    def moyenne(self):
        if self.notes().count() > 0:
            total = 0
            for note in self.notes():
                total += (note.note * note.coefficient)
            return round(total / self.notes().count(), 2)
        return "Aucune note pour le moment"
