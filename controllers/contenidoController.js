const Contenidos = require('../models/Contenidos');

// Agrega un nuevo Contenido WEB
exports.nuevoContenido = async (req, res, next) => {
	//console.log(req.body);
	const contenido = new Contenidos(req.body);
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
exports.mostrarContenidos = async (req, res, next) => {
	try {
		const contenidos = await Contenidos.find({});
		res.json(contenidos);
	} catch(error) {
		// statements
		console.log(error);
		res.send(error);
		next();
	}
}

// Muestra un módulo web por su ID
exports.mostrarContenido = async (req, res, next) => {
	const contenido = await Contenidos.findById(req.params.idContenido);

	if(!contenido) {
		res.json({mensaje: 'Ese módulo web no existe'});
		next();
	}

	// Mostrar el módulo
	res.json(contenido);
}

// Actualiza un módulo web por su ID
exports.actualizarContenido = async (req, res, next) => {
	try {
		const contenido = await Contenidos.findOneAndUpdate({ _id: req.params.idContenido },
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
exports.eliminarContenido = async (req, res, next) => {
	try {
		await Contenidos.findOneAndDelete({ _id: req.params.idContenido });
		res.json({ mensaje: 'El módulo web se ha eliminado' });
	} catch(error) {
		console.log(error);
		res.send(error);
		next();
	}
}