require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const workoutsRouter = require('./routes/workouts');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

// Routes
app.use('/api/workouts/', workoutsRouter);

// اتصال بقاعدة البيانات وتشغيل السيرفر
mongoose
    .connect(process.env.MONG_URI)
    .then(() => {
        console.log('Connected to DB');

        // التأكد من استماع السيرفر على المنفذ الصحيح
        const port = process.env.PORT || 4000; // تحديد المنفذ مع قيمة افتراضية
        app.listen(port, '0.0.0.0', () => {
            console.log(`Server is running on port ${port}`);
        });
    })
    .catch((error) => {
        console.error('Error connecting to DB:', error);
        process.exit(1); // إنهاء العملية إذا فشل الاتصال بقاعدة البيانات
    });

module.exports = app;
