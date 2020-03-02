const mongoose = require('mongoose');
const Perfiles = require('../models/Perfiles');

const multer = require('multer');
const shortid = require('shortid');
const fs = require('fs');

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

// Agrega nuevo Perfil
exports.nuevoPerfil = async (req, res, next) => {
	const perfil = new Perfiles(req.body);

	try {
        if(req.file.filename) {
            perfil.imagen = req.file.filename
        }
		await perfil.save();
		res.json({ mensaje: 'Profile added' });
	} catch(error) {
		console.log(error);
		next();
	}
}

// Muestra todos los perfiles
exports.mostrarPerfiles = async (req, res, next) => {
    try {
        const perfiles = await Perfiles.find({});
        res.json(perfiles);
    } catch(error) {
        console.log(error);
        next();
    }
}

// Muestra 1 perfil en particular por su id
exports.mostrarPerfil = async (req, res, next) => {
    const perfil = await Perfiles.findById(req.params.idPerfil);

    if(!perfil) {
        res.json({ mensaje: 'This profile does not exist' });
        return next();
    }

    // Mostrar el perfil
    res.json(perfil);
}

// Actualiza perfil por id
exports.actualizarPerfil = async (req, res, next) => {
    try {
        // construir un nuevo perfil
        let nuevoPerfil = req.body;
        // tomo el perfil anterior
        let perfilAnterior = await Perfiles.findById(req.params.idPerfil);
        //console.log(perfilAnterior);

        let imagenAnteriorPath = __dirname + `../../uploads/profiles/${perfilAnterior.imagen}`;
        //console.log(imagenAnteriorPath);

        if(perfilAnterior.imagen !== '') {
            fs.unlink(imagenAnteriorPath, (error) => {
                if(error) {
                    console.log(error);
                }
                return;
            })
        }

        // verificar si hay imagen nueva
        if(req.file) {
            //Guardo nueva imagen
            nuevoPerfil.imagen = req.file.filename;

        } else {
            nuevoPerfil.imagen = perfilAnterior.imagen;
            
        }

        let perfil = await Perfiles.findOneAndUpdate({ _id: req.params.idPerfil }, nuevoPerfil, {
            new: true
        });

        res.json(perfil);

    } catch(error) {
        console.log(error);
        next();
    }
}
// Eliminar Perfil
exports.eliminarPerfil = async (req, res, next) => {
    try {
        let perfil = await Perfiles.findById(req.params.idPerfil);
        //console.log(perfil);
        let imagen = __dirname + `../../uploads/profiles/${perfil.imagen}`;
        //console.log(imagen);
        if(perfil.imagen !== '') {
            fs.unlink(imagen, (error) => {
                if(error) {
                    console.log(error);
                }
                return;
            })
        }
        await Perfiles.findByIdAndDelete({ _id: req.params.idPerfil });
        res.json({ mensaje: 'This profile has been deleted'});
    } catch(error) {
        console.log(error);
        next();
    }
}