const express = require('express');
const connectDB = require('./database/config');
const jobRoutes = require('./routes/jobRoutes');
const templateRoutes = require('./routes/templateRoutes');
const bodyParser = require('body-parser');

connectDB();

const app = express();

app.use(bodyParser.json());

app.use('/api/jobs', jobRoutes);
app.use('/api/template', templateRoutes);

app.listen(5000, () => {
  console.log('listening on port 5000');
});
