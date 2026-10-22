#AeroStay

AeroStay is a full-stack accommodation listing platform where users can discover properties, publish and manage their own listings, upload images, leave reviews, and view property locations on an interactive map.

**Live demo:** [aerostay-e9n6.onrender.com/listings](https://aerostay-e9n6.onrender.com/listings)

> Note: the demo is hosted on a free tier, so the first load may take a few seconds while the server wakes up.

![AeroStay Screenshot](docs/screenshot.png)

## Features

- **User authentication:** sign up, log in and log out using Passport.js (local strategy)
- **Listings CRUD:** create, view, edit and delete accommodation listings
- **Image uploads:** listing photos are uploaded with Multer and stored on Cloudinary
- **Reviews and ratings:** authenticated users can review listings and delete their own reviews
- **Interactive map:** each listing shows its location on a map
- **Authorization:** only the owner of a listing can edit or delete it, and only a review's author can delete it
- **Validation:** server-side schema validation with Joi
- **Flash messages:** clear success and error feedback for user actions
- **Persistent sessions:** session data stored in MongoDB with connect-mongo

## Tech Stack

| Layer | Technology |
|-------|------------|
| Runtime | Node.js |
| Framework | Express |
| Database | MongoDB with Mongoose |
| Templating | EJS with ejs-mate layouts |
| Authentication | Passport, passport-local, passport-local-mongoose |
| File uploads | Multer, multer-storage-cloudinary, Cloudinary |
| Validation | Joi |
| Sessions and flash | express-session, connect-mongo, connect-flash |
| HTTP client | Axios |
| Deployment | Render |

## Project Structure

```
AeroStay/
├── controllers/     # Route handler logic
├── init/            # Database seed/initialization scripts
├── models/          # Mongoose schemas (Listing, Review, User)
├── public/          # Static assets (CSS, JS, images)
├── routes/          # Express route definitions
├── uploads/         # Temporary upload directory
├── utils/           # Helpers (error handling, async wrappers)
├── views/           # EJS templates
├── app.js           # Application entry point
├── cloudConfig.js   # Cloudinary and Multer storage configuration
├── middleware.js    # Auth, ownership and validation middleware
├── schema.js        # Joi validation schemas
└── package.json
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v22.15.0 (as specified in `package.json`)
- A [MongoDB](https://www.mongodb.com/) database (local or [MongoDB Atlas](https://www.mongodb.com/atlas))
- A free [Cloudinary](https://cloudinary.com/) account
- An API key or token for your map/geocoding provider, if your setup requires one

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/lokeshpatel01/AeroStay.git
cd AeroStay

# 2. Install dependencies
npm install
```

### Environment Variables

Create a `.env` file in the project root:

```env
# Database
ATLASDB_URL=your_mongodb_connection_string

# Session
SECRET=your_session_secret

# Cloudinary
CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret

# Map / geocoding (if applicable)
MAP_TOKEN=your_map_api_token
```

> Make sure the variable names match what your code reads from `process.env`. Never commit your `.env` file. It is already excluded by `.gitignore`.

### (Optional) Seed the Database

```bash
node init/index.js
```

### Run the App

```bash
node app.js
```

Then open [http://localhost:8080](http://localhost:8080) in your browser. If your app listens on a different port, adjust the URL.

## Usage

1. **Browse** all listings at `/listings`
2. **Sign up** for an account, then **log in**
3. **Create a listing** with a title, description, price, location and image
4. Open any listing to see its details, location on the map and reviews
5. **Leave a review** with a rating and comment
6. **Edit or delete** your own listings and reviews from their pages

## Routes Overview

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/listings` | View all listings |
| GET | `/listings/new` | New listing form (auth required) |
| POST | `/listings` | Create a listing (auth required) |
| GET | `/listings/:id` | View a single listing |
| GET | `/listings/:id/edit` | Edit form (owner only) |
| PUT | `/listings/:id` | Update a listing (owner only) |
| DELETE | `/listings/:id` | Delete a listing (owner only) |
| POST | `/listings/:id/reviews` | Add a review (auth required) |
| DELETE | `/listings/:id/reviews/:reviewId` | Delete a review (author only) |
| GET/POST | `/signup` | User registration |
| GET/POST | `/login` | User login |
| GET | `/logout` | User logout |

> Adjust this table to match the routes defined in your `routes/` folder.

## Roadmap

- [ ] Search and filter listings by location, price and category
- [ ] Booking and availability calendar
- [ ] User profile page
- [ ] Image gallery with multiple photos per listing
- [ ] Add a `start` script and automated tests

## Contributing

Contributions are welcome.

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m "Add your feature"`
4. Push to your branch: `git push origin feature/your-feature`
5. Open a pull request

## License

This project is licensed under the ISC License.

## Author

**Lokesh Patel**, [@lokeshpatel01](https://github.com/lokeshpatel01)
