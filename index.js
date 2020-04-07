const express = require('express');
const routes = require('./routes');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
require ('dotenv').config({ path: 'variables.env'});

// conectar mongo
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true,
	useFindAndModify: false
});

// crear el servidor
const app = express();

// Carpeta pública
app.use(express.static('uploads/tradeshows'));
app.use(express.static('uploads/docs'));
app.use(express.static('uploads/profiles'));
app.use(express.static('uploads/pdfs'));

// validación de campos
app.use(expressValidator());

// habilitar body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Habilitar cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

// Rutas de la App
app.use('/', routes());

const port = 5000;

app.get('/', (req, res) => res.send('Esta es la api de foobe.com.ar'));

// iniciar app (agrego host para el localhost)
app.listen(port, () => {
	console.log('el servidor está funcionando en el puerto:', port);
});