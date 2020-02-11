const Mensajes = require('../models/Mensajes');

// Nuevo Mensaje
exports.nuevoMensaje = async (req, res, next) => {
	const mensaje = new Mensajes(req.body);
	try {
		await mensaje.save();
		res.json({ mensaje: 'Se agregó un nuevo mensaje' });
	} catch(error) {
		console.log(error);
		next();
	} 
}

// Muestra todos los mensajes
exports.mostrarMensajes = async (req, res, next) => {
	try {
		const mensaje = await Mensajes.find({}).populate('usuario');
		res.json(mensaje);
	} catch(error) {
		console.log(error);
		next();
	}
}

// Muestra un mensaje por su ID
exports.mostrarMensaje = async (req, res, next) => {
	const mensaje = await Mensajes.findById(req.params.idMessage).populate('usuario');

	if(!mensaje) {
		res.json({ mensaje: 'Ese mensaje no existe' });
		return next();
	}

	// Mostrar el pedido
	res.json(mensaje);
}

// Actualizar el mensaje vía ID
exports.actualizarMensaje = async (req, res, next) =>{
	try {
		let mensaje = await Mensajes.findOneAndUpdate({ _id: req.params.idMessage }, req.body, {
			new: true
		})
		.populate('usuario');

		res.json(mensaje);

	} catch(error) {
		console.log(error);
		next();
	}
}

// Elimina el tagline por su id
exports.eliminarMensaje = async (req, res, next) => {
	try {
		await Mensajes.findOneAndDelete({ _id: req.params.idMessage });
		res.json({ mensaje: 'El mensaje se ha eliminado' });
	} catch(error) {
		console.log(error);
		next();
	}
}