const express = require('express');
const https = require('https')
const app = express();
const fs = require('fs')
const path = require('path');
const cors = require('cors'); //Cross Origin Resource Sharing (accessing resources over a different network)
const { logger } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const PORT = process.env.PORT || 3502;

/*
//custom middleware logger
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    console.log(`${req.method}\t${req.headers.origin}\t${req.url}`);
    logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`,'reqLog.txt');
    next();
});
*/

//custom middleware logger
app.use(logger);


const whitelist=['https://www.yoursite.com','http://127.0.0.1:5502', 'http://localhost:3502'];
const corsOption = {
    origin: (origin, callback) => {
        if(whitelist.indexOf(origin) !== -1 || !origin){
            callback(null,true);
        }else{
            callback(new Error('Not allowed by CORS'));
        }
    },
    optionsSuccessStatus: 200
};

app.use(cors(corsOption));

//built-in middleware to handle urlecoded data
//in other words, form data:
//'content-type: application/x-www-form-urlencoded'
//pulls form data that is decoded (as strings)
app.use(express.urlencoded({extended: false}));

//built-in middleware for json
app.use(express.json());

//server static files
app.use(express.static(path.join(__dirname, 'public')));

/*
// if http://localhost:3500/ is entered in the browser,
// the 'Hello World! response will be executed'
app.get('/', (req, res) => {
    res.send('Hello World!');
});
*/

app.get('^/$|/index(.html)?', (req, res) => {
    //res.sendFile('./views/index.html', {root: __dirname});
    console.log('index.html');
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/programminglanguages(.html)?', (req, res) => {
    console.log('programminglanguages.html');
    res.sendFile(path.join(__dirname, 'views', 'programminglanguages.html'));
});

//sends a redirect if old-page is request.
app.get('/old-page(.html)?', (req, res) => {
    console.log('301 redirect')
    res.redirect(301, '/new-page.html'); //send a 301 (redirect) status 
});

//Route handlers
app.get('/hello(.html)?', (req, res, next) => {
    console.log('attempted to load hello.html');
    next()
}, (req, res) => {
    res.send('Hello World!');

});

//chainig route handlers
const one = (req, res, next) => {
    console.log('one');
    next();
}

const two = (req, res, next) => {
    console.log('two');
    next();
}

const three = (req, res, next) => {
    console.log('three');
    res.send('Finished');
}

//this create a routing mechanishm. It calls on one, two, 
//three functions then
app.get('/chain(.html)?', [one,two, three]);

 
//cath all blocks
app.all('*',(req, res) =>{
    console.log('404 not found')

    res.status(404);
    if(req.accepts('html')){
        res.sendFile(path.join(__dirname, 'views', '404.html')); //send a 404 (not found) status
    }else if(req.accepts('json ')){
        res.json({error: '404 Not Found'});
    }else{
        res.type('txt').send('404 Not Found');
    }
    
});

app.use(errorHandler);

//app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

//create https server
const sslServer = https.createServer({
    key: fs.readFileSync(path.join(__dirname, '../../../cert','key.pem')),
    cert: fs.readFileSync(path.join(__dirname, '../../../cert','cert.pem')),
},app)

//set a port listener
sslServer.listen(PORT, () => console.log(`Server running on port ${PORT}`))