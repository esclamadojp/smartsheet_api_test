const express = require('express');
const httpProxy = require('http-proxy');
const cors = require('cors');

const app = express();
const apiProxy = httpProxy.createProxyServer();

// Define the port for the proxy server
const PORT = 3000;
app.use(cors());

// Define a route that will proxy requests to the Smartsheet API
app.use('/api', (req, res) => {
  apiProxy.web(req, res, {
    target: 'https://api.smartsheet.com',  // Smartsheet API endpoint
    changeOrigin: true,
  });
});

// Start the proxy server
app.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`);
});