const express = require('express');
const routes = require('./routes');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
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

// habilitar body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Definir un dominio(s) para recibir las peticiones
const whitelist = [process.env.FRONTEND_URL, process.env.BACKEND_URL, process.env.CLIENTE];
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

const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 5000;

// iniciar app
app.listen(port, host, () => {
	console.log('el servidor está funcionando');
});