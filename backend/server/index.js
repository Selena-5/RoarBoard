const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser'); // Sets up our cookies
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({
  origin: 'http://localhost:3000', // Allows the backend and frontend to communicate
  credentials: true, // Allows us to send cookies from the frontend
}));
app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
  res.json({message: "Hello"});
});

// Include route files
const testRoutes = require('../routes/api/testRoutes');
const userRoutes = require('../routes/api/userRoutes');

// Use routes
app.use('/users', userRoutes);
app.get('/test', testRoutes);


app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});