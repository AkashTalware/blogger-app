from django.shortcuts import render, redirect, get_object_or_404
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from rest_framework.response import Response
from rest_framework import status
from .serializers import BlogSerializer, UserSerializer
from django.views.decorators.csrf import csrf_exempt
from .models import *
from rest_framework.decorators import api_view
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import auth
from django.contrib.auth.hashers import make_password
from django.contrib import messages
from django.http import HttpResponse, Http404

# Create your views here.

class BlogView(APIView):
    parser_classes = (MultiPartParser, FormParser, JSONParser)
    # permission_classes = (IsAuthenticated,)

    @csrf_exempt
    def get(self, request, *args, **kwargs):
        blogs = Blog.objects.all()
        serializer = BlogSerializer(blogs, many=True)
        return Response(serializer.data)

    # @csrf_exempt
    def post(self, request, *args, **kwargs):
        # print(request.data, "Posting Your Blog")
        blog_serializer = BlogSerializer(data=request.data)
        # print(blog_serializer, "Serialized Data")
        if blog_serializer.is_valid():
            blog_serializer.save()
            return Response(blog_serializer.data, status=status.HTTP_201_CREATED)
        else:
            print('error', blog_serializer.errors)
            return Response(blog_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class BlogDetailView(APIView):
    parser_classes = (MultiPartParser, FormParser, JSONParser)
    # permission_classes = (IsAuthenticated,)

    def get_object(self, pk):
        try:
            return Blog.objects.get(pk=pk)
        except Blog.DoesNotExist:
            raise Http404

    # @csrf_exempt
    def get(self, request, *args, **kwargs):
        blog_detail = self.get_object(kwargs['blog_id'])
        blog_detail_serializer = BlogSerializer(blog_detail)
        return Response(blog_detail_serializer.data)

    @csrf_exempt
    def put(self, request, *args, **kwargs):
        blog_detail = self.get_object(kwargs['blog_id'])
        print(request.data)
        if 'blog_likes' in request.data.keys():
            if request.data['blog_likes']:
                blog_detail.blog_likes += 1
                blog_detail.save()
                return Response("Blog Has been Liked")

        else:
            blog_detail_serializer = BlogSerializer(blog_detail, data=request.data)
        # print(blog_detail_serializer, "Inside Put")
        if blog_detail_serializer.is_valid():
            blog_detail_serializer.save()
            print(blog_detail_serializer.data, "Inside Put")
            return Response(blog_detail_serializer.data)
        return Response(blog_detail_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # @csrf_exempt
    def delete(self, request, *args, **kwargs):
        blog_detail = self.get_object(kwargs['blog_id'])
        blog_detail.delete()
        return Response("Item Deleted Successfully", status=status.HTTP_204_NO_CONTENT)


class UserBlogs(APIView):

    def get(self, request, *args, **kwargs):
        try:
            user_blogs = Blog.objects.filter(author = kwargs['user_id']).order_by('date_published')
            print(user_blogs)
            user_blogs_serializer = BlogSerializer(user_blogs, many=True)
            return Response(user_blogs_serializer.data)

        except Exception as e:
            return Response(e, status= status.HTTP_404_NOT_FOUND)

class Comments(APIView):

    def get(self, request, *args, **kwargs):
        pass


@api_view(['GET'])
def UserList(request):
    users = User.objects.all()
    print(users, ">>>>>>>>>>>>>>>>>>>>>>>>")
    serializer = UserSerializer(users, many=True)
    print(serializer.data)
    return Response(serializer.data)


@api_view(['GET'])
def getUser(request, username):
    try:
        user = User.objects.get(username=username)
        # print(user, "This is the user")
        serializer = UserSerializer(user, many=False)
        # print(serializer.data, "Response should be like this")
        return Response(serializer.data)
    except Exception as e:
        return HttpResponse("User Does not exist", e, status = status.HTTP_404_NOT_FOUND)


@api_view(['GET'])
def getUserWithID(request, user_id):
    try:
        user = User.objects.get(id=int(user_id))
        # print(user, "This is the user")
        serializer = UserSerializer(user, many=False)
        # print(serializer.data, "Response should be like this")
        return Response(serializer.data)
    except Exception as e:
        return HttpResponse("User Does not exist", e, """status = status.HTTP_404_NOT_FOUND""")


@csrf_exempt
@api_view(['POST'])
def login(request):
    # print("request.data", request.data['username'], request.data['password'])
    user = auth.authenticate(username=request.data['username'], password = request.data['password'])
    if user is not None:
        auth.login(request, user)
        print(f"{user} Logged in successfully")
        messages.info(request, f"{user.first_name.capitalize()} logged in")
        return HttpResponse("Logged In Successfully")
    else:
        # messages.info(request, "Invalid Credentials")
        print("Invalid Info")
        return HttpResponse("Login Credentials Invalid", status = status.HTTP_401_UNAUTHORIZED)


@api_view(['POST'])
def createUser(request):
    if User.objects.filter(username=request.data['username']).exists():
        print("Username Exists")
        return HttpResponse("Username Already Exists. Please use another Username", status = status.HTTP_409_CONFLICT)

    elif User.objects.filter(email=request.data['email']).exists():
        print("Email Already Exists")
        return HttpResponse("Email Already Exists. Please use another Email", status = status.HTTP_409_CONFLICT)
    
    else:
        request.data['password'] = make_password(request.data['password'])
        user_serializer = UserSerializer(data=request.data)
        if user_serializer.is_valid():
            user_serializer.save()
            print("user_serializer", user_serializer)
        return Response(user_serializer.data)


@csrf_exempt
def logout(request):
    auth.logout(request)
    return HttpResponse("Logged Out Successfully")