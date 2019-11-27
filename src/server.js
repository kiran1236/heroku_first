const express = require('express');
const path = require('path');

const server = express();

// Specify where the compiled React app lives (copied the files manually from the client build)
const clientAppDirectory = path.join(__dirname, '../public', 'build');

server.use(express.json());

// Middleware that allows users to get files from a directory on the server
server.use(express.static(clientAppDirectory));

// A POST endpoint which will repeat the data back to the client
server.post('/api/postly', (request, response) => {

    console.log('Received request: ' + JSON.stringify(request.body));

    const { testData } = request.body;

    // If the data is a string called 'teapot', return the teapot status code
    if (testData === 'teapot') {

        return response.sendStatus(418);
    }

    // Simply return whatever the client sent to show that the server received it
    return response.status(200)
                   .send('You said ' + testData);
});

// Any other GET request that doesn't match previous routes should return the website
server.get('/*', (request, response) => {

    const indexPath = path.join(clientAppDirectory, 'index.html');

    return response.sendFile(indexPath);
});

// Heroku will populate the PORT environment variable for your application
// If you are testing locally and dont have a PORT environment variable set up, use port 5000
const port = process.env.PORT || 5000;

server.listen(port, () => console.log('Server is up!'));