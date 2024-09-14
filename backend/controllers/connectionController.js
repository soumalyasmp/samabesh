const asyncHandler = require('express-async-handler');
const Connection = require('../models/connectionModel');
const Alumni = require('../models/alumniModel');
const Student = require('../models/currentStudentModel');

// Helper function to create a unique pair key
const createUniquePairKey = (id1, id2) => {
  return id1 < id2 ? `${id1}_${id2}` : `${id2}_${id1}`;
};

// Send a connection request
const sendConnectionRequest = asyncHandler(async (req, res) => {
  const { requesteeId, requesterModel, requesteeModel } = req.body;
  const requesterId = req.user._id; // Get the requester ID from authenticated user

  // Validate models
  if (!['Alumni', 'Student'].includes(requesterModel) || !['Alumni', 'Student'].includes(requesteeModel)) {
    res.status(400).json({ message: 'Invalid model types', received: { requesterModel, requesteeModel } });
    throw new Error('Invalid model types');
  }

  // Ensure requester and requestee are not the same
  if (requesterId === requesteeId) {
    res.status(400).json({ message: 'Requester and requestee cannot be the same' });
    throw new Error('Requester and requestee cannot be the same');
  }

  // Create a unique pair key for the connection request
  const pairKey = createUniquePairKey(requesterId, requesteeId);

  // Check if a request already exists for this pair
  const existingRequest = await Connection.findOne({
    pairKey,
    status: 'Pending',
  });

  if (existingRequest) {
    res.status(400).json({ message: 'Connection request already sent' });
    throw new Error('Connection request already sent');
  }

  // Check if requester and requestee exist in the specified models
  const requesterExists = requesterModel === 'Alumni' 
    ? await Alumni.findById(requesterId) 
    : await Student.findById(requesterId);
  
  const requesteeExists = requesteeModel === 'Alumni' 
    ? await Alumni.findById(requesteeId) 
    : await Student.findById(requesteeId);

  if (!requesterExists || !requesteeExists) {
    res.status(404).json({ message: 'Requester or requestee does not exist' });
    throw new Error('Requester or requestee does not exist');
  }

  // Create a new connection request
  const connection = await Connection.create({
    requester: requesterId,
    requestee: requesteeId,
    requesterModel,
    requesteeModel,
    pairKey,
  });

  res.status(201).json(connection);
});

// Update connection request status
const updateConnectionRequestStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  // Validate the status value
  if (!['Pending', 'Accepted', 'Rejected'].includes(status)) {
    res.status(400);
    throw new Error('Invalid status value');
  }

  // Check if the connection request exists
  const connection = await Connection.findById(id);

  if (!connection) {
    res.status(404);
    throw new Error('Connection request not found');
  }

  // Ensure the status is being set to 'Accepted' or 'Rejected' only if it's 'Pending'
  if (connection.status !== 'Pending') {
    res.status(400);
    throw new Error('Connection request is not in a state that can be updated');
  }

  // Update the status
  connection.status = status;
  const updatedConnection = await connection.save();

  res.json({
    message: 'Connection request status updated successfully',
    updatedConnection,
  });
});

// Get pending connection requests
const getConnectionRequests = asyncHandler(async (req, res) => {
  const { userId } = req.query; // Get the user ID from query parameters

  // Find all connection requests where the logged-in user is the requestee
  const requests = await Connection.find({
    requestee: userId,
    status: 'Pending'
  }).populate('requester', 'name')  // Populate with requester info if needed
    .populate('requestee', 'name');  // Populate with requestee info if needed

  res.json(requests);
});

// Get connected alumni
const getConnectedAlumni = asyncHandler(async (req, res) => {
  const { userId } = req.query;

  // Find all accepted connections where the logged-in user is either the requester or requestee
  const connections = await Connection.find({
    $or: [{ requester: userId }, { requestee: userId }],
    status: 'Accepted',
  })
    .populate('requester', 'name profilePicture') // Populate requester info
    .populate('requestee', 'name profilePicture'); // Populate requestee info

  // Filter the connected alumni based on which side the user is (requester or requestee)
  const connectedAlumni = connections.map((connection) => {
    return connection.requester._id.toString() === userId
      ? connection.requestee
      : connection.requester;
  });

  res.json(connectedAlumni);
});

module.exports = {
  sendConnectionRequest,
  updateConnectionRequestStatus,
  getConnectionRequests,
  getConnectedAlumni,  // Add this new function to exports
};


