import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import helmet from 'helmet';
import connectDB from './config/connectDB.js';
import userRouter from './routes/user.route.js';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to handle CORS
app.use(cors({
    origin: process.env.FRONTEND_URL , // Restricts allowed origins to your frontend URL.
    credentials: true, // Allows cookies to be sent across origins.
}));
// app.use(cors({ origin: "http://localhost:3000", credentials: true }));


// Middleware to parse incoming JSON requests
app.use(express.json());

// Middleware to parse cookies in incoming requests
app.use(cookieParser());

// Middleware for logging HTTP requests and errors in a standardized format
app.use(morgan('dev'));

// Middleware for setting secure HTTP headers
app.use(helmet({
    contentSecurityPolicy: false, // Disable CSP if not needed
    crossOriginResourcePolicy: { policy: "same-site" }, // Restrict cross-origin resources
}));


connectDB().then(() => {
    // Route handler for root
    app.get('/', (req, res) => {
        res.json({
            message: `Server is running on ${PORT}`
        });
    });
})

// Routes
app.use('/api/user', userRouter);


// Handle 404 errors (Route not found)
app.use((req, res, next) => {
    res.status(404).json({ message: "Route not found" });
});

// Global error handler (for internal server errors)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Internal Server Error" });
});


// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
