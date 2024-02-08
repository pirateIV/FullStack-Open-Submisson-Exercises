require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const { requestLogger, errorHandler } = require('./utils/middleware/requestLogger');
const { info, error } = require('./utils/logger')

const app = express();

// middleware for parsing json requests
app.use(express.static('dist'));
app.use(express.json());
app.use(requestLogger);
app.use(cors());

morgan.token('body', (req) => JSON.stringify(req.body));

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

app.use('/', require('./controllers/persons'));

app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  info(`Server running on port ${PORT}`);
});
