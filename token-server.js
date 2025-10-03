// token-server.js
const express = require('express');
const app = express();

// MIDDLEWARE WAJIB
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 🔐 LIST TOKEN YANG VALID
const VALID_TOKENS = [
  '8222126932:AAE0LkpotffLHNFtVrVoqUM9cpU861uOKvU',
  '8332373171:AAGUIGrvbVR9wnAbD88bF_2ck2hUW9k1mBc'
];

// 🏠 HOME PAGE
app.get('/', (req, res) => {
  res.json({ 
    status: 'Active',
    message: 'Token Validator Server is Running!',
    endpoint: 'POST /validate-token'
  });
});

// ✅ ENDPOINT VALIDASI TOKEN - PASTIKAN PATH NYA BENAR
app.post('/validate-token', (req, res) => {
  try {
    console.log('📥 Received validation request');
    
    const { token } = req.body;
    
    if (!token) {
      console.log('❌ No token provided');
      return res.json(false);
    }
    
    // Validasi token
    const isValid = VALID_TOKENS.includes(token);
    
    console.log(`🔐 Token validation result: ${isValid ? 'VALID' : 'INVALID'}`);
    
    // ⚡ RETURN BOOLEAN LANGSUNG
    res.json(isValid);
    
  } catch (error) {
    console.error('❌ Server error:', error);
    res.json(false);
  }
});

// Handle 404 untuk route yang tidak ada
app.use('*', (req, res) => {
  res.status(404).json({ 
    error: 'Endpoint not found',
    available_endpoints: ['GET /', 'POST /validate-token']
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Server running on port ${PORT}`);
});
