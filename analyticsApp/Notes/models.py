from django.db import models
from django.conf import settings
from django.core.validators import MaxValueValidator, MinValueValidator



PS = "PS"
SA = "SA"
TS = "TS"
CHOICE = (
    (PS, "Pas Satisfait"),
    (SA, "Satisfait"),
    (TS, "Très Satisfait")
)
FA = "FA"
MO = "MO"
DI = "DI"
DIFFICULTE_CHOICE = (
    (FA, "facile"),
    (MO, "moyenne"),
    (DI, "difficile"),
)

#Ecrire les méthodes de queryset ici :
class NoteQuerySet(models.QuerySet):
    def matiere(self, matiere):
        return self.filter(matiere=matiere).order_by("creation_date")

    def below_average(self):
        return self.filter(note__lt=10)

    def above_average(self):
        return self.filter(note__gt=10)

    def user(self, user):
        return self.filter(user=user)

    #Renvoie un queryset des notes, trié par difficulte
    def difficulte(self):
        return self.order_by("difficulte")

#Appeer les méthodes de querySet ici :
class NoteManager(models.Manager):
    #Permet d'utiliser les méthodes de Queryset définies en haut
    def get_queryset(self):
        return NoteQuerySet(self.model, using=self._db)

    def matiere(self, matiere):
        return self.get_queryset().matiere(matiere)

    def below_average(self):
        return self.get_queryset().below_average()

    def above_average(self):
        return self.get_queryset().above_average()

    def user(self, user):
        return self.get_queryset().user()

    def difficulte(self):
        return self.get_queryset().difficulte

class Note(models.Model):
    note = models.FloatField(
        default=10,
        validators=[MaxValueValidator(20), MinValueValidator(0)]
    )
    coefficient = models.PositiveIntegerField(
        default=1,
    )
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE
    )
    creation_date = models.DateTimeField(auto_now_add=True)

    satisfaction = models.CharField(
        choices=CHOICE,
        max_length=30,
        default="SA"
    )

    difficulte = models.CharField(
        choices=DIFFICULTE_CHOICE,
        max_length=30,
        default=MO
    )

    total_time = models.FloatField(
        default="1"
    )

    matiere = models.ForeignKey(
        'Matiere.Matiere',
        on_delete = models.CASCADE,
        default=1
    )
    objects = NoteManager()

    def __str__(self):
        return f"{self.note} coefficient {self.coefficient} : temps total de travail : {self.total_time}"

    @property
    def get_nom_matiere(self):
        return self.matiere.nom

    @property
    def get_username(self):
        return self.user.username
