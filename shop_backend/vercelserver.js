const http = require('http');
const vercelapp = require('./vercelapp');
const port = process.env.PORT || 3000;

const server = http.createServer(vercelapp);
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});