const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const os = require('os');
const path = require('path');
const app = express();
const PORT = 3333;
const routes = require('./routes');

app.use(cors());
app.use(morgan('dev'));
app.use('/api', routes);
app.use(express.static(path.resolve(__dirname, '..', 'public')));

app.listen(PORT, () => {
  console.log(`Server running on ${os.hostname()} at port ${PORT} `);
});
