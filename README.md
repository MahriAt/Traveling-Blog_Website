# Traveling Blog

A full-stack travel blog application built with **React, TypeScript, Node.js, Express, and MongoDB**.

The website allows visitors to explore travel stories, while the author can log in and manage stories by creating, editing, and deleting posts with images.

## Features

### Home Page

* Introduction and travel-related content
* Latest adventure section
* Direct links to individual travel stories
* Author login option
* Remembers whether the visitor is an author or a regular visitor

### Travel Stories

* Display travel stories stored in MongoDB
* View story title, country, date, description, and images
* Open individual stories through dynamic routes
* Formatted and readable dates
* Multiple images per travel story
* Full-screen story pop-out

### Author Mode

The website has a single author account.

After successful login:

* Author-only controls become available
* Create new travel stories
* Edit existing stories
* Delete stories
* Upload multiple images
* Author session is temporarily stored in `localStorage`
* The author does not need to log in again after every page refresh

Regular visitors do not see the author controls.

### Image Uploads

Images are uploaded using `multipart/form-data` and handled by **Multer** on the backend.

Uploaded images are:

* Saved in the backend `uploads/` directory
* Stored as paths in MongoDB
* Served to the React frontend through the Express server

### Contact

A contact section allows visitors to send messages through the backend.

### Routing

The frontend uses **React Router** for navigation.

Example routes:

```text
/                       Home
/traveling              All travel stories
/traveling/:travelId    Individual travel story
/about                  About page
/contact                Contact page
```

## Technologies

### Frontend

* React
* TypeScript
* React Router
* CSS
* Vite
* Fetch API

### Backend

* Node.js
* Express
* MongoDB
* Mongoose
* Multer
* Morgan
* Body Parser
* CORS

### Database

* MongoDB Atlas

## Project Structure

```text
traveling-blog/
│
├── frontend/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── Header.tsx
│   │   │   ├── LogIn.tsx
│   │   │   ├── UploadStories.tsx
│   │   │   ├── Globe.tsx
│   │   │   ├── LatestAdventure.tsx
│   │   │   ├── Quote.tsx
│   │   │   ├── StoryMarquee.tsx
│   │   │   └── travelCard.tsx
│   │   │   
│   │   │
│   │   ├── pages/
│   │   │   ├── Home.tsx
│   │   │   ├── Traveling.tsx
│   │   │   ├── About.tsx
│   │   │   └── Contact.tsx
│   │   │
│   │   ├── data/
│   │   ├── styles/
│   │   ├── App.tsx
│   │   └── main.tsx
│   │
│   ├── package.json
│   └── index.html
│
├── backend/
│   ├── controllers/
│   ├── models/
│   │   ├── Travel.js
│   │   └── ...
│   │
│   ├── routes/
│   │   ├── travels.js
│   │   ├── contacts.js
│   │   └── auth.js
│   │
│   ├── uploads/
│   ├── app.js
│   ├── server.js
│   └── package.json
│
└── README.md
```

> The exact folder structure may differ depending on the current organization of the project.

## API Endpoints

### Travel Stories

#### Get all stories

```http
GET /travel
```

Returns all travel stories stored in MongoDB.

#### Get one story

```http
GET /travel/:travelId
```

Returns a specific travel story by its MongoDB ID.

#### Create a story

```http
POST /travel
```

Creates a new travel story.

The request uses `multipart/form-data` because it can contain image files.

Example fields:

```text
title
country
date
description
image
```

Multiple images can be uploaded with the `image` field.

#### Update a story

```http
PATCH /travel/:travelId
```

Updates an existing travel story.

The request can contain:

```text
title
country
date
description
image
```

Images can also be replaced by uploading new files.

#### Delete a story

```http
DELETE /travel/:travelId
```

Deletes a travel story from MongoDB.

### Contact

```http
POST /contact
```

Sends a message from the contact form to the backend.

### Authentication

```http
POST /auth/login
```

Checks the author's username and password.

The current project uses a single author account. The frontend stores the author session locally for a limited period.

## Travel Data Structure

A travel story contains information similar to:

```json
{
    "_id": "mongodb-id",
    "title": "3 Day Travel to Brazil",
    "country": "Brazil",
    "date": "2022-12-30",
    "description": "Amazon forest was great",
    "image": [
        "/uploads/image1.jpg",
        "/uploads/image2.jpg"
    ]
}
```

## Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd traveling-blog
```

### 2. Install frontend dependencies

```bash
cd frontend
npm install
```

### 3. Install backend dependencies

```bash
cd ../backend
npm install
```

### 4. Configure MongoDB

Create a MongoDB Atlas database and configure the MongoDB connection string in the backend.


For example:

```env
MONGO_ATLAS_PW=your_mongodb_password
```

Make sure `.env` files are included in `.gitignore`.

### 5. Start the backend

From the backend directory:

```bash
npm start
```

or, if using a development script:

```bash
npm run dev
```

### 6. Start the frontend

From the frontend directory:

```bash
npm run dev
```

The frontend will normally be available at:

```text
http://localhost:5173
```

The backend runs separately on its configured port.

## Environment Variables

Sensitive information should be stored in environment variables.

Example:

```env
MONGO_ATLAS_PW=your_password
```

## Application Flow

```text
                    ┌───────────────┐
                    │   React App   │
                    └───────┬───────┘
                            │
              ┌─────────────┼─────────────┐
              │             │             │
              ▼             ▼             ▼
           Travel         Login        Contact
              │             │             │
              └─────────────┼─────────────┘
                            │
                            ▼
                    ┌───────────────┐
                    │ Node / Express│
                    └───────┬───────┘
                            │
                            ▼
                    ┌───────────────┐
                    │    MongoDB    │
                    └───────────────┘
```

For image uploads:

```text
React form
    │
    │ multipart/form-data
    ▼
Express + Multer
    │
    ├── Image → uploads/
    │
    └── Story data → MongoDB
```

## Author vs Visitor

When the Home page is opened, the application determines whether the user is an author or a visitor.

```text
                  Home Page
                      │
              Are you the author?
                 /          \
               Yes           No
                │             │
                ▼             ▼
              Login        Visitor mode
                │
                ▼
         Author mode enabled
                │
        ┌───────┼────────┐
        ▼       ▼        ▼
       Add     Edit    Delete
      Story    Story    Story
```

The visitor/author choice is stored locally so that the user does not have to answer the question on every refresh.

## Future Improvements

Possible future improvements include:

* JWT or session-based authentication
* Backend authorization for author-only endpoints
* Image deletion from the server when a story is deleted
* Image replacement instead of completely replacing an image collection
* Pagination for a large number of stories
* Search and filtering by country
* Interactive world map
* Loading and error states
* Responsive/mobile improvements
* Deployment of the frontend and backend
* Improved validation and security
* Cloud-based image storage

## License

This project is created as a personal/educational project.

Feel free to use it as inspiration for your own travel blog application.
