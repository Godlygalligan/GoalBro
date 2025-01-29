from django.shortcuts import render

from django.http import JsonResponse

from .models import *

from django.db.models import F
import json
from django.contrib.auth.decorators import login_required
from django.contrib.auth import authenticate, login, logout
from django.views.decorators.csrf import csrf_exempt
from django.forms.models import model_to_dict
import re
# Create your views here.

@csrf_exempt
def register(request):
    if request.method != "POST":
        return JsonResponse({"error": "Registration requests must be POST"}, status=400)
    
    try:
        data = json.loads(request.body)
    except json.JSONDecodeError:
        return JsonResponse({"error": "Invalid JSON"}, status=400)
    
    required_fields = ["username", "password", "email", "permanent"]
    for field in required_fields:
        if field not in data:
            return JsonResponse({"error": f"Missing field: {field}"}, status=400)
    
    username = data["username"].strip()
    password = data["password"].strip()
    email = data["email"].strip()

    if data["permanent"]:
        request.session.set_expiry(0)
    else:
        request.session.set_expiry(86400)  # Set session to expire in 1 hour
    
    if not username or not password or not email:
        return JsonResponse({"error": "All fields must be non-empty"}, status=400)
    
    email_regex = r'^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$'
    if not re.match(email_regex, email):
        return JsonResponse({"error": "Invalid email format"}, status=400)
    
    try:
        user = User.objects.create_user(username=username, password=password, email=email)
        user.save()
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
        return JsonResponse({"message": "User successfully registered"}, status=201)
    except Exception as e:
        return JsonResponse({"error": f"An error occurred: {str(e)}"}, status=500)

@csrf_exempt
def user_login(request):
    if request.method != "POST":
        return JsonResponse({"error": "Login requests must be POST"}, status=400)
    
    try:
        data = json.loads(request.body)
    except json.JSONDecodeError:
        return JsonResponse({"error": "Invalid JSON"}, status=400)
    
    username = data.get("username")
    password = data.get("password")
    permanent = data.get("permanent", False)
    
    if not username or not password:
        return JsonResponse({"error": "Missing username or password"}, status=400)
    
    user = authenticate(request, username=username, password=password)
    if user is not None:
        login(request, user)
        if permanent:
            request.session.set_expiry(0)
        else:
            request.session.set_expiry(86400)  # Set session to expire in 1 day
        return JsonResponse({"message": "User successfully logged in"}, status=200)
    else:
        return JsonResponse({"error": "Invalid credentials"}, status=400)

@login_required
def user_logout(request):
    if request.method != "POST":
        return JsonResponse({"error": "Logout requests must be POST"}, status=400)
    
    logout(request)
    return JsonResponse({"message": "User successfully logged out"}, status=200)

@login_required
def goals(request):
    if request.method != "GET":
        return JsonResponse({"error": "Goal requests must be GET"}, status=400)

    goal_type = request.GET.get('type', None)
    if goal_type:
        goals = []

        if goal_type == "current":
            goals = Goal.objects.filter(user=request.user, closed=False).order_by('-last_updated')
        if goal_type == "closed":
            goals = Goal.objects.filter(user=request.user, closed=True).order_by('-last_updated')
        else:
            if goal_type.isnumeric():
                goal = Goal.objects.get(pk=int(goal_type))
                
                goal_dict = model_to_dict(goal)
                goal_dict["last_updated"] = goal.last_updated
                updates = Update.objects.filter(goal=goal).order_by('-timestamp')
                updates_data = list(updates.values())
                goal_dict["updates"] = updates_data
                goal_dict["category"] = next((tup for tup in CATEGORIES if goal.category in tup), None)

                return JsonResponse({"goal": goal_dict}, safe=False, status=200)
        goals_data = []
            
        for goal in goals:
            goal_dict = model_to_dict(goal)
            goal_dict["last_updated"] = goal.last_updated
            goal_dict["category"] = next((tup for tup in CATEGORIES if goal.category in tup), None)
            goals_data.append(goal_dict)
        

        return JsonResponse({"goals": goals_data}, safe=False)
    else:
        return JsonResponse({"error": 'Missing "type" parameter'}, status = 400)
    
@login_required
def categories(request):
    if request.method != "GET":
        return JsonResponse({"error":"Category requests must be GET"}, status = 400)
    
    return JsonResponse({"categories": CATEGORIES}, status = 200)
    
@login_required
def add_goal(request):
    if request.method != "POST":
        return JsonResponse({"error": "Goal add requests must be POST"}, status=400)
    
    try:
        data = json.loads(request.body)
    except json.JSONDecodeError:
        return JsonResponse({"error": "Invalid JSON"}, status=400)
    
    required_fields = ["name", "description", "goalAmount", "currentProgress", "category"]

    for field in required_fields:
        if field not in data:
            return JsonResponse({"error": f"Missing field: {field}"}, status=400)
    
    if not data["name"].strip() or not data["description"].strip():
        return JsonResponse({"error": "Goals must have a name and a description"}, status=400)
    
    try:
        goal_amount = int(data["goalAmount"])
        if goal_amount <= 0:
            return JsonResponse({"error": "Goal amount must be greater than 0"}, status=400)
    except (ValueError, TypeError):
        return JsonResponse({"error": "Goal amount must be a valid integer"}, status=400)

    current_progress = data.get("currentProgress")
    if current_progress is not None:
        try:
            current_progress = int(current_progress)
            if current_progress < 0:
                return JsonResponse("Current progress cannot be a negative value")
        except (ValueError, TypeError):
            return JsonResponse({"error": "Current progress must be a valid integer or omitted"}, status=400)
    try:
        goal = Goal(
            name=data["name"].strip(),
            user=request.user,
            description=data["description"].strip(),
            goal_amount=goal_amount,
            current_progress=current_progress,
            category = data.get("category")
        )
        goal.save()
        return JsonResponse({"message": "Goal successfully added"}, status=201)

    except ValueError:
        return JsonResponse({"error": "Goal amount and current progress must be integers"}, status=400)

    except Exception as e:
        return JsonResponse({"error": f"An error occurred: {str(e)}"}, status=500)

@login_required  
def close_goal(request):
    if request.method != "POST":
        return JsonResponse({"error": "Goal close requests must be POST"}, status=400)
    
    try:
        data = json.loads(request.body)
    except json.JSONDecodeError:
        return JsonResponse({"error": "Invalid JSON"}, status=400)
    
    goal_id = data.get("id")
    if not goal_id:
        return JsonResponse({"error": "Missing goal ID"}, status=400)
    
    try:
        goal = Goal.objects.get(id=goal_id, user=request.user)
        goal.closed = True
        goal.save()
        return JsonResponse({"message": "Goal successfully closed"}, status=200)
    except Goal.DoesNotExist:
        return JsonResponse({"error": "Goal not found or not authorized"}, status=404)
    except Exception as e:
        return JsonResponse({"error": f"An error occurred: {str(e)}"}, status=500)

@login_required 
def update_goal_progress(request):
    if request.method != "POST":
        return JsonResponse({"error": "Goal update requests must be POST"}, status=400)
    
    try:
        data = json.loads(request.body)
    except json.JSONDecodeError:
        return JsonResponse({"error": "Invalid JSON"}, status=400)
    
    goal_id = data.get("id")
    amount = data.get("amount")
    update_type = data.get("type")
    
    if not goal_id or amount is None or update_type not in ["increase", "decrease"]:
        return JsonResponse({"error": "Missing or invalid parameters"}, status=400)
    
    try:
        amount = int(amount)
        if amount <= 0:
            return JsonResponse({"error": "Amount must be greater than 0"}, status=400)
    except (ValueError, TypeError):
        return JsonResponse({"error": "Amount must be a valid integer"}, status=400)
    
    try:
        goal = Goal.objects.get(id=goal_id, user=request.user)
        
        if update_type == "increase":
            goal.current_progress += amount
        elif update_type == "decrease":
            goal.current_progress -= amount
        
        if goal.current_progress >= goal.goal_amount:
            goal.closed = True
        
        goal.save()
        update = Update(goal=goal, amount=amount, type=update_type)
        update.save()
        if goal.closed:
            close_update = Update(goal=goal, amount=0)
            close_update.save()
        return JsonResponse({"message": "Goal progress successfully updated"}, status=200)
    except Goal.DoesNotExist:
        return JsonResponse({"error": "Goal not found or not authorized"}, status=404)
    except Exception as error:
        print(error)
        return JsonResponse({"error": f"An error occurred: {str(error)}"}, status=500)

@login_required
def get_user_data(request):
    if request.method != "GET":
        return JsonResponse({"error": "User data requests must be GET"}, status=400)
    
    user = request.user
    user_data = {
        "username": user.username,
        "email": user.email,
        "date_joined": user.date_joined,
        "last_login": user.last_login
    }
    
    return JsonResponse({"user": user_data}, status=200)