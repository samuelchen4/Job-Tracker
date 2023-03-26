const express = require('express');
const connectDB = require('./database/config');
const jobRoutes = require('./routes/jobRoutes');
const bodyParser = require('body-parser');

connectDB();

const app = express();

app.use(bodyParser.json());

app.use('/api/jobs', jobRoutes);

app.listen(5000, () => {
  console.log('listening on port 5000');
});
