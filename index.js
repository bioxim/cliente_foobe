const express = require('express');
const routes = require('./routes');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
require ('dotenv').config({ path: 'variables.env'});

// Cors permite que un cliente se conecte a otro servidor para el intercambio de recursos
const cors = require('cors');

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

// Definir un dominio(s) para recibir las peticiones
const whitelist = [process.env.FRONTEND_URL, process.env.BACKEND_URL, process.env.FRONTEND, process.env.CLIENTE, process.env.SERVIDORLOCAL];
//console.log(whitelist);
const corsOptions = {
	origin: (origin, callback) => {
		//console.log(origin);
		// Revisar si la petición viene de un servidor que está en la lista whitelist
		const existe = whitelist.some( dominio => dominio === origin );
		if(existe) {
			callback(null, true);
		} else {
			callback(new Error('No permitido por CORS'));
		}
	}
}

// Habilitar cors
app.use(cors(corsOptions));

// Rutas de la App
app.use('/', routes());

//const host = 'localhost';
const port = 5000;

app.get('/', (req, res) => res.send('Esta es la api de foobe.com.ar'));

// iniciar app (agrego host para el localhost)
app.listen(port, () => {
	console.log('el servidor está funcionando en el puerto:', port);
});