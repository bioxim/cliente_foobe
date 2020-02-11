const Tarjetas = require('../models/Tarjetas');

// Nuevo
exports.nuevaCard = async (req, res, next) => {
	const card = new Tarjetas(req.body);
	try {
		await card.save();
		res.json({ mensaje: 'Se agregó un nuevo card' });
	} catch(error) {
		console.log(error);
		next();
	} 
}

// Muestra todos los cards
exports.mostrarCards = async (req, res, next) => {
	try {
		const card = await Tarjetas.find({});
		res.json(card);
	} catch(error) {
		console.log(error);
		next();
	}
}

// Muestra un card por su ID
exports.mostrarCard = async (req, res, next) => {
	const card = await Tarjetas.findById(req.params.idCard);

	if(!card) {
		res.json({ mensaje: 'Ese card no existe' });
		return next();
	}

	// Mostrar el pedido
	res.json(card);
}

// Actualizar el card vía ID
exports.actualizarCard = async (req, res, next) =>{
	try {
		let card = await Tarjetas.findOneAndUpdate({ _id: req.params.idCard }, req.body, {
			new: true
		});

		res.json(card);

	} catch(error) {
		console.log(error);
		next();
	}
}

// Elimina el tagline por su id
exports.eliminarCard = async (req, res, next) => {
	try {
		await Tarjetas.findOneAndDelete({ _id: req.params.idCard });
		res.json({ mensaje: 'El card se ha eliminado' });
	} catch(error) {
		console.log(error);
		next();
	}
}

// Buscar Tarjeta por nombre
exports.buscarCard = async (req, res, next) => {
	try {
		// obtener el query
		const { query } = req.params;
		const card = await Tarjetas.find({ nombre: new RegExp(query, 'i') });
		res.json(card);
	} catch(error) {
		console.log(error);
		next();
	}
}

// Buscar Tarjetas
exports.buscarTarjetas = async (req, res, next) => {
	try {
		// obtener el query
		const { query } = req.params;
		const cards = await Tarjetas.find({ email: new RegExp(query, 'i') });
		res.json(cards);
	} catch(error) {
		console.log(error);
		next();
	}
}