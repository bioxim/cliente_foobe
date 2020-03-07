const Usuarios = require('../models/Usuarios');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.autenticarUsuario = async (req, res, next) => {
	// buscar el usuario
	const { email, password } = req.body;
	const usuario = await Usuarios.findOne({ email });

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
			'LLAVESECRETA',
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
		const usuarios = await Usuarios.find({}).populate('perfil');
		res.json(usuarios);
	} catch(error) {
		// statements
		console.log(error);
		next();
	}
}

// Muestra un usuario por su ID
exports.mostrarUsuario = async (req, res, next) => {
	const usuario = await Usuarios.findById(req.params.idUsuario).populate('perfil');

	if(!usuario) {
		res.json({ mensaje: 'This profile does not exist' });
		return next();
	}

	// Mostrar el pedido
	res.json(usuario);
}

// Actualiza un usuario por su ID
exports.actualizarUsuario = async (req, res, next) => {
	try {
		let usuario = await Usuarios.findOneAndUpdate({ _id: req.params.idUsuario }, req.body, {
			new: true
		})
		.populate('perfil');

		res.json(usuario);

	} catch(error) {
		console.log(error);
		next();
	}
}

// Eliminar un usuario por ID
exports.eliminarUsuario = async (req, res, next) => {
	try {
		await Usuarios.findOneAndDelete({ _id: req.params.idUsuario });
		res.json({ mensaje: 'El libro se ha eliminado' });
	} catch(error) {
		console.log(error);
		next();
	}
}
