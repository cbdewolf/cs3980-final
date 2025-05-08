# cs3980-final

## Overview

For the final for CS:3980, we decided to further develop Jason's Application Tracker App. The main additions include:
- Implementation of a backend database, as opposed to an in-memory data structure. In this case we used MongoDB.
- Implementation of a user login/register functionality.
- Addition of the Companies, Reminders, and Users collections.
- Logging and testing of the app
- Use of a frontend framework as opposed to vanilla JS, in the case we used React.

## How to Demo

### Create Virtual Environment and Install Dependencies

Backend:

For Windows:

```powershell
python -m venv venv
.\venv\Scripts\activate
pip install -r requirements.txt
```

For macOS:

```zsh
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

Frontend:

Create a new bash/zsh terminal, and input: 

```bash
cd frontend
npm install
```

**NOTE:** You only need to do "npm install" on your first demo

### Launch the App

In your backend shell, ensure you are in the ***root*** of the project, and input:

```powershell
uvicorn backend.main:app --reload
```

It is ***critical*** that you run this command in the root and have the "backend" prefix before "main.app," or else the app won't launch.

This will then prompt the user to go to "http://127.0.0.1:8000/". The page will be blank, that is completely normal, as the frontend and backend run on different ports. Feel free to visit "http://127.0.0.1:8000/docs" to view the Swagger Documentation for the API endpoints. 

For the frontend, go back to your bash/zsh shell where you executed the previous frontend commands. Make sure you are still in the frontend folder, and input:

```bash
npm run dev
```

This will prompt the user to visit "http://localhost:5173/", which is where the frontend is displayed. 

You're all set! The app will continue to run as long as both the FastAPI and npm servers are running!

## How to Use the App

### Login/Register

To use the app, first create an account. You will not be able to access the apps functionality if you are not logged in. Simply click the "Get Started" button and input the required fields to your desire.

### Applications

Once you are logged in, you will be sent to the "Applications" page, where you are free to start adding your applications. Simply, click the "Add New Application" button, and input the fields to your desire. Once the application is added, it will display in the table, for example:

![image](https://github.com/user-attachments/assets/654e6cdd-f649-4720-9880-2fb3b937fbb3)

The user is free to edit and delete applications as they please, as well as view the status of their applications at the top, where Total Apps, Applied, Rejected, etc. is displayed.

### Companies

Companies works similarly to applications, with the goal to add another layer of abstraction and note taking for the user. Simply click "Add New Company," and fill in the fields. Companies is supposed to serve more as a general way of notes for specific companies, as opposed to applications, which is a more specified collection. A completed company entry looks as followed.

![image](https://github.com/user-attachments/assets/51ab7844-0b09-4620-917d-5c15f1a54c47)

Once again, users are free to edit and delete companies as they choose.

### Reminders

Reminders works similarly to the other two collections, with the implementation of a notification feature as well. Simply click "Add Reminder," and input the desired fields. The reminders list will look as follows:

![image](https://github.com/user-attachments/assets/32d03827-2f97-4263-b907-89341a2bc6b0)

Once again, users are free to edit and delete reminders. 

### UserHome

To access the UserHome, click your username at the top right of the screen. The user is then free to add information about themselves, with the goal of adding some basic user customization, as well as file upload/download capabilities. Here is an example of a filled out user profile:

![image](https://github.com/user-attachments/assets/45db9997-d4b5-4092-9821-bac908148ee2)


### Admin

The admin page is only accessible by users given the '"is_admin" : true ' field within the database. Admin users are able to edit/delete users from the database. The admin panel looks as shown.

![image](https://github.com/user-attachments/assets/27f79497-96e6-4c71-8bca-aeeef1b9bda0)

Our admin user has username and password as "admin," if you would like to demo it yourself.

## Code

### Frontend

The frontend was built in React.

### Backend

The backend of this project was built with FastAPI, and uses MongoDB as its database. 
