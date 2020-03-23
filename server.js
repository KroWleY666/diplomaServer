// This will be our application entry. We'll setup our server here.
const http = require('http');
const app = require('./index'); // The express app we just created

const PORT = parseInt(process.env.PORT, 10) || 8000;
app.set('port', PORT);

const server = http.createServer(app);
//server.listen(PORT);

/*----------START PORT----------*/
//const PORT = process.env.PORT || 5000
server.listen(PORT, () => {
    console.log(`Server has been started on port ${PORT}`)
})