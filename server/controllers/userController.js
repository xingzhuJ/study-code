// In-memory data store for users (in a real app, this would be a database)
let users = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'admin' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'user' }
];

// Get all users
exports.getAllUsers = (req, res) => {
  res.json(users);
};

// Get user by ID
exports.getUserById = (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find(user => user.id === id);
  
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  
  res.json(user);
};

// Create a new user
exports.createUser = (req, res) => {
  const { name, email, role } = req.body;
  
  if (!name || !email) {
    return res.status(400).json({ message: 'Name and email are required' });
  }
  
  const newId = users.length > 0 ? Math.max(...users.map(user => user.id)) + 1 : 1;
  
  const newUser = {
    id: newId,
    name,
    email,
    role: role || 'user'
  };
  
  users.push(newUser);
  res.status(201).json(newUser);
};

// Update a user
exports.updateUser = (req, res) => {
  const id = parseInt(req.params.id);
  const { name, email, role } = req.body;
  
  const userIndex = users.findIndex(user => user.id === id);
  
  if (userIndex === -1) {
    return res.status(404).json({ message: 'User not found' });
  }
  
  const updatedUser = {
    ...users[userIndex],
    name: name || users[userIndex].name,
    email: email || users[userIndex].email,
    role: role || users[userIndex].role
  };
  
  users[userIndex] = updatedUser;
  res.json(updatedUser);
};

// Delete a user
exports.deleteUser = (req, res) => {
  const id = parseInt(req.params.id);
  const userIndex = users.findIndex(user => user.id === id);
  
  if (userIndex === -1) {
    return res.status(404).json({ message: 'User not found' });
  }
  
  users = users.filter(user => user.id !== id);
  res.json({ message: 'User deleted successfully' });
};
