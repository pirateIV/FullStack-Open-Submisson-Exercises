require('dotenv').config();

// eslint-disable-next-line no-undef
const { PORT, MONGO_URI } = process.env;

module.exports = { PORT, MONGO_URI };
