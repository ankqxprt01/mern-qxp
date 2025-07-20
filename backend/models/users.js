const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: {
      type: String,
      required: true,
      unique: true, //Ensures no duplicates
    },

    // password
    password: {
      type: String,
      required: true,
    },

    isAdmin: {
      type: Boolean,
      default: false,
    },

    // security quest
    // securityAnswer: {
    //   type: String,
    //   required: true,
    // },
    // securityQuestion: {
    //   type: String,
    //   required: false,
    // },
  },
  { timestamps: true } 
);

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);

  // security quest
  //  if (this.isModified('securityAnswer')) {
  //   this.securityAnswer = await bcrypt.hash(this.securityAnswer, 10);
  // }

  next();
});

module.exports = mongoose.model('User', userSchema);
