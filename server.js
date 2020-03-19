// const http = require('http');

// const server = http.createServer();

// server.on('connection', (socket)=> {
//     console.log('NEW CONNECTIONS...');
// });

// server.listen(3000);
// console.log('Listening on port 3000........');


const http = require('http');
const server = http.createServer((req, res)=> {
    if (req.url === '/') {
        res.write('HELLO EVERYBODY');
        res.end();
    }

    if (req.url === "/api/courses") {
        res.write(JSON.stringify([1, 2, 3, 4]));
        res.end();
    }
});

server.listen(3000);
console.log('Listening on port 3000........');