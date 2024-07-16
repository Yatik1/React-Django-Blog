from django.urls import path
from .views import allblogs,singleblog,newblog,editblog,deleteblog,userblog,imagekit_auth

urlpatterns = [
    path('auth/', imagekit_auth, name='imagekit_auth'),
    path('',allblogs),
    path('blog/<blog_id>',singleblog),
    path('postblog/',newblog),
    path('putblog/<blog_id>',editblog),
    path('deleteblog/<blog_id>',deleteblog),
    path('getuserblogs/<email>',userblog)
]
