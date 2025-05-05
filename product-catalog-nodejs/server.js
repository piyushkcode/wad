const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3004;

app.use(express.static('public'));

app.get('/api/products', (req, res) => {
  fs.readFile('products.json', (err, data) => {
    if (err) return res.status(500).json({ error: 'Unable to read product data' });
    res.json(JSON.parse(data));
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
