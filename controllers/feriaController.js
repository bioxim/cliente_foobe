const mongoose = require('mongoose');
const Ferias = require('../models/Ferias');

const multer = require('multer');
const shortid = require('shortid');
const fs = require('fs');

exports.subirImagen = (req, res, next) => {
	upload(req, res, function(error) {
		//console.log(error);
		if(error) {
			if(error instanceof multer.MulterError) {
				if(error.code === 'LIMIT_FILE_SIZE') {
					res.json( { mensaje: 'El archivo es muy grande: Máximo 100kb' } );
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
	limits: { fileSize : 100000 },
	storage: fileStorage = multer.diskStorage({
        destination : (req, file, cb) => {
            cb(null, __dirname+'../../uploads/tradeshows');
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
            cb(new Error('Formato No Válido'));
        }
    }
}

const upload = multer(configuracionMulter).single('imagen');

// Agrega nueva feria
exports.nuevaFeria = async (req, res, next) => {
	const feria = new Ferias(req.body);

	try {
        if(req.file.filename) {
            feria.imagen = req.file.filename
        }
		await feria.save();
		res.json({ mensaje: 'Se agregó una nueva feria' });
	} catch(error) {
		console.log(error);
		next();
	}
}

// Muestra todas las ferias
exports.mostrarFerias = async (req, res, next) => {
    try {
        const feria = await Ferias.find({});
        res.json(feria);
    } catch(error) {
        console.log(error);
        next();
    }
}

// Muestra 1 feria en particular por su id
exports.mostrarFeria = async (req, res, next) => {
    const feria = await Ferias.findById(req.params.idFeria);

    if(!feria) {
        res.json({ mensaje: 'Esa Feria no existe' });
        return next();
    }

    // Mostrar la feria
    res.json(feria);
}

// Actualiza feria por id
exports.actualizarFeria = async (req, res, next) => {
    try {
        // construir una nueva feria
        let nuevaFeria = req.body;
        // tomo la feria anterior
        let feriaAnterior = await Ferias.findById(req.params.idFeria);
        //console.log(perfilAnterior);

        let imagenAnteriorPath = __dirname + `../../uploads/tradeshows/${feriaAnterior.imagen}`;
        //console.log(imagenAnteriorPath);

        if(feriaAnterior.imagen !== '') {
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
            nuevaFeria.imagen = req.file.filename;

        } else {
            nuevaFeria.imagen = feriaAnterior.imagen;
            
        }

        let feria = await Ferias.findOneAndUpdate({ _id: req.params.idFeria }, nuevaFeria, {
            new: true
        });

        res.json(feria);

    } catch(error) {
        console.log(error);
        next();
    }
}
// Eliminar Feria
exports.eliminarFeria = async (req, res, next) => {
    try {
        let feria = await Ferias.findById(req.params.idFeria);
        //console.log(feria);
        let imagen = __dirname + `../../uploads/tradeshows/${feria.imagen}`;
        //console.log(imagen);
        if(feria.imagen !== '') {
            fs.unlink(imagen, (error) => {
                if(error) {
                    console.log(error);
                }
                return;
            })
        }
        await Ferias.findByIdAndDelete({ _id: req.params.idFeria });
        res.json({ mensaje: 'La feria se ha eliminado '});
    } catch(error) {
        console.log(error);
        next();
    }
}

// Buscar Libros por Feria
exports.buscarFerias = async (req, res, next) => {
    try {
        // obtener el query
        const { query } = req.params;
        const ferias = await Ferias.find({nombre: new RegExp(query, 'i')});
        res.json(ferias);
    } catch(error) {
        console.log(error);
        next();
    }
}