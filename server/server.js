const express = require('express');
const bodyParser = require('body-parser');

const uuid = require('uuid');
const app = express();

app.use(bodyParser.json());

const PORT = 3000;

const data = [];

app.get('/users', (req, res) => {
  res.json(data);
});

app.delete('/users/:id', (req, res) => {
  const { id } = req.params;
  const index = data.findIndex((user) => user.id === id);
  if (index !== -1) {
    data.splice(index, 1);
    res.send({ message: `User with ID ${id} deleted` });
  } else {
    res.status(404).send({ message: `User not found` });
  }
});

const emailRegex = /\S+@\S+\.\S+/;
const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

app.post('/users', (req, res) => {
  const user = req.body;
  const errors = [];
  const hasAllFields =
    user.name && user.lastName && user.email && user.phoneNumber;
  const hasEmailError = !emailRegex.test(user.email);
  const hasPhoneError = !phoneRegex.test(user.phoneNumber);
  const handleErrors = () => {
    if (hasEmailError) {
      errors.push('email');
    }
    if (hasPhoneError) {
      errors.push('phone number');
    }
  };
  handleErrors();

  if (hasAllFields) {
    if (errors.length) {
      res.status(400).send({
        message:
          errors.length === 1
            ? `Invalid ${errors[0]} format`
            : 'Invalid email and phone number format',
      });
    } else {
      const id = uuid.v4();
      data.push({ ...user, id });
      res.status(201).json({ ...user, id });
    }
  } else {
    res.status(400).send({ message: 'Missing contact data' });
  }
});

app.put('/users/:id', (req, res) => {
  const id = req.params.id;
  const errors = [];
  const userData = req.body;
  const hasAllFields =
    userData.name &&
    userData.lastName &&
    userData.email &&
    userData.phoneNumber;
  const hasEmailError = !emailRegex.test(userData.email);
  const hasPhoneError = !phoneRegex.test(userData.phoneNumber);
  const handleErrors = () => {
    if (hasEmailError) {
      errors.push('email');
    }
    if (hasPhoneError) {
      errors.push('phone number');
    }
  };
  handleErrors();

  if (hasAllFields) {
    if (errors.length) {
      res.status(400).send({
        message:
          errors.length === 1
            ? `Invalid ${errors[0]} format`
            : 'Invalid email and phone number format',
      });
    } else {
      const userIndex = data.findIndex((user) => user.id === id);
      if (userIndex === -1) {
        return res.status(404).send({ message: `User not found` });
      } else {
        data[userIndex] = { ...data[userIndex], ...userData };
        res.status(200).send({ message: 'User updated successfully' });
      }
    }
  } else {
    res.status(400).send({ message: 'Missing contact data' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
