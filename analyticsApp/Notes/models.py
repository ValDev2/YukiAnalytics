from django.db import models
from django.conf import settings
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType
from django.core.validators import MaxValueValidator, MinValueValidator

# Create your models here.

class Note(models.Model):
    note = models.FloatField(
        default=10
    )
    coefficient = models.PositiveIntegerField(
        default=1,
        validators=[MaxValueValidator(20), MinValueValidator(0)]
    )
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE
    )
    date = models.DateTimeField(auto_now_add=True)

    #Generic Relation
    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
    object_id = models.PositiveIntegerField()
    content_object = GenericForeignKey()

    def __str__(self):
        return f"{self.note} coefficient {self.coefficient}"
