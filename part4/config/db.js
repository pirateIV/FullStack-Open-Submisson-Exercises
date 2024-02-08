const mongoose = require('mongoose');
const { MONGO_URI } = require('../utils/config');
const { info, error } = require('../utils/logger');

const connectDB = async () => {
	info('connecting to ', MONGO_URI);

	mongoose
		.connect(MONGO_URI)
		.then(() => {
			info('connected to the mongoDB database...');
		})
		.catch((err) => {
			error(err);
		});
};

module.exports = connectDB;
