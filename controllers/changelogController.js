const Changelogs = require('../models/Changelogs');

// Agrega un nuevo Contenido WEB
exports.nuevoChangelog = async (req, res, next) => {
	//console.log(req.body);
	const changelog = new Changelogs(req.body);
	try {
		// almacenar el registro
		await changelog.save();
		res.json({ mensaje: 'Se agrego un nuevo changelog en la web' });
	} catch(error) {
		// si hay error, console.log y next
		console.log(error);
		res.send(error);
		next();
	}
}

// Muestra todos los changelogs
exports.mostrarChangelogs = async (req, res, next) => {
	try {
		const changelogs = await Changelogs.find({}).sort({'fecha': 'desc'});
		res.json(changelogs);
	} catch(error) {
		// statements
		console.log(error);
		res.send(error);
		next();
	}
}

// Muestra un módulo web por su ID
exports.mostrarChangelog = async (req, res, next) => {
	const changelog = await Changelogs.findById(req.params.idChangelog);

	if(!changelog) {
		res.json({mensaje: 'Esa actualización web no existe'});
		next();
	}

	// Mostrar el módulo
	res.json(changelog);
}

// Actualiza un módulo web por su ID
exports.actualizarChangelog = async (req, res, next) => {
	try {
		const changelog = await Changelogs.findOneAndUpdate({ _id: req.params.idChangelog },
			req.body, {
				new: true
			});
		res.json(changelog);
	} catch(error) {
		console.log(error);
		res.send(error);
		next();
	}
}

// Eliminar un módulo web por ID
exports.eliminarChangelog = async (req, res, next) => {
	try {
		await Changelogs.findOneAndDelete({ _id: req.params.idChangelog });
		res.json({ mensaje: 'Ese changelog web se ha eliminado' });
	} catch(error) {
		console.log(error);
		res.send(error);
		next();
	}
}