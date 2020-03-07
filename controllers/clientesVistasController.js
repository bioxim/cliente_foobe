const Tarjetas = require('../models/Tarjetas');
const Libros = require('../models/Libros');
const Usuarios = require('../models/Usuarios');

// Muestra todos los cards
exports.mostrarTarjetas = async (req, res, next) => {
	try {
		const tarjetas = await Tarjetas.find({});
		res.json(tarjetas);
	} catch(error) {
		console.log(error);
		next();
	}
}
// Muestra todos los libros
exports.mostrarBooks = async (req, res, next) => {
	try {
		const libros = await Libros.find({}).populate('feria').populate({
			path: 'libro.tarjeta',
			model: 'Tarjetas'
		});
		res.json(libros);
	} catch(error) {
		console.log(error);
		next();
	}
}