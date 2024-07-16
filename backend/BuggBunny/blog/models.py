from django.db import models

# Create your models here.
class Blog(models.Model):
    created_on = models.DateTimeField(auto_now_add=True)
    author = models.EmailField(null = True)
    url = models.URLField(null=True)
    title = models.CharField(max_length=200)
    body = models.CharField(max_length=10000)
    category = models.CharField(max_length=500)
    
    def __str__(self) -> str:
        return self.title
