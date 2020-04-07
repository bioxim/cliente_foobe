const Mensajes = require('../models/Mensajes');

exports.nuevoMensaje = async (req, res, next) => {
	const mensaje = new Mensajes(req.body);
	try {
		await mensaje.save();
		res.json({ mensaje: 'Message sent' });
	} catch(error) {
		console.log(error);
		next();
	}
}

// Muestra todos los mensajes por usuario escritor
exports.mostrarMensajes = async (req, res, next) => {
	try {
		const mensajes = await Mensajes.find({});
		res.json(mensajes);
	} catch(error) {
		console.log(error);
		next();
	}
}

// Muestra un mensaje por su ID
exports.mostrarMensaje = async (req, res, next) => {
	const mensaje = await Mensajes.findById(req.params.idMensaje);

	if(!mensaje) {
		res.json({ mensaje: 'Message not found' });
		return next();
	}

	// Mostrar el libro
	res.json(mensaje);
}
// Actualizar el pedido vía ID
exports.actualizarMensaje = async (req, res, next) =>{
	try {
		let mensaje = await Mensajes.findOneAndUpdate({ _id: req.params.idMensaje }, req.body, {
			new: true
		});

		res.json(mensaje);

	} catch(error) {
		console.log(error);
		next();
	}
}

// Elimina el pedido por su id
exports.eliminarMensaje = async (req, res, next) => {
	try {
		await Mensajes.findOneAndDelete({ _id: req.params.idMensaje });
		res.json({ mensaje: 'Message deleted' });
	} catch(error) {
		console.log(error);
		next();
	}
}