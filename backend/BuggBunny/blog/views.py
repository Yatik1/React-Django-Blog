from rest_framework.response import Response
from .models import Blog
from .serializers import BlogSerializer
from rest_framework import status
from rest_framework.decorators import api_view,parser_classes
from rest_framework.parsers import MultiPartParser
from firebase_admin import auth
from django.conf import settings
from imagekitio import ImageKit
# Create your views here.


imagekit = ImageKit(
    private_key=settings.IMAGEKIT_PRIVATE_KEY,
    public_key=settings.IMAGEKIT_PUBLIC_KEY,
    url_endpoint=settings.IMAGEKIT_URL_ENDPOINT
)

@api_view(['GET'])
def allblogs(request):
    try:
        firebase_user = request.firebase_user
        print(firebase_user)
        if firebase_user:
            blogs = Blog.objects.all()
            serializer = BlogSerializer(blogs,many=True)
            j = 0
            key = 0
            res = {}
            blogs = []
            for i in serializer.data:
                print(j)
                if j % 3 !=0 or j==0:
                    blogs.append(i)
                    res[key] = blogs
                else:
                    blogs = []
                    key+=1
                    blogs.append(i)
                    res[key] = blogs
                j+=1
            print(res)
            return Response({'blogs':res,'last_key':key},status=status.HTTP_200_OK)
    except Exception as e:
        print(e)
        return Response({'error':str(e)},status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def singleblog(request,blog_id):
    firebase_user = request.firebase_user
    try:
        blog = Blog.objects.get(id = blog_id)
        print(blog)
        serializer = BlogSerializer(blog,many = False)
        return Response(serializer.data,status=status.HTTP_200_OK)
    except Blog.DoesNotExist:
        return Response({'error':"this id is not in record"},status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({'error':str(e)},status=status.HTTP_400_BAD_REQUEST)
    


# user specific blogs



@api_view(['POST'])
@parser_classes([MultiPartParser])
def newblog(request):
    
    try:
        firebase_user = request.firebase_user
        body = request.data.copy()
        serializer = BlogSerializer(data=body)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    except Exception as e:
        print(e)
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


    
@api_view(['PUT'])
def editblog(request,blog_id):
    try:
        firebase_user = request.firebase_user
        body = request.data
        blog = Blog.objects.get(id = blog_id)
        print('previous',blog)
        print('updated',body)
        serializer = BlogSerializer(instance=blog,data=body,partial = True)
        try:
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data,status=status.HTTP_200_OK)
        except serializer.errors:
            return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        return Response(str(e),status=status.HTTP_400_BAD_REQUEST)
            
@api_view(['DELETE'])
def deleteblog(request,blog_id):
    try:
        firebase_user = request.firebase_user
        blog = Blog.objects.get(id = blog_id)
        try:
            blog.delete()
            return Response('blog is deleted successfully',status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            print(e)
            return Response(str(e),status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        print(e)
        return Response(str(e),status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['GET'])
def userblog(request,email):
    try:
        firebase_user = request.firebase_user
        print('firebase user',firebase_user)
        user = auth.get_user_by_email(email)
        print(user)
        blogs = Blog.objects.filter(author = email)
        serializer = BlogSerializer(blogs,many=True)
        return Response(serializer.data,status=status.HTTP_200_OK)
    except Exception as e:
        print(e)
        return Response(str(e),status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['GET'])
def imagekit_auth(request):
    auth_params = imagekit.get_authentication_parameters()
    return Response(auth_params,status=status.HTTP_200_OK)