const Monedas = require('../models/Monedas');

// Agrega un nuevo Contenido WEB
exports.nueva = async (req, res, next) => {
	//console.log(req.body);
	const contenido = new Monedas(req.body);
	try {
		// almacenar el registro
		await contenido.save();
		res.json({ mensaje: 'Se agrego un nuevo módulo en la web' });
	} catch(error) {
		// si hay error, console.log y next
		console.log(error);
		res.send(error);
		next();
	}
}

// Muestra todos los contenidos
exports.mostrar = async (req, res, next) => {
	try {
		const contenidos = await Monedas.find({});
		res.json(contenidos);
	} catch(error) {
		// statements
		console.log(error);
		res.send(error);
		next();
	}
}

// Muestra un módulo web por su ID
exports.mostrarId = async (req, res, next) => {
	const contenido = await Monedas.findById(req.params.idMoneda);

	if(!contenido) {
		res.json({mensaje: 'Ese módulo web no existe'});
		next();
	}

	// Mostrar el módulo
	res.json(contenido);
}

// Actualiza un módulo web por su ID
exports.actualizar = async (req, res, next) => {
	try {
		const contenido = await Monedas.findOneAndUpdate({ _id: req.params.idMoneda },
			req.body, {
				new: true
			});
		res.json(contenido);
	} catch(error) {
		console.log(error);
		res.send(error);
		next();
	}
}

// Eliminar un módulo web por ID
exports.eliminar = async (req, res, next) => {
	try {
		await Monedas.findOneAndDelete({ _id: req.params.idMoneda });
		res.json({ mensaje: 'El módulo web se ha eliminado' });
	} catch(error) {
		console.log(error);
		res.send(error);
		next();
	}
}