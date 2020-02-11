const Administradores = require('../models/Administradores');
const Usuarios = require('../models/Usuarios');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.registrarCliente = async (req, res) => {

	// leer los datos del usuario y colocarlos en Usuarios
	const usuario = new Usuarios(req.body);
	usuario.password = await bcrypt.hash(req.body.password, 12);

	try {
		await usuario.save();
		res.json({mensaje: 'Cliente Creado Correctamente'});
	} catch(error) {
		console.log(error);
		res.json({mensaje: 'Hubo un error cliente duplicado'});
	}

}

exports.registrarUsuario = async (req, res) => {

	// leer los datos del usuario y colocarlos en Usuarios
	const usuario = new Administradores(req.body);
	usuario.password = await bcrypt.hash(req.body.password, 12);

	try {
		await usuario.save();
		res.json({mensaje: 'Administrador Creado Correctamente'});
	} catch(error) {
		console.log(error);
		res.json({mensaje: 'Hubo un error cliente duplicado'});
	}

}

exports.autenticarUsuario = async (req, res, next) => {
	// buscar el usuario
	const { email, password } = req.body;
	const usuario = await Administradores.findOne({ email });

	if(!usuario) {
		// no existe el usuario
		await res.status(401).json({ mensaje: 'This user does not exists'});
		next();
	} else {
		// el usuario existe, verificar si el usuario es correcto o incorrecto
		if(!bcrypt.compareSync(password, usuario.password)) {
			// si el password es incorrecto
			await res.status(401).json({ mensaje: 'Wrong Password' });
			next();
		} else {
			// password correcto, firmar el token
			const token = jwt.sign({
				email: usuario.email,
				nombre: usuario.nombre,
				id: usuario._id
			},
			'SUPERADMINQWEIQW#$$#!!!!',
			{
				expiresIn: '8h'
			});

			// retornar el TOKEN
			res.json({ token });
		}
	}
}

// Muestra todos los usuarios
exports.mostrarUsuarios = async (req, res, next) => {
	try {
		const usuarios = await Administradores.find({});
		res.json(usuarios);
	} catch(error) {
		// statements
		console.log(error);
		next();
	}
}

// Muestra un usuario por su ID
exports.mostrarUsuario = async (req, res, next) => {
	const usuario = await Administradores.findById(req.params.idUsuario);

	if(!usuario) {
		res.json({ mensaje: 'Ese usuario no existe' });
		return next();
	}

	// Mostrar el pedido
	res.json(usuario);
}

// Actualiza un usuario por su ID
exports.actualizarUsuario = async (req, res, next) => {
	try {
		const usuario = await Administradores.findOneAndUpdate({ _id: req.params.idUsuario },
			req.body, {
				new: true
			});
		res.json(usuario);
	} catch(error) {
		console.log(error);
		next();
	}
}

// Eliminar un usuario por ID
exports.eliminarUsuario = async (req, res, next) => {
	try {
		await Administradores.findOneAndDelete({ _id: req.params.idUsuario });
		res.json({ mensaje: 'El usuario se ha eliminado' });
	} catch(error) {
		console.log(error);
		next();
	}
}

// Buscar Administrador por email
exports.buscarAdministrador = async (req, res, next) => {
	try {
		// obtener el query
		const { query } = req.params;
		const usuario = await Administradores.find({ email: new RegExp(query, 'i') });
		res.json(usuario);
	} catch(error) {
		console.log(error);
		next();
	}
}

// CRUD DE CLIENTES
// Muestra todos los usuarios
exports.mostrarClientes = async (req, res, next) => {
	try {
		const usuarios = await Usuarios.find({});
		res.json(usuarios);
	} catch(error) {
		// statements
		console.log(error);
		next();
	}
}

// Muestra un usuario por su ID
exports.mostrarCliente = async (req, res, next) => {
	const usuario = await Usuarios.findById(req.params.idCliente);

	if(!usuario) {
		res.json({ mensaje: 'Ese usuario no existe' });
		return next();
	}

	// Mostrar el pedido
	res.json(usuario);
}

// Actualiza un usuario por su ID
exports.actualizarCliente = async (req, res, next) => {
	try {
		const usuario = await Usuarios.findOneAndUpdate({ _id: req.params.idUsuario },
			req.body, {
				new: true
			});
		res.json(usuario);
	} catch(error) {
		console.log(error);
		next();
	}
}

// Eliminar un usuario por ID
exports.eliminarCliente = async (req, res, next) => {
	try {
		await Usuarios.findOneAndDelete({ _id: req.params.idCliente });
		res.json({ mensaje: 'El usuario se ha eliminado' });
	} catch(error) {
		console.log(error);
		next();
	}
}

// Buscar Cliente por email
exports.buscarCliente = async (req, res, next) => {
	try {
		// obtener el query
		const { query } = req.params;
		const usuario = await Usuarios.find({ email: new RegExp(query, 'i') });
		res.json(usuario);
	} catch(error) {
		console.log(error);
		next();
	}
}
