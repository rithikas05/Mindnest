# Mindnest – Personal Notes App

Mindnest is a beautifully designed, full-stack notes application built with the MERN stack. It enables users to create, manage, organize, and securely store personal notes with features like pinning, archiving, trash, and tag filtering. The UI is clean, responsive, and built with attention to accessibility and user experience.

## Live Demo

Frontend: [https://mindnest-frontend-ten.vercel.app](https://mindnest-frontend-ten.vercel.app)

Demo Login:  
**Email**: demo@mindnest.app  
**Password**: 12345678

## Features

- User authentication (JWT-based)
- Create, edit, and delete notes
- Pin and archive functionality
- Trash system with restore and permanent delete
- Search by title, content, or tag
- Sort by date, title, or pin status
- Reminder and tag options
- Slug-based note URLs
- Responsive and mobile-friendly UI
- Dark mode support
- Styled toasts and confirmation modals
- Secure token handling with localStorage
- Protected routes based on auth state

## Tech Stack

### Frontend
- React with Vite
- Tailwind CSS
- React Router DOM
- Axios
- React Hot Toast
- React Feather Icons

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JSON Web Tokens (JWT)
- CORS configuration
- Slugify
- dotenv

## Folder Structure

Mindnest/
│
├── backend/
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ ├── middleware/
│ ├── .env
│ └── server.js
│
├── frontend/
│ ├── src/
│ │ ├── api/
│ │ ├── components/
│ │ ├── context/
│ │ ├── pages/
│ │ ├── styles/
│ │ └── App.jsx / main.jsx
│ ├── .env
│ └── vite.config.js


## Environment Variables

### Backend (.env)

PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
CLIENT_URL=https://mindnest-frontend-ten.vercel.app


### Frontend (.env)
VITE_API_BASE_URL=https://mindnest-backend-y28m.onrender.com/api



## Deployment

- Frontend: [Vercel](https://vercel.com/)
- Backend: [Render](https://render.com/)

## Run Locally

### Backend

cd backend
npm install
npm run dev

### Frontend

cd frontend
npm install
npm run dev

Ensure .env files are set correctly for both frontend and backend.

Author
Rithika Senthil