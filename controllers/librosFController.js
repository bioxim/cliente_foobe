const mongoose = require('mongoose');
const Librosf = require('../models/Librosf');

const multer = require('multer');
const shortid = require('shortid');
const fs = require('fs');

exports.subirPdf = (req, res, next) => {
	upload(req, res, function(error) {
		//console.log(error);
		if(error) {
			if(error instanceof multer.MulterError) {
				if(error.code === 'LIMIT_FILE_SIZE') {
					res.json( { mensaje: 'El archivo es muy grande: Máximo 10Mb' } );
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
	limits: { fileSize : 100000000 },
	storage: fileStorage = multer.diskStorage({
        destination : (req, file, cb) => {
            cb(null, __dirname+'../../uploads/pdfs');
        }, 
        filename : (req, file, cb) => {
            const extension = file.mimetype.split('/')[1];
            cb(null, `${shortid.generate()}.${extension}`);
        }
    }),
    fileFilter(req, file, cb) {
        if(file.mimetype === 'application/pdf') {
            // el callback se ejecuta como true o false : true cuando la imagen se acepta
            cb(null, true);
        } else {
            cb(new Error('Formato No Válido'));
        }
    }
}

const upload = multer(configuracionMulter).single('pdf');

// Agrega nueva feria
exports.nuevoLibroF = async (req, res, next) => {
	const librof = new Librosf(req.body);

	try {
        if(req.file.filename) {
            librof.pdf = req.file.filename
        }
		await librof.save();
		res.json({ mensaje: 'Se agregó una nueva libroF' });
	} catch(error) {
		console.log(error);
		next();
	}
}

// Muestra todas las ferias
exports.mostrarLibrosF = async (req, res, next) => {
    try {
        const librosf = await Librosf.find({}).sort({'fecha': 'desc'});
        res.json(librosf);
    } catch(error) {
        console.log(error);
        next();
    }
}

// Muestra 1 feria en particular por su id
exports.mostrarLibroF = async (req, res, next) => {
    const librosf = await Librosf.findById(req.params.idLibroF);

    if(!librosf) {
        res.json({ mensaje: 'Ese Libro Físico no existe' });
        return next();
    }

    // Mostrar la feria
    res.json(librosf);
}

// Actualiza feria por id
exports.actualizarLibroF = async (req, res, next) => {
    try {
        // construir una nueva feria
        let nuevaFeria = req.body;
        // tomo la feria anterior
        let feriaAnterior = await Librosf.findById(req.params.idLibroF);
        //console.log(perfilAnterior);

        let pdfAnteriorPath = __dirname + `../../uploads/pdfs/${feriaAnterior.pdf}`;

        if(feriaAnterior.pdf !== '') {
            fs.unlink(pdfAnteriorPath, (error) => {
                if(error) {
                    console.log(error);
                }
                return;
            })
        }

        // verificar si hay imagen nueva
        if(req.file) {
            //Guardo nueva imagen
            nuevaFeria.pdf = req.file.filename;

        } else {
            nuevaFeria.pdf = feriaAnterior.pdf;
        }

        let librof = await Librosf.findOneAndUpdate({ _id: req.params.idLibroF }, nuevaFeria, {
            new: true
        });

        res.json(librof);

    } catch(error) {
        console.log(error);
        next();
    }
}
// Eliminar Feria
exports.eliminarLibroF = async (req, res, next) => {
    try {
        let librof = await Librosf.findById(req.params.idLibroF);
        //console.log(feria);
        let pdf = __dirname + `../../uploads/pdfs/${librof.pdf}`;
        
        if(librof.pdf !== '') {
            fs.unlink(pdf, (error) => {
                if(error) {
                    console.log(error);
                }
                return;
            })
        }
        await Librosf.findByIdAndDelete({ _id: req.params.idLibroF });
        res.json({ mensaje: 'La feria se ha eliminado '});
    } catch(error) {
        console.log(error);
        next();
    }
}

exports.buscarLibrosf = async (req, res, next) => {
    try {
        // obtener el query
        const { query } = req.params;
        const librof = await Librosf.find({ nombre: new RegExp(query, 'i') });
        res.json(librof);
    } catch(error) {
        console.log(error);
        next();
    }
}

// VISTAS PARA EL FRONTEND
// En el Slider del Home
exports.ultimosLibrosF = async (req, res, next) => {
    try {
        // obtener el query
        const { query } = req.params;
        const librof = await Librosf.find({}).sort({'fecha': 'desc'}).limit(5);
        res.json(librof);
    } catch(error) {
        console.log(error);
        next();
    }
}