const mongoose = require('mongoose');
const { MONGODB_URI } = require('../utils/config');

mongoose.set('strictQuery', false);

console.log('connecting to ', MONGODB_URI);

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('connected to the database...');
  })
  .catch((error) => {
    console.log('error connecting to the mongoDB: ', error);
  });

const personsSchema = new mongoose.Schema({
  name: { minLength: 3, type: String, required: true },
  number: {
    type: String,
    validate: {
      validator: (value) => {
        const regex = /^\d{2,3}-\d{6}$/;
        return regex.test(value);
      },
      message: (props) => `${props.value} is not a valid phone number`,
    },
    required: [true, 'Contact phone number is required'],
  },
});

personsSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('Person', personsSchema);
