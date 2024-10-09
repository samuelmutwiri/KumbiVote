from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.core.exceptions import ValidationError
from django.http import JsonResponse
from django.middleware.csrf import get_token
from django.views.decorators.csrf import csrf_exempt


@csrf_exempt
def login_view(request):
    if request.method == "POST":
        username = request.POST.get("username")
        password = request.POST.get("password")
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return JsonResponse(
                {"message": "Login successful", "csrf_token": get_token(request)},
                status=200,
            )
        else:
            return JsonResponse({"error": "Invalid credentials"}, status=401)
    return JsonResponse({"error": "Invalid request"}, status=400)


@csrf_exempt
def register_view(request):
    if request.method == 'POST':
        # Get data from request
        username = request.POST.get('username')
        password = request.POST.get('password')
        email = request.POST.get('email')

        # Validate required fields
        if not username or not password or not email:
            return JsonResponse({'error': 'Please provide all required fields.'}, status=400)

        # Check if the username already exists
        if User.objects.filter(username=username).exists():
            return JsonResponse({'error': 'Username already taken.'}, status=400)

        # Create new user
        try:
            user = User.objects.create_user(username=username, password=password, email=email)
            user.save()

            # Automatically log in the user after registration
            user = authenticate(request, username=username, password=password)
            if user is not None:
                login(request, user)
                return JsonResponse({'message': 'User registered and logged in successfully', 'csrf_token': get_token(request)}, status=201)
            else:
                return JsonResponse({'error': 'Error authenticating the user.'}, status=500)

        except ValidationError as e:
            return JsonResponse({'error': str(e)}, status=400)
        except Exception:
            return JsonResponse({'error': 'An error occurred while creating the user.'}, status=500)

    return JsonResponse({'error': 'Invalid request method'}, status=400)


@login_required
def profile_view(request):
    user = request.user
    profile_data = {"username": user.username, "email": user.email}
    return JsonResponse(profile_data)


@login_required
def logout_view(request):
    logout(request)
    return JsonResponse({"message": "Logged out successfully"}, status=200)
