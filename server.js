const express = require('express');
const jwt = require('jsonwebtoken');
const jwksClient = require('jwks-rsa');

const app = express();
app.use(express.json());

// Google හි JWKS క్ලයින්ට් එක සකස් කිරීම
const client = jwksClient({
  jwksUri: 'https://accounts.google.com/.well-known/openid-configuration'
});

// 공개 කී (Public Key) ලබාගැනීමට අවශ්‍ය ෙහ්තය
function getKey(header, callback) {
  client.getSigningKey(header.kid, function (err, key) {
    if (err) {
      return callback(err);
    }
    const signingKey = key.getPublicKey();
    callback(null, signingKey);
  });
}

// RISC පණිවිඩ ලැබෙන Endpoint එක
app.post('/risc-receiver', (express, res) => {
  const token = req.body.event; // හෝ Google වෙතින් එන format එකට අදාළ ටෝකන් ක්ෂේත්‍රය

  if (!token) {
    return res.status(400).send('Token is missing');
  }

  // JWT ටෝකන් එක ඩිකෝඩ් සහ වැලිඩේට් කිරීම
  jwt.verify(token, getKey, { algorithms: ['RS256'] }, (err, decoded) => {
    if (err) {
      console.error('Token validation failed:', err.message);
      return res.status(400).send('Invalid token');
    }

    // වැලිඩේට් වූ දත්ත (Decoded Payload) මෙතැනින් ලබාගත හැක
    console.log('Decoded RISC Event:', decoded);

    // සාර්ථක ප්‍රතිචාරයක් යැවීම
    res.status(200).send('Event received successfully');
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});