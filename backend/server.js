const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
require('dotenv').config();

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(cors());

const uri = process.env.MONGODB_URI || 'mongodb+srv://vimukthipramudanth:DBFFoAlMKJh23UdI@student01.q1bxh.mongodb.net/myDB?retryWrites=true&w=majority';
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error('MongoDB Connection Error:', err));

const userSchema = new mongoose.Schema({
  nic: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true }
});

userSchema.pre('save', async function(next) {
  const user = this;
  if (user.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
  }
  next();
});

const User = mongoose.model('User', userSchema);

app.post('/api/login', async (req, res) => {
  const { nic, password } = req.body;

  try {
    const user = await User.findOne({ nic });
    if (user && await bcrypt.compare(password, user.password)) {
      res.status(200).json({
        success: true,
        message: 'Login successful',
        user: { nic: user.nic, name: user.name }
      });
    } else {
      res.status(401).json({
        success: false,
        message: 'Invalid NIC number or password'
      });
    }
  } catch (err) {
    console.error('Login Error:', err); // Log the error
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

app.post('/api/register', async (req, res) => {
  const { nic, password, name } = req.body;

  try {
    const existingUser = await User.findOne({ nic });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User with this NIC already exists'
      });
    }

    const newUser = new User({ nic, password, name });
    await newUser.save();

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      user: { nic: newUser.nic, name: newUser.name }
    });
  } catch (err) {
    console.error('Register Error:', err); // Log the error
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});