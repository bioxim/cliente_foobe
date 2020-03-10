const Perfiles = require('../models/Perfiles');

// Nuevo Mensaje
exports.nuevoMensaje = async (req, res, next) => {
	const perfil = new Perfiles(req.body);
	try {
		await perfil.save();
		res.json({ mensaje: 'Se agregó un nuevo mensaje' });
	} catch(error) {
		console.log(error);
		next();
	} 
}

// Muestra todos los mensajes
exports.mostrarMensajes = async (req, res, next) => {
	try {
		const perfiles = await Perfiles.find({});
		res.json(perfiles);
	} catch(error) {
		console.log(error);
		next();
	}
}

// Muestra un mensaje por su ID
exports.mostrarMensaje = async (req, res, next) => {
	const perfil = await Perfiles.findById(req.params.idPerfil);

	if(!perfil) {
		res.json({ mensaje: 'Ese mensaje no existe' });
		return next();
	}

	// Mostrar el pedido
	res.json(mensaje);
}

// Actualizar el mensaje vía ID
exports.actualizarMensaje = async (req, res, next) =>{
	try {
		let perfil = await Perfiles.findOneAndUpdate({ _id: req.params.idPerfil }, req.body, {
			new: true
		});

		res.json(perfil);

	} catch(error) {
		console.log(error);
		next();
	}
}

// Elimina el tagline por su id
exports.eliminarMensaje = async (req, res, next) => {
	try {
		await Perfiles.findOneAndDelete({ _id: req.params.idPerfil });
		res.json({ mensaje: 'El mensaje se ha eliminado' });
	} catch(error) {
		console.log(error);
		next();
	}
}