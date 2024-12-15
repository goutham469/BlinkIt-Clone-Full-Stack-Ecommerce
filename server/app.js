import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import connectDB from './config/connectDB.js';
import serverless from 'serverless-http';

import userRouter from './route/user.route.js';
import categoryRouter from './route/category.route.js';
import uploadRouter from './route/upload.router.js';
import subCategoryRouter from './route/subCategory.route.js';
import productRouter from './route/product.route.js';
import cartRouter from './route/cart.route.js';
import addressRouter from './route/address.route.js';
import orderRouter from './route/order.route.js';
import surveyRouter from './route/survey.route.js';

dotenv.config();

const app = express();
let mongoConnection = false;

app.use(cors({ origin: [process.env.FRONTEND_URL, 'http://localhost:5173' , 'http://192.168.137.70:5173'], credentials: true }));
app.use(express.json());
app.use(cookieParser());


// Middleware to ensure MongoDB is connected
app.use(async (req, res, next) => {
    if (!mongoConnection) {
        try {
            await connectDB();
            mongoConnection = true;
            next();
        } catch (err) {
            return res.status(500).json({ message: "MongoDB not connected yet" });
        }
    } else {
        next();
    }
});

// Routes
app.use('/api/user', userRouter);
app.use('/api/category', categoryRouter);
app.use('/api/file', uploadRouter);
app.use('/api/subcategory', subCategoryRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/address', addressRouter);
app.use('/api/order', orderRouter);
app.use('/api/survey', surveyRouter);

app.get('/', (req, res) => {
    if (mongoConnection) {
        res.json({ message: 'Server is running!' ,mongoConnection:true});
    } else {
        res.status(500).json({ message: 'MongoDB not connected yet',mongoConnection:false });
    }
});

// Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: "Internal Server Error" });
});

// Export the handler for serverless
export const handler = serverless(app);
