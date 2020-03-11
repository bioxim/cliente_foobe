const Newsletters = require('../models/Newsletters');

// Nuevo
exports.nuevoSuscriptor = async (req, res, next) => {

    req.sanitizeBody('email').escape();

	const suscriptor = new Newsletters(req.body);

	try {
		await suscriptor.save();
		res.json({ mensaje: 'Welcome to our newsletter' });
	} catch(error) {
		console.log(error);
		next();
	} 
}

exports.mostrarSuscriptores = async (req, res, next) => {
	try {
		const suscriptores = await Newsletters.find({});
		res.json(suscriptores);
	} catch(error) {
		console.log(error);
		next();
	}
}

exports.mostrarSuscriptor = async (req, res, next) => {
	const suscriptor = await Newsletters.findById(req.params.idSuscriptor);

	if(!suscriptor) {
		res.json({ mensaje: 'Ese suscriptor no existe' });
		return next();
	}

	res.json(suscriptor);
}

// Actualizar el card vía ID
exports.actualizarSuscriptor = async (req, res, next) =>{
	try {
		let suscriptor = await Newsletters.findOneAndUpdate({ _id: req.params.idSuscriptor }, req.body, {
			new: true
		});

		res.json(suscriptor);

	} catch(error) {
		console.log(error);
		next();
	}
}

// Elimina el tagline por su id
exports.eliminarSuscriptor = async (req, res, next) => {
	try {
		await Newsletters.findOneAndDelete({ _id: req.params.idSuscriptor });
		res.json({ mensaje: 'El suscriptor se ha eliminado' });
	} catch(error) {
		console.log(error);
		next();
	}
}