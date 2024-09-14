const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const projectRoutes = require('./routes/projects');
// Load models
const User = require('./models/User');
const Project = require('./models/Project.js');
const Task = require('./models/Task');
// Middleware
app.use(cors())
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api', require('./routes/tasks'));
// Other imports...
app.use('/api/projects', projectRoutes);
// Basic route
app.get('/', (req, res) => res.send('API running...'));

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// Connect to MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            autoIndex: true  // Ensures indexes are created on startup
        });
        console.log('MongoDB Connected...');
    } catch (err) {
        console.error(err.message);
        process.exit(1); // Exit process with failure
    }
};

// Call the connect function
connectDB();