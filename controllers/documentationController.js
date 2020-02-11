const mongoose = require('mongoose');
const Documentations = require('../models/Documentations');

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
            cb(null, __dirname+'../../uploads/docs');
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

// Agregar nuevo
exports.nuevoDocumentation = async (req, res, next) => {
	const documentation = new Documentations(req.body);
    //console.log(documentation);

    try {
        if(req.file.filename) {
            documentation.imagen = req.file.filename
        }
        await documentation.save();
        res.json({ mensaje: 'Se agregó una nueva documentación' });
    } catch(error) {
        console.log(error);
        next();
    }
}

// Muestra todas
exports.mostrarDocumentations = async (req, res, next) => {
    try {
        const documentation = await Documentations.find({});
        res.json(documentation);
    } catch(error) {
        console.log(error);
        next();
    }
}

// Muestra 1 en particular por su id
exports.mostrarDocumentation = async (req, res, next) => {
    const documentation = await Documentations.findById(req.params.idDocument);

    if(!documentation) {
        res.json({ mensaje: 'Esa funcionalidad de la guía de usuario no existe' });
        return next();
    }

    // Mostrar la feria
    res.json(documentation);
}

// Actualiza feria por id
exports.actualizarDocumentation = async (req, res, next) => {
    try {
        // construir una nueva feria
        let nuevoDoc = req.body;
        // tomo la feria anterior
        let docAnterior = await Documentations.findById(req.params.idDocument);
        //console.log(docAnterior);

        let imagenAnteriorPath = __dirname + `../../uploads/docs/${docAnterior.imagen}`;
        //console.log(imagenAnteriorPath);

        if(docAnterior.imagen !== '') {
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
            nuevoDoc.imagen = req.file.filename;

        } else {
            nuevoDoc.imagen = docAnterior.imagen;
            
        }

        let documentation = await Documentations.findOneAndUpdate({ _id: req.params.idDocument }, nuevoDoc, {
            new: true
        });

        res.json(documentation);

    } catch(error) {
        console.log(error);
        next();
    }
}
// Eliminar
exports.eliminarDocumentation = async (req, res, next) => {
    try {
        let documentation = await Documentations.findById(req.params.idDocument);
        //console.log(documentation);
        let imagen = __dirname + `../../uploads/docs/${documentation.imagen}`;
        //console.log(imagen);
        if(documentation.imagen !== '') {
            fs.unlink(imagen, (error) => {
                if(error) {
                    console.log(error);
                }
                return;
            })
        }
        await Documentations.findByIdAndDelete({ _id: req.params.idDocument });
        res.json({ mensaje: 'La actualización de la guía de usuario se ha eliminado '});
    } catch(error) {
        console.log(error);
        next();
    }
}