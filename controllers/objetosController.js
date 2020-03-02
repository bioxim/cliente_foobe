const Objetos = require('../models/Objetos');

exports.nuevoObjeto = async (req, res, next) => {
	const objeto = new Objetos(req.body);
	try {
		await objeto.save();
		res.json({ mensaje: 'Se agregó un nuevo objeto de usuario' });
	} catch(error) {
		console.log(error);
		next();
	}
}

// Muestra todos los pedidos
exports.mostrarObjetos = async (req, res, next) => {
	try {
		const objetos = await Objetos.find({})
			.populate('cliente')
			.populate({
				path: 'perfil.detalleperfil',
				model: 'Perfiles'
			});
		res.json(objetos);
	} catch(error) {
		console.log(error);
		next();
	}
}

// Muestra un pedido por su ID
exports.mostrarObjeto = async (req, res, next) => {
	const objeto = await Objetos.findById(req.params.idObjeto)
		.populate('cliente')
		.populate({
			path: 'perfil.detalleperfil',
			model: 'Perfiles'
		});

	if(!objeto) {
		res.json({ mensaje: 'Ese objeto de usuario no existe' });
		return next();
	}

	// Mostrar el libro
	res.json(objeto);
}
// Actualizar el pedido vía ID
exports.actualizarObjeto = async (req, res, next) =>{
	try {
		let objeto = await Objetos.findOneAndUpdate({ _id: req.params.idObjeto }, req.body, {
			new: true
		})
		.populate('cliente')
		.populate({
			path: 'perfil.detalleperfil',
			model: 'Perfiles'
		});

		res.json(objeto);

	} catch(error) {
		console.log(error);
		next();
	}
}

// Elimina el pedido por su id
exports.eliminarObjeto = async (req, res, next) => {
	try {
		await Objetos.findOneAndDelete({ _id: req.params.idObjeto });
		res.json({ mensaje: 'El objeto libro se ha eliminado' });
	} catch(error) {
		console.log(error);
		next();
	}
}