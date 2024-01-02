const express = require('express');
const dotenv = require('dotenv').config();
const mongoose = require('mongoose');

const PORT = process.env.PORT || 8000;

const errorHandler = require('./middleware/errorHandler');
const contactRoutes = require('./routes/contactRoutes');
const userRoutes = require('./routes/userroute');
const myMiddleware = require('./middleware/mymiddleware'); // Import the middleware
const uploadRoutes = require('./utils/FIleUpload')
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to database');
}).catch((err) => {
    console.log(err);
});

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(errorHandler);

// Use your middleware
app.use(myMiddleware);
// build-in middleware for serving static files (images, css, js) from uploads folder to the client
app.use('/api/images', express.static('uploads'));
app.use(express.json());
app.use('/api/contact', contactRoutes);
app.use('/api/users', userRoutes);
app.use('/api/uploads', uploadRoutes);

app.get('/', (req, res) => {
    res.json({ message: 'Hello world' });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
