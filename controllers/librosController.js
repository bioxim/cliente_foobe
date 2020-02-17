const Libros = require('../models/Libros');

exports.nuevoLibro = async (req, res, next) => {
	const libro = new Libros(req.body);
	try {
		await libro.save();
		res.json({ mensaje: 'Se agregó un nuevo libro' });
	} catch(error) {
		console.log(error);
		next();
	}
}

// Muestra todos los pedidos
exports.mostrarLibros = async (req, res, next) => {
	try {
		const libros = await Libros.find({})
			.populate('feria')
			.populate({
				path: 'libro.tarjeta',
				model: 'Tarjetas'
			})
			.populate({
				path: 'librof.libropdf',
				model: 'Librosf'
			});
		res.json(libros);
	} catch(error) {
		console.log(error);
		next();
	}
}

// Muestra un pedido por su ID
exports.mostrarLibro = async (req, res, next) => {
	const libro = await Libros.findById(req.params.idLibro)
		.populate('feria')
		.populate({
			path: 'libro.tarjeta',
			model: 'Tarjetas'
		})
		.populate({
			path: 'librof.libropdf',
			model: 'Librosf'
		});

	if(!libro) {
		res.json({ mensaje: 'Ese libro no existe' });
		return next();
	}

	// Mostrar el libro
	res.json(libro);
}
// Actualizar el pedido vía ID
exports.actualizarLibro = async (req, res, next) =>{
	try {
		let libro = await Libros.findOneAndUpdate({ _id: req.params.idLibro }, req.body, {
			new: true
		})
		.populate('feria')
		.populate({
			path: 'libro.tarjeta',
			model: 'Tarjetas'
		})
		.populate({
			path: 'librof.libropdf',
			model: 'Librosf'
		});

		res.json(libro);

	} catch(error) {
		console.log(error);
		next();
	}
}

// Elimina el pedido por su id
exports.eliminarLibro = async (req, res, next) => {
	try {
		await Libros.findOneAndDelete({ _id: req.params.idLibro });
		res.json({ mensaje: 'El libro se ha eliminado' });
	} catch(error) {
		console.log(error);
		next();
	}
}