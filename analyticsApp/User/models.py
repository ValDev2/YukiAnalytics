from django.db import models
from django.core.exceptions import ValidationError
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

    relationships = models.ManyToManyField(
        "self",
        through="Relationship",
        symmetrical=False,
        related_name="related_to"
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

    creation_date = models.DateTimeField(
        auto_now=True
    )

    def __str__(self):
        return self.username

    def save(self, *args, **kwargs):
        return super(User, self).save(*args, **kwargs)

    def get_matieres(self):
        return Matiere.objects.filter(user=self.id)

    #Relationship's method
    def get_friends(self):
        return self.relationships.filter(
            to_people__from_user = self,
            to_people__status = RELATIONSHIP_FOLLOWING,
            from_people__to_user = self,
            from_people__status = RELATIONSHIP_FOLLOWING
        )

    def add_relationship(self, to_user, status):
        relationship, created = Relationship.objects.get_or_create(
            from_user=self,
            to_user=to_user,
            status=status
        )
        return relationship

    def get_follow_relationships(self):
        return Relationship.objects.filter(
            from_user=self,
            status=1
        )

    def get_block_relationships(self):
        return Relationship.objects.filter(
            from_user=self,
            status=2
        )

    def remove_relationship(self, to_user, status):
        return Relationship.objects.filter(
            from_user = self,
            to_user = to_user,
            status = status
        ).delete()

    def get_followers(self):
        return self.related_to.filter(
            from_people__status=RELATIONSHIP_FOLLOWING,
            from_people__to_user=self
        )

    def get_followers_count(self):
        return self.get_followers().count()

    def get_following(self):
        return self.relationships.filter(
            to_people__status=RELATIONSHIP_FOLLOWING,
            to_people__from_user=self
        )

    def get_following_count(self):
        return self.get_following().count()

    def get_blocked_users(self):
        return self.relationships.filter(
            to_people__status=RELATIONSHIP_BLOCKING,
            to_people__from_user=self
        )

    def get_blocking_users(self):
        return self.related_to.filter(
            from_people__to_user=self,
            from_people__status=RELATIONSHIP_BLOCKING
        )


RELATIONSHIP_FOLLOWING = 1
RELATIONSHIP_BLOCKING = 2
STATUS_CHOICE = (
    (RELATIONSHIP_FOLLOWING, "Following"),
    (RELATIONSHIP_BLOCKING, "Blocked")
)


class Relationship(models.Model):
    from_user = models.ForeignKey(
        User,
        on_delete = models.CASCADE,
        related_name="from_people"
    )
    to_user = models.ForeignKey(
        User,
        on_delete = models.CASCADE,
        related_name="to_people"
    )
    date = models.DateTimeField(
        auto_now_add=True
    )
    status = models.IntegerField(
        choices = STATUS_CHOICE
    )

    def __str__(self):
        return f"{self.from_user} a envoyé une relation à {self.to_user.username}"

    def save(self, *args, **kwargs):
        if Relationship.objects.filter(from_user = self.from_user,to_user = self.to_user, status = self.status).exists():
            raise ValidationError("Relation déjà existente entre les deux utilisateurs")
        elif self.from_user == self.to_user:
            raise ValidationError("L'emetteur ne peut être identique au receveur")
        return super(Relationship, self).save(*args, **kwargs)
