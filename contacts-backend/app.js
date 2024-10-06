const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const socketIo = require('socket.io');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/contactsDB');

// Models
const Contact = mongoose.model('Contact', new mongoose.Schema({
  name: String,
  phone: String,
  address: String,
  notes: String,
  isLocked: { type: Boolean, default: false }
}));

// Users
const users = [
  { username: 'user1', password: bcrypt.hashSync('user1', 8) },
  { username: 'user2', password: bcrypt.hashSync('user2', 8) }
];

// Login route
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);
  if (user && bcrypt.compareSync(password, user.password)) {
    const token = jwt.sign({ username }, 'secretkey', { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

// Contacts API
app.post('/contacts', (req, res) => {
  const contact = new Contact(req.body);
  contact.save().then(contact => res.json(contact));
});

app.get('/contacts', async (req, res) => {
  const { page = 1, limit = 5, filter = '' } = req.query;
  const query = { name: new RegExp(filter, 'i') };
  const contacts = await Contact.find(query)
    .skip((page - 1) * limit)
    .limit(parseInt(limit));
  res.json(contacts);
});

app.put('/contacts/:id', async (req, res) => {
  const { id } = req.params;
  const contact = await Contact.findById(id);
  if (contact) {
    contact.isLocked = true;
    await contact.save();
    res.json(contact);
  } else {
    res.status(404).json({ error: 'Contact not found' });
  }
});

app.delete('/contacts/:id', async (req, res) => {
  const { id } = req.params;
  const contact = await Contact.findByIdAndDelete(req.params.id);
  if (!contact) {
      return res.status(404).send('Contact not found');
  }  
  res.send('Contact deleted');
});

// Start the server
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Setup Socket.io
const io = socketIo(server);

io.on('connection', (socket) => {
  console.log('User connected');
  socket.on('lockContact', (contactId) => {
    io.emit('contactLocked', contactId);
  });
});
