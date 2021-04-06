const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'User must have a name!']
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
  },
  photo: { type: String, default: 'default.jpg' },
  role: {
    type: String,
    enum: ['user', 'regent', 'admin'],
    default: 'user',
  },
  favourites: {
    type: [mongoose.Schema.ObjectId],
    ref: 'Title',
  },
  currents: {
    type: [mongoose.Schema.ObjectId],
    ref: 'Title',
  },
  completed: {
    type: [mongoose.Schema.ObjectId],
    ref: 'Title',
  },
  planned: {
    type: [mongoose.Schema.ObjectId],
    ref: 'Title',
  },
  onHold: {
    type: [mongoose.Schema.ObjectId],
    ref: 'Title',
  },
  dropped: {
    type: [mongoose.Schema.ObjectId],
    ref: 'Title',
  },
  password: {
    type: String,
    required: [true, 'User must have a password'],
    minlength: 8,
    select: false,
  },
  confirmPassword: {
    type: String,
    required: [true, 'User have to confirm his password'],
    validate: {
      // This only works on CREATE and SAVE!!!
      validator: function (el) {
        return el === this.password;
      },
      message: 'Passwords are not the same!',
    },
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
});

// Document Middleware

//  Run this only if pasword was modified ex: (Sign Up)
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);
  this.confirmPassword = undefined;
});

// Set password Date change when user changed own password
userSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;
  next();
});

// Instance method for all documents -> User

// Compare jwt token to confirm correct password
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

// Check if password was Changed
userSchema.methods.checkPasswordChanged = function (JWTtimesTamp) {
  // JWTtimesTamp stads for when token was issued
  if (this.passwordChangedAt) {
    // changedTimesTamp when password was changed
    const changedTimesTamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    // Will be true, if user has changed password, after token was issued!
    return JWTtimesTamp < changedTimesTamp;
  }

  return false;
};

// Create token for reseting Password
userSchema.methods.createResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto //  set passwordReset token
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000; //  Set expires time for reset token

  return resetToken;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
