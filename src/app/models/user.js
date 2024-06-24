const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the Meal schema
const MealSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  title: { type: String, required: true },
  image: { type: String, required: false },
  portionSize: { type: Number, required: true },
  calorieCount: { type: Number, required: true },
  carbCount: { type: Number, required: true },
  proteinCount: { type: Number, required: true }
});

// Define the User schema
const UserSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

// Associate the User schema with the Meal schema
UserSchema.virtual('meals', {
  ref: 'Meal',
  localField: '_id',
  foreignField: 'userId'
});

// Compile the models
const User = mongoose.model('User', UserSchema);
const Meal = mongoose.model('Meal', MealSchema);

module.exports = { User, Meal };