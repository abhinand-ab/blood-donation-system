# Blood Donation System

A full-stack MERN CRUD application for managing blood donors.

## Features

* Add new donors
* View all donors
* Update donor details
* Delete donors
* Search donors by blood group
* Responsive modern UI
* MongoDB Atlas integration

---

## Tech Stack

### Frontend

* React
* Axios

### Backend

* Node.js
* Express.js

### Database

* MongoDB Atlas
* Mongoose

### Version Control

* Git
* GitLab

---

## Project Structure

```bash
Blood/
│
├── client/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── server/
│   ├── models/
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

## Installation

### Clone Repository

```bash
git clone https://gitlab.com/abhinandtvwebyfy-group/blood-donation-system.git
```

---

## Backend Setup

```bash
cd server
npm install
node server.js
```

---

## Frontend Setup

Open another terminal:

```bash
cd client
npm install
npm start
```

---

## API Endpoints

### Create Donor

```http
POST /donors
```

### Get All Donors

```http
GET /donors
```

### Update Donor

```http
PUT /donors/:id
```

### Delete Donor

```http
DELETE /donors/:id
```

### Search Donor By Blood Group

```http
GET /donors/blood/:group
```

---



## Author

Abhinand T V

---

## Future Improvements

* Authentication
* Donor eligibility logic
* Nearby donor search
* Admin dashboard
* Deployment


[def]: image.png