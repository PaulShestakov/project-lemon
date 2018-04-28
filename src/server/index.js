const http = require('http');
const path = require('path');
const express = require('express');


const port = process.env.PORT || 8080;

const app = express();

app.use('/static/', express.static(path.join(__dirname, '../../dist')));

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, '../../dist/index.html'));
});


const server = http.createServer(app);
server.listen(port);
