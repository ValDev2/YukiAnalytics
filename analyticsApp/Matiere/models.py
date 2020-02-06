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

    def get_previous_moyenne(self):
        notes = self.notes()[0:self.notes().count() - 1]
        if notes.count() > 0:
            if notes == 1:
                return notes[0].note
            else:
                num = sum([note.note * note.coefficient for note in notes])
                den = sum([note.coefficient for note in notes])
                return round(num / den, 2)
        return None

    def get_moyenne(self):
        result = {
            "moyenne" : None,
            "perf" : None
        }
        notes = self.notes()
        if notes.count() > 1:
            last_note = notes.reverse()[0]
            result["moyenne"] = round((self.get_previous_moyenne() + last_note.note * last_note.coefficient)/ (last_note.coefficient + 1),2)
            result["perf"] = round(result["moyenne"] - self.get_previous_moyenne(), 2)
            return result
        elif notes.count() == 1:
            result["moyenne"] = notes[0].note
            result["perf"] = notes[0].note
            return result
        return result

    def get_previous_total_work_hour(self):
        notes = self.notes()[0: self.notes().count() - 1]
        if notes.count() > 0:
            if notes.count() == 1:
                return notes[0].total_time
            else:
                num = sum([note.total_time for note in notes])
                den = notes.count()
                return round(num / den, 2)
        return None

    def get_total_work_hour(self):
        result = {
            "total_work_hour": None,
            "perf": None
        }
        notes = self.notes()
        if notes.count() > 1:
            last_note = notes.reverse()[0]
            result["total_work_hour"] = round((self.get_previous_total_work_hour() + last_note.total_time) / 2, 2)
            result["perf"] = round(result["total_work_hour"] - self.get_previous_total_work_hour(), 2)
            return result
        elif notes.count() == 1:
            result["total_work_hour"] = notes[0].total_time
            result["perf"] = notes[0].total_time
            return result
        return result

    def get_previous_satisfaction(self):
        satisfaction = {
            "PS": 0,
            "SA": 1,
            "TS": 2
        }
        notes = self.notes()[0:self.notes().count() - 1]
        if notes.count() > 0:
            if notes.count() == 1:
                return satisfaction[notes[0].satisfaction]
            else:
                num = sum([satisfaction[note.satisfaction] for note in notes])
                den = notes.count()
                return round(num / den, 2)
        return None

    def get_satisfaction(self):
        #barème
        satisfaction = {
            "PS": 0,
            "SA": 1,
            "TS": 2
        }
        result = {
            "satisfaction": None,
            "perf": None
        }
        notes = self.notes()
        if notes.count() > 1:
            last_note = notes.reverse()[0]
            result["satisfaction"] = round((self.get_previous_satisfaction() + satisfaction[last_note.satisfaction])/2, 2)
            result["perf"] = round(result["satisfaction"] - self.get_previous_satisfaction(), 2)
            return result
        elif notes.count() == 1:
            result["satisfaction"] = satisfaction[notes[0].satisfaction]
            result["perf"] = satisfaction[notes[0].satisfaction]
            return result
        return result
