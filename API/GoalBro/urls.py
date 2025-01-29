from django.urls import path

from . import views

urlpatterns = [
    path("goals", views.goals, name="goals"),
    path("register", views.register, name="register"),
    path("login", views.user_login, name="login"),
    path("logout", views.user_logout, name="logout"),
    path("add-goal", views.add_goal, name="add_goal"),
    path("close-goal", views.close_goal, name="close_goal"),
    path("update-goal", views.update_goal_progress, name="update_goal"),
    path("get-user", views.get_user_data, name="get-user"),
    path("categories", views.categories, name="get-user")
]