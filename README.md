
# Project Title

Hiring Manager is a web application for helping Hiring team to filter out best people by uploading job descriptions and providing resumes.
Python/Django with Django Rest Framework is used to create backend
ReactJS is used to create frontend
Open AI is used for filtering and marking resumes

## API Endpoints
The API documentation can be found here: <https://documenter.getpostman.com/view/16611152/2sA2rDwgF1>

## Run Locally
Clone the project
```bash
git clone https://github.com/Arya-veer/Crux-HiringManager
```
Go to the project directory
```bash
cd Crux-HiringManager
```
### Backend
Following are the steps to start the backend server on local machine.
The server will run on localhost using port 8000

1. Move to backend folder
```bash
cd HiringManagerBackend
```

2. Install python3

3. Create a virtual environment (Can be skipped) and activate
```bash
python3 -m venv venv
./venv/Scripts/activate //for windows
source venv/bin/activate //for linux
```

4. Install dependencies
```bash
pip install -r requirements.txt
```

5. Migrate the database
```bash
python manage.py migrate
```
6. Add your own Open AI API key to environment variables   
7. Start the server
```bash
python manage.py runserver
```
8. The backend apis can be accessed at:
```
http://localhost:8000
```

Go to Frontend folder
```bash
cd ../HiringManagerFrontend
```

### Frontend
Following are the steps to start the frontend server on local machine.
The server will start on localhost using port 5173

1. Install NodeJS

2. Install all dependencies
```bash
npm i
```
3. Run frontend application
```bash
npm run dev
```
4. Steps to use frontend
	(a) Go to url http://localhost:5173/
	(b) Add a new Job by clicking `Add Job` button and filling up required details
	(c) On the home page, again click on Job title.
	(d) Upload resumes after clicking `Upload Resumes Button`
	(e) Go back and see the resumes with their score, click on `View Details` button to see all the details
