const Productos = require('../models/Productos');

// Agrega un nuevo Contenido WEB
exports.nuevoProducto = async (req, res, next) => {
	//console.log(req.body);
	const producto = new Productos(req.body);
	try {
		// almacenar el registro
		await producto.save();
		res.json({ mensaje: 'Se agrego un nuevo producto cod h6s en la web' });
	} catch(error) {
		// si hay error, console.log y next
		console.log(error);
		res.send(error);
		next();
	}
}

// Muestra todos los contenidos
exports.mostrarProductos = async (req, res, next) => {
	try {
		const productos = await Productos.find({});
		res.json(productos);
	} catch(error) {
		// statements
		console.log(error);
		res.send(error);
		next();
	}
}

// Muestra un módulo web por su ID
exports.mostrarProducto = async (req, res, next) => {
	const producto = await Productos.findById(req.params.idProducto);

	if(!producto) {
		res.json({mensaje: 'Ese módulo web no existe'});
		next();
	}

	// Mostrar el módulo
	res.json(producto);
}

// Actualiza un módulo web por su ID
exports.actualizarProducto = async (req, res, next) => {
	try {
		const producto = await Productos.findOneAndUpdate({ _id: req.params.idProducto },
			req.body, {
				new: true
			});
		res.json(producto);
	} catch(error) {
		console.log(error);
		res.send(error);
		next();
	}
}

// Eliminar un módulo web por ID
exports.eliminarProducto = async (req, res, next) => {
	try {
		await Productos.findOneAndDelete({ _id: req.params.idProducto });
		res.json({ mensaje: 'El producto web se ha eliminado' });
	} catch(error) {
		console.log(error);
		res.send(error);
		next();
	}
}