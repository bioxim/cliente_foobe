const Administradores = require('../models/Administradores');
const Usuarios = require('../models/Usuarios');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const multer = require('multer');
const shortid = require('shortid');
const fs = require('fs');

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

// CRUD DE CLIENTES REGISTRADOS //

exports.subirImagen = (req, res, next) => {
	upload(req, res, function(error) {
		//console.log(error);
		if(error) {
			if(error instanceof multer.MulterError) {
				if(error.code === 'LIMIT_FILE_SIZE') {
					res.json( { mensaje: 'This file is too big: Max size 1Mb' } );
				} else {
					res.json({ mensaje: 'Error no LIMIT_FILE_SIZE' });
				}
			} else {
				//console.log(error.message);
				res.json({ mensaje: error.message });
			}
			return;
		} else {
			return next();
		}
	});
}
// Opciones de Multer
const configuracionMulter = {
	limits: { fileSize : 1000000 },
	storage: fileStorage = multer.diskStorage({
        destination : (req, file, cb) => {
            cb(null, __dirname+'../../uploads/profiles');
        }, 
        filename : (req, file, cb) => {
            const extension = file.mimetype.split('/')[1];
            cb(null, `${shortid.generate()}.${extension}`);
        }
    }),
    fileFilter(req, file, cb) {
        if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' ) {
            // el callback se ejecuta como true o false : true cuando la imagen se acepta
            cb(null, true);
        } else {
            cb(new Error('Format invalid'));
        }
    }
}

const upload = multer(configuracionMulter).single('imagen');

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
	res.json(usuario);
}

// Actualiza un usuario por su ID
exports.actualizarCliente = async (req, res, next) => {
	try {
        
        let nuevoPerfil = req.body;

        // verificar si hay imagen nueva
        if(req.file) {
            nuevoPerfil.imagen = req.file.filename;
        } else {
            let perfilAnterior = await Usuarios.findById(req.params.idCliente);
            nuevoPerfil.imagen = perfilAnterior.imagen;
        }

        let usuario = await Usuarios.findOneAndUpdate({ _id: req.params.idCliente }, nuevoPerfil, {
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
        let usuario = await Usuarios.findById(req.params.idCliente);
        //console.log(perfil);
        let imagen = __dirname + `../../uploads/profiles/${usuario.imagen}`;
        //console.log(imagen);
        if(usuario.imagen !== '') {
            fs.unlink(imagen, (error) => {
                if(error) {
                    console.log(error);
                }
                return;
            })
        }
        await Usuarios.findByIdAndDelete({ _id: req.params.idCliente });
        res.json({ mensaje: 'This member has been deleted'});
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
