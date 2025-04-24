// In-memory data store (in a real app, this would be a database)
let dataItems = [
  { id: 1, title: 'Sample Data 1', content: 'This is sample data 1', createdAt: new Date().toISOString() },
  { id: 2, title: 'Sample Data 2', content: 'This is sample data 2', createdAt: new Date().toISOString() }
];

// Get all data
exports.getAllData = (req, res) => {
  res.json(dataItems);
};

// Get data by ID
exports.getDataById = (req, res) => {
  const id = parseInt(req.params.id);
  const dataItem = dataItems.find(item => item.id === id);
  
  if (!dataItem) {
    return res.status(404).json({ message: 'Data not found' });
  }
  
  res.json(dataItem);
};

// Create new data
exports.createData = (req, res) => {
  const { title, content } = req.body;
  
  if (!title || !content) {
    return res.status(400).json({ message: 'Title and content are required' });
  }
  
  const newId = dataItems.length > 0 ? Math.max(...dataItems.map(item => item.id)) + 1 : 1;
  
  const newDataItem = {
    id: newId,
    title,
    content,
    createdAt: new Date().toISOString()
  };
  
  dataItems.push(newDataItem);
  res.status(201).json(newDataItem);
};

// Update data
exports.updateData = (req, res) => {
  const id = parseInt(req.params.id);
  const { title, content } = req.body;
  
  const dataIndex = dataItems.findIndex(item => item.id === id);
  
  if (dataIndex === -1) {
    return res.status(404).json({ message: 'Data not found' });
  }
  
  const updatedDataItem = {
    ...dataItems[dataIndex],
    title: title || dataItems[dataIndex].title,
    content: content || dataItems[dataIndex].content,
    updatedAt: new Date().toISOString()
  };
  
  dataItems[dataIndex] = updatedDataItem;
  res.json(updatedDataItem);
};

// Delete data
exports.deleteData = (req, res) => {
  const id = parseInt(req.params.id);
  const dataIndex = dataItems.findIndex(item => item.id === id);
  
  if (dataIndex === -1) {
    return res.status(404).json({ message: 'Data not found' });
  }
  
  dataItems = dataItems.filter(item => item.id !== id);
  res.json({ message: 'Data deleted successfully' });
};
