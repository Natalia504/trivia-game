const express = require('express'),
    app = express(),
    PORT = 3000,
    bodyParser = require('body-parser');

app.use(bodyParser.json());


app.get('/', (req, res) => {
    res.send('Hello Natalia!')
});
app.get('/dev', (req, res) => {
    res.send('Hello Ian!')
});



app.listen(PORT, function () { console.log(`Listening on port ${PORT}`) })
