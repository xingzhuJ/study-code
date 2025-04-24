const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const dataController = require('../controllers/dataController');

// User routes
router.get('/users', userController.getAllUsers);
router.get('/users/:id', userController.getUserById);
router.post('/users', userController.createUser);
router.put('/users/:id', userController.updateUser);
router.delete('/users/:id', userController.deleteUser);

// Data routes
router.get('/data', dataController.getAllData);
router.get('/data/:id', dataController.getDataById);
router.post('/data', dataController.createData);
router.put('/data/:id', dataController.updateData);
router.delete('/data/:id', dataController.deleteData);

module.exports = router;
