from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Blog(models.Model):

    title = models.CharField(max_length=100)
    body = models.TextField()
    date_published = models.DateTimeField(auto_now = True)
    image = models.ImageField(upload_to = 'blog_pics', default='IM3.jpg')
    author = models.ForeignKey(User, on_delete = models.SET_NULL, blank=True, null=True)
    blog_likes = models.IntegerField(default=0)

    def __str__(self):
        return f"Title: {self.title} Likes: {self.blog_likes}"

class CommentsAndLikes(models.Model):

    comment_likes = models.IntegerField(default=0)
    comment = models.CharField(max_length=200)
    blog = models.ForeignKey(Blog, on_delete=models.CASCADE)

    def __str__(self):
        return f"Comment: {self.comment}\t Likes:{self.comment_likes}"