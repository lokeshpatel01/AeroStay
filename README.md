# AeroStay – Find Stays & List Your Property

AeroStay is a full-stack accommodation listing platform where users can discover properties, create and manage their own listings, upload images, leave reviews, and view property locations on an interactive map. Built with Node.js, Express, MongoDB, EJS, and Cloudinary.

---

## 🌐 Live Demo

👉 <https://aerostay-e9n6.onrender.com/listings>

> The demo runs on a free tier, so the first load may take a few seconds while the server wakes up.

---

## 💻 GitHub Repository

👉 <https://github.com/lokeshpatel01/AeroStay.git>

---

## 🚀 Features

- Browse all property listings
- Create, edit, and delete listings
- User authentication (Register/Login/Logout)
- Add reviews and ratings
- Interactive map showing property location
- Image upload using Cloudinary
- Protected routes for logged-in users
- Ownership checks (only owners can modify their listings)
- Server-side validation with Joi
- Flash messages for user feedback

---

## 🛠️ Tech Stack

### Frontend

- HTML5
- CSS3
- JavaScript
- EJS (templating) with ejs-mate layouts

### Backend

- Node.js
- Express.js

### Database

- MongoDB (Atlas)
- Mongoose ODM

### Authentication

- Passport.js (passport-local, passport-local-mongoose)
- Express-session with connect-mongo

### Cloud Services

- Cloudinary (image storage)
- Map and geocoding API for location lookup

### Other Libraries

- Multer and multer-storage-cloudinary (file uploads)
- Joi (validation)
- connect-flash (flash messages)
- method-override (PUT/DELETE from forms)
- Axios (HTTP requests)
- dotenv (environment variables)

---

## 📁 Project Structure

```
AeroStay/
├── controllers/          # Request handlers
├── models/               # Database schemas
├── routes/               # Route definitions
├── views/                # EJS templates
├── public/               # Static files (CSS, JS)
├── utils/                # Utility functions
├── init/                 # Database initialization
├── uploads/              # Temporary upload directory
├── middleware.js         # Middleware functions
├── schema.js             # Joi validation schemas
├── app.js                # Main application file
├── cloudConfig.js        # Cloudinary configuration
└── package.json          # Dependencies
```

---

## ⚙️ Installation & Setup

### 1. Clone the repository

```
git clone https://github.com/lokeshpatel01/AeroStay.git
```

### 2. Navigate to the project folder

```
cd AeroStay
```

### 3. Install dependencies

```
npm install
```

### 4. Configure environment variables

Create a `.env` file in the root directory and add the following:

```
PORT=8080
ATLASDB_URL=your_mongodb_url
SECRET=your_secret_key

CLOUD_NAME=your_cloud_name
CLOUD_API_KEY=your_api_key
CLOUD_API_SECRET=your_api_secret
```

### 5. Run the project

**Development:**

```
nodemon app.js
```

**Production:**

```
node app.js
```

The app will run at: **<http://localhost:8080>**

---

## 🔐 Authentication

- User registration and login system
- Session-based authentication with Passport.js
- Sessions stored in MongoDB using connect-mongo
- Protected routes for creating, editing, and deleting listings
- Ownership validation (users can only modify their own listings and reviews)

---

## 🗺️ Map Feature

- Converts a listing's location into coordinates (geocoding)
- Stores the coordinates in MongoDB
- Displays the property location on an interactive map

---

## 📸 Image Upload

- Cloudinary integration for image storage
- Secure file upload handling with Multer
- Image URL and filename saved in the database

---

## ⭐ Show Your Support

If you like this project:

1. ⭐ Star the repository
2. 🍴 Fork it
3. 🔥 Improve it

---

## 📄 License

This project is licensed under the ISC License.

---

*Built with ❤️ using Node.js, Express, MongoDB, and EJS*
