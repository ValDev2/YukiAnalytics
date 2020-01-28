from django.db import models
from django.conf import settings
from django.utils.text import slugify
from django.core.exceptions import ValidationError
from Matiere.models import Matiere

FA = "FA"
MO = "MO"
DI = "DI"
CHOICE = (
    (FA, "facile"),
    (MO, "moyenne"),
    (DI, "difficile"),
)


class Semestre(models.Model):
    nom = models.CharField(
        max_length=50,
        unique=True
    )
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete = models.CASCADE
    )
    difficulte = models.CharField(
        choices=CHOICE,
        default=MO,
        max_length=20
    )
    slug=models.SlugField(
        unique=True,
        blank=True
    )
    #StartDate
    dateDebut = models.DateField(
        auto_now_add=True
    )
    #EndDate
    dateFin = models.DateField(
        auto_now=False,
        auto_now_add=False
    )

    def __str__(self):
        return f"Semestre : {self.nom}"

    def save(self, *args, **kwargs):
        self.slug = slugify(self.nom)
        return super(Semestre, self).save(*args, **kwargs)

    @property
    def moyenne(self):
        matieres = Matiere.objects.semestre(self)
        if matieres.count() > 0:
            valid_matieres = [matiere for matiere in matieres if not(isinstance(matiere.moyenne, str))]
            if valid_matieres:
                num = 0
                den = 0
                for matiere in valid_matieres:
                    num += (matiere.moyenne * matiere.coefficient)
                    den += matiere.coefficient
                return num / den
            return "Aucune Note dans ce Semestre"
        return "Aucune Matiere dans ce Semestre  "
