// token-server.js
const express = require('express');
const app = express();

app.use(express.json());

// 🔐 LIST TOKEN YANG DIIZINKAN
const VALID_TOKENS = [
  '8222126932:AAE0LkpotffLHNFtVrVoqUM9cpU861uOKvU',
  '8332373171:AAGUIGrvbVR9wnAbD88bF_2ck2hUW9k1mBc'
  // Tambahkan token lain di sini
];

// 📌 ENDPOINT UTAMA UNTUK VALIDASI
app.post('/validate-token', (req, res) => {
  try {
    const { token } = req.body;
    
    if (!token) {
      return res.json(false);
    }
    
    // Cek apakah token ada di list valid
    const isValid = VALID_TOKENS.includes(token);
    
    // ⚡ HANYA RETURN TRUE/FALSE
    res.json(isValid);
    
    console.log(`🔐 Token validation: ${isValid ? 'VALID' : 'INVALID'}`);
    
  } catch (error) {
    console.error('Error:', error);
    res.json(false);
  }
});

// 🏠 HOME PAGE (buat test aja)
app.get('/', (req, res) => {
  res.json({ 
    message: 'Token Validator Server is Running!',
    endpoint: 'POST /validate-token',
    status: 'Active'
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
