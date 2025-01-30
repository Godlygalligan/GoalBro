# Welcome to GoalBro

This application is designed to let people create and monitor goals, and keep track of previously achieved goals 

It utilised Django in the backend, and Vite/React in the frontend

## Distinctiveness and Complexity

I believed this application is very different from any of the CS50W projects, old or current, due to the nature of the application.
This applications tracks your progress in certain goals, and allows you to set said goals, as well as keep a history of the goals and any updates you made to those goals.

As far as i am aware, nothing similar is featured in any of the previous CS50W projects

As far as complexity goes, i believe this application is more than sufficient. It utilises Djangos ORM to handle all data passed through the server, and has Django set up as a "backend" server, to which the frontend (Vite/React) has access to via a proxy (See in vite.config.js). Additionally the application is mobile responsive, and maintains the users session if they wish for it to. 

Among other reasons, i believe those features alone make this application more than complex enough

## Backend files

Models.py: Contains the Goal, User, and Update models, as well as the categories for goals

Urls.py: Contains the paths to each of the backend endpoints

views.py: Contains all the endpoints and functions used in the backend

all other django files remain unchanged

# Frontend files

HomePage.jsx: This page handles all "routing" for the app. I decided to use this dynamic rendering approach as opposed to using react-router-dom because it felt more unique, and because i enjoy the page not having URLS

Homepage.module.css: Styles for the homepage

NavBar.jsx: This is a component featured in all but 2 pages (Login, and Register) within the app, allowing users to log out, see their username and access both their current goals and their previous goals

NavBar.module.css: Styles for the nav bar

ProgressBar.jsx: Progress bar that displays the users progress in a goal. Dyanmically fills based on the users goal requirements. Additionally, there is a small CSS animation to make it smoother when updated

Goal.jsx: Displayed on the current and completed goal pages, this component shows a user a preview of their goal and allows them to visit that goal by clicking it.

Goal.module.css: Styles for Goal

GoalPage.jsx: Accessed by clicking on a Goal, This page takes an id, grabs a goals info, and displays it on the page. It also shows the user all of their updates to that goal, and allows the user to updated it. Additionally there is a "Give up" button that shames users for giving up on their goals

GoalPage.module.css: Styles for GoalPage

ErrorDisplay.jsx: A component i borrowed from a personal project, this component displays an error message in red text when rendered

ErrorDisplay.module.css: Styles for Error display

CurrentGoalPage.jsx: The "index" page of the app, allows you to see what goals you currently have, and allows you to add to those goals. You can also sort goals by their category here

CurrentGoalPage.module.css: Styles for the Current goal page

CompletedGoalPage.jsx: This page allows you to see what goals you previously had, and allows you to see which you succeeded in, and which you failed.

CompletedGoalPage.module.css: Styles for the Completed goal page

BackButton.jsx: When clicked, brings the user to the previous page

BackButton.module.css: Styles for the back button

AddGoalPage.jsx: Contains a form that allows the user to create a goal with a name, description, category, goal amount and current progress

AddGoalPage.module.css: Styles for the Add goal page

Register.jsx: A form that allows a user to register for an account

Register.module.css: You can guess what this contains by now

Login.jsx: A form that allows a user to log into their account

Login.module.css: You can guess what this contains by now

context.jsx: Contains context providers that allow the app to use certain functions that connect to the backend and gather or alter data

main.jsx: Renders the App on index.html, and gives it a background image. also wraps the App in the context provider from the file above

app.module.css: styles for the app

README.md: This

index.html: the index html page

index.css: global styles and CSS variables

## How to run: 
In the API directory, run "python manage.py runserver"
In the frontEnd directory, run "npm run dev"
visit the url for the frontend, most likely "localhost:5174"
Voila!



