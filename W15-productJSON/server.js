const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

const server = http.createServer((req, res) => {
    // Route 1: Serve the Frontend (index.html)
    if (req.url === '/' || req.url === '/index.html') {
        fs.readFile(path.join(__dirname, 'index.html'), (err, content) => {
            if (err) {
                res.writeHead(500);
                res.end("Internal Server Error: Could not load HTML");
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(content);
            }
        });
    } 

    // Route 2: Product API Endpoint
    else if (req.url === '/api/products' && req.method === 'GET') {
        fs.readFile(path.join(__dirname, 'products.json'), 'utf8', (err, data) => {
            if (err) {
                res.writeHead(500);
                res.end("Internal Server Error: Could not load JSON");
            } else {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(data); // Send the raw JSON string
            }
        });
    }

    // Route 3: 404 Handler
    else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end("404 Not Found");
    }
});

server.listen(PORT, () => {
    console.log(`Product Catalog Server running at http://localhost:${PORT}`);
});