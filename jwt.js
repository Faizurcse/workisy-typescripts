const crypto = require('crypto');

// Generate a random buffer
const buffer = crypto.randomBytes(32);

// Convert the buffer to a base64 string and remove '=' characters
const base64String = buffer.toString('base64').replace(/=/g, '');

console.log(base64String);