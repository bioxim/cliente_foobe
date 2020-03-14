const Calendarios = require('../models/Calendarios');

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

// Agrega un nuevo Contenido WEB
exports.nuevoCalendario = async (req, res, next) => {
	//console.log(req.body);
	const calendario = new Calendarios(req.body);
	try {
        if(req.file.filename) {
            calendario.imagen = req.file.filename
        }
		await calendario.save();
		res.json({ mensaje: 'Se agregó una nuevo evento al calendario' });
	} catch(error) {
		console.log(error);
		next();
	}
}

// Muestra todos los contenidos
exports.mostrarCalendarios = async (req, res, next) => {
	try {
		const calendarios = await Calendarios.find({});
		res.json(calendarios);
	} catch(error) {
		// statements
		console.log(error);
		res.send(error);
		next();
	}
}

// Muestra un módulo web por su ID
exports.mostrarCalendario = async (req, res, next) => {
	const calendario = await Calendarios.findById(req.params.idCalendario);

	if(!calendario) {
		res.json({mensaje: 'Ese evento no existe en el calendario'});
		next();
	}

	// Mostrar el módulo
	res.json(calendario);
}

// Actualiza un módulo web por su ID
exports.actualizarCalendario = async (req, res, next) => {
	try {
        // construir una nueva feria
        let nuevoCalendario = req.body;
        // tomo la feria anterior
        let calendarioAnterior = await Calendarios.findById(req.params.idCalendario);
        //console.log(perfilAnterior);

        let imagenAnteriorPath = __dirname + `../../uploads/tradeshows/${calendarioAnterior.imagen}`;
        //console.log(imagenAnteriorPath);

        if(calendarioAnterior.imagen !== '') {
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
            nuevoCalendario.imagen = req.file.filename;

        } else {
            nuevoCalendario.imagen = calendarioAnterior.imagen;
        }

        let calendario = await Calendarios.findOneAndUpdate({ _id: req.params.idCalendario }, nuevoCalendario, {
            new: true
        });

        res.json(calendario);

    } catch(error) {
        console.log(error);
        next();
    }
}

// Eliminar un módulo web por ID
exports.eliminarCalendario = async (req, res, next) => {
	try {
        let calendario = await Calendarios.findById(req.params.idCalendario);
        //console.log(calendario);
        let imagen = __dirname + `../../uploads/tradeshows/${calendario.imagen}`;
        //console.log(imagen);
        if(calendario.imagen !== '') {
            fs.unlink(imagen, (error) => {
                if(error) {
                    console.log(error);
                }
                return;
            })
        }
        await Calendarios.findByIdAndDelete({ _id: req.params.idCalendario });
        res.json({ mensaje: 'El evento se ha eliminado de este calendario'});
    } catch(error) {
        console.log(error);
        next();
    }
}