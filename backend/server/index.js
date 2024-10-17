const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors())
app.use(express.json());

app.get('/', (req, res) => {
  res.json({message: "Hello Emmanuel"});
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