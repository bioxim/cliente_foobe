const Productores = require('../models/Productores');

// Nuevo
exports.nuevoProductor = async (req, res, next) => {

	req.sanitizeBody('nombre').escape();
    req.sanitizeBody('apellido').escape();
    req.sanitizeBody('email').escape();
    req.sanitizeBody('telefono').escape();
    req.sanitizeBody('producto').escape();
    req.sanitizeBody('zona').escape();
    req.sanitizeBody('direccion').escape();
    req.sanitizeBody('pais').escape();
    req.sanitizeBody('ciudad').escape();
    req.sanitizeBody('estado').escape();

	const productor = new Productores(req.body);

	try {
		await productor.save();
		res.json({ mensaje: 'Se agregó un nuevo productor' });
	} catch(error) {
		console.log(error);
		next();
	} 
}

exports.mostrarProductores = async (req, res, next) => {
	try {
		const productores = await Productores.find({});
		res.json(productores);
	} catch(error) {
		console.log(error);
		next();
	}
}

exports.mostrarProductor = async (req, res, next) => {
	const productor = await Productores.findById(req.params.idProductor);

	if(!productor) {
		res.json({ mensaje: 'Ese productor no existe' });
		return next();
	}

	res.json(productor);
}

// Actualizar el card vía ID
exports.actualizarProductor = async (req, res, next) =>{
	try {
		let productor = await Productores.findOneAndUpdate({ _id: req.params.idProductor }, req.body, {
			new: true
		});

		res.json(productor);

	} catch(error) {
		console.log(error);
		next();
	}
}

// Elimina el tagline por su id
exports.eliminarProductor = async (req, res, next) => {
	try {
		await Productores.findOneAndDelete({ _id: req.params.idProductor });
		res.json({ mensaje: 'El productor se ha eliminado' });
	} catch(error) {
		console.log(error);
		next();
	}
}