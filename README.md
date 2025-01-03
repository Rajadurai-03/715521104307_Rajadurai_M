# Ice Cream Shop Application

## Project Overview

This Ice Cream Shop application allows users to:
- Browse a menu of available ice creams.
- Select and place orders.
- View the status of their orders.

Admins can manage the ice cream menu and track orders efficiently through the Admin Panel.

## Tech Stack

- **Frontend:** React.js
- **Backend:** Python (Flask/Django)
- **Database:** SQLite

## Pre-requirements

Ensure you have the following installed:
- Python 3.11.4
- Flask and Flask-Cors
- virtualenv (venv)
- Node.js v21.5.0
- Axios

## Setup Instructions

### Clone the Application

To clone the repository, run:
```bash
git clone https://github.com/Rajadurai-03/715521104307_Rajadurai_M.git
cd 715521104307_Rajadurai-M
```
Got it! Here's the Markdown text with only the commands in the code block format and the rest in normal text:


## Set Up the Frontend

To create and set up the frontend, run:

```bash
npx create-react-app frontend
cd frontend
npm install axios
```

## Set Up the Backend

To create and set up the backend, run:

```bash
mkdir backend
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install Flask Flask-Cors
```

## Run Commands

### Frontend

To install dependencies and start the frontend, run:

```bash
npm install
npm start
```

### Backend

To start the backend, navigate to the backend directory and run:

```bash
python app.py
```

## User Credentials

Use the following credentials for logging in:

- **User:** `user` / `user123`
- **Admin:** `admin` / `admin123`
```
