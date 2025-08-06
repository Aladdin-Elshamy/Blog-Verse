# Blog Verse Platform
<img width="1920" height="1205" alt="Image" src="https://github.com/user-attachments/assets/6c45c569-4b48-46ca-833c-5dcf30bbda0b" />
A full-stack blog application where users can sign up, sign in, create, edit, and delete blogs, as well as read and search for blogs by author name, tags, or title. Built with React, Tailwind CSS, Node.js, and Express.
Live Preview

## Live Preview
[Blog Platform Live](https://blog-verse-production.up.railway.app/)

## Features
- **User Authentication**: Sign up and sign in securely to access personalized features.
- **Blog Management**: Create, edit, and delete blog posts.
- **Blog Search**: Search blogs by author name, tags, or title.
- **Responsive Design**: Fully responsive UI built with Tailwind CSS for seamless use on all devices.
- **RESTful API**: Backend powered by Node.js and Express for efficient data handling.

## Tech Stack
- **Frontend**: React, Tailwind CSS
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Authentication**: JWT

## Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- (Add database or other requirements)

### Steps
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/yourusername/blog-platform.git
   cd blog-platform
   ```

2. **Install Dependencies**:
   - Backend:
     ```bash
     cd backend
     npm install
     ```
   - Frontend:
     ```bash
     cd frontend
     npm install
     ```

3. **Set Up Environment Variables**:
   - Create a `.env` file in the `backend` directory with the following:
     ```
     PORT=3000
     DATABASE_URL=your_database_connection_string
     JWT_SECRET=your_jwt_secret
     ```
   - (Add other environment variables as needed)

4. **Run the Application**:
   - Start the backend server:
     ```bash
     cd backend
     npm start
     ```
   - Start the frontend development server:
     ```bash
     cd frontend
     npm start
     ```

5. **Access the Application**:
   - Open `http://localhost:3000` in your browser for the frontend.
   - The backend API runs on `http://localhost:5000` (or your specified port).

## Project Structure
```
blog-platform/
├── backend/                  # Node.js/Express backend
│   ├── routes/              # API routes
│   ├── models/              # Database models
│   ├── controllers/         # Request handlers
│   └── server.js            # Entry point
├── frontend/                 # React frontend
│   ├── src/
│   │   ├── components/      # Reusable React components
│   │   ├── pages/           # Page components (e.g., Home, Blog, Auth)
│   │   ├── App.js           # Main app component
│   │   └── index.css        # Tailwind CSS setup
├── README.md                # This file
└── package.json             # Project metadata and scripts
```

## Usage
1. **Sign Up / Sign In**: Create an account or log in to access blog creation features.
2. **Create a Blog**: Navigate to the "Create Blog" page, enter details, and submit.
3. **Edit/Delete Blogs**: Access your blogs from the dashboard to edit or delete.
4. **Search Blogs**: Use the search bar to find blogs by author, tags, or title.
5. **Read Blogs**: Browse all blogs or filter by search criteria.

## Contributing
1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -m 'Add your feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a pull request.

## License
MIT License. See `LICENSE` for more details.
