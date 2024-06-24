const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { User, Meal } = require('../app/models/user');
const cors = require('cors');
const jwt = require('jsonwebtoken');


const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

const PORT = process.env.PORT || 3001;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/KnowWhatYouEat ', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.log("Error connecting to MongoDB", err)
    });



// Middleware to verify JWT token and extract user ID from request headers
const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.sendStatus(401); // Unauthorized if token is not present

    // Verify the token
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
        if (err) return res.sendStatus(403); // Forbidden if token is invalid
        req.userId = decodedToken.userId; // Extract user ID from the token
        next();
    });
};


// Create a new user
app.post('/api/users', async (req, res) => {
    try {
        const newUser = new User(req.body);
        await newUser.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Read all users
app.get('/api/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Read user by ID
app.get('/api/users/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update user by ID
app.patch('/api/users/:id', async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(updatedUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete user by ID
app.delete('/api/users/:id', async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'User deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


// Create a new user meal
app.post('/api/users/:userId/meals', async (req, res) => {
    try {
        const userId = req.params.userId;
        // Create a new meal associated with the specified user ID
        const newMeal = new Meal({ ...req.body, userId });
        await newMeal.save();
        res.status(201).json(newMeal);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


// Read all meals for a user
app.get('/api/users/:userId/meals', async (req, res) => {
    try {
        const userId = req.params.userId;
        const meals = await Meal.find({ userId });
        res.json(meals);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Read meal by ID
app.get('/api/meals/:id', async (req, res) => {
    try {
        const meal = await Meal.findById(req.params.id);
        if (!meal) {
            return res.status(404).json({ message: 'Meal not found' });
        }
        res.json(meal);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update meal by ID
app.patch('/api/meals/:id', async (req, res) => {
    try {
        const updatedMeal = await Meal.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedMeal) {
            return res.status(404).json({ message: 'Meal not found' });
        }
        res.json(updatedMeal);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete meal by ID
app.delete('/api/meals/:id', async (req, res) => {
    try {
        const deletedMeal = await Meal.findByIdAndDelete(req.params.id);
        if (!deletedMeal) {
            return res.status(404).json({ message: 'Meal not found' });
        }
        res.json({ message: 'Meal deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Login route
app.post('/api/auth/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email, password });
        if (user) {
            const token = jwt.sign({ userId: user._id }, 'your_secret_key', { expiresIn: '1h' });
            res.json({ token });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
