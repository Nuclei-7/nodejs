const { MongoClient } = require('mongodb');
const express = require('express');
const bodyParser = require('body-parser');

// create express service
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connection URL and Database Name
const url = 'mongodb://127.0.0.1:27017';
const databaseName = 'edmtdevnodejs';
const client = new MongoClient(url);
async function dbConnect() {
  try {
    await client.connect();
    const db = client.db(databaseName);
    console.log('Connected to the database successfully');
    return db.collection('user');
  } catch (error) {
    console.error('Error connecting to the database:', error);
    throw error;
  }
}

// Register
app.post('/register', async (request, response) => {
  try {
    const db = await dbConnect();

    const post_data = request.body;
    const password = post_data.password;
    const name = post_data.name;
    const email = post_data.email;

    const insertJson = {
      'email': email,
      'password': password,
      'name': name
    };

    const existingUser = await db.findOne({ 'email': email });
    if (existingUser) {
      response.status(400).json({ message: 'Email already exists' });
      console.log('Email already exists');
    } else {
      await db.insertOne(insertJson);
      response.status(200).json({ message: 'Registration success' });
      console.log('Registration success');
    }
  } catch (error) {
    console.error('Error during registration:', error);
    response.status(500).json({ message: 'Registration failed' });
  }
});
app.post('/login', async (request, response) => {
  try {
    const post_data = request.body;
    const email = post_data.email;
    const userPassword = post_data.password;

    const db = await dbConnect();

    // Check if email exists
    const user = await db.findOne({ 'email': email });

    if (!user) {
      response.status(400).json({ message: 'Email does not exist' });
      console.log('Email does not exist');
    } else {
      const encryptedPassword = user.password; // Get hashed password from user

      // Compare hashed password with the provided password
      if (userPassword === encryptedPassword) {
        response.status(200).json({ message: 'Login successful' });
        console.log('Login successful');
      } else {
        response.status(401).json({ message: 'Wrong password' });
        console.log('Wrong password');
      }
    }
  } catch (error) {
    console.error('Error during login:', error);
    response.status(500).json({ message: 'Login failed' });
  }
});
const PORT = 7000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

