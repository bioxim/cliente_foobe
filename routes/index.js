const express = require('express');
const router = express.Router();

/** ZONA ADMINISTRACION **/
const administradoresController = require('../controllers/administradoresController');

const contenidoController = require('../controllers/contenidoController');
const changelogController = require('../controllers/changelogController');
const documentationController = require('../controllers/documentationController');
const productoresController = require('../controllers/productoresController');
const newslettersController = require('../controllers/newslettersController');
const productoController = require('../controllers/productoController');
const calendarioController = require('../controllers/calendarioController');

const feriaController = require('../controllers/feriaController');
const cardController = require('../controllers/cardController');
const librosController = require('../controllers/librosController');
const librosFController = require('../controllers/librosFController');

/** ZONA CLIENTES **/
const usuariosController = require('../controllers/usuariosController');
const clientesVistasController = require('../controllers/clientesVistasController');

// middle para proteger las rutas
const auth = require('../middleware/auth');
const authAdmin = require('../middleware/authAdmin');


module.exports = function() {

	///////////////////////////////////////
	/******** ZONA ADMINISTRACION *******/
	//////////////////////////////////////
	/* CRUD USUARIOS ADMINISTRADORES */
	router.post('/iniciar-sesion', 
		administradoresController.autenticarUsuario
	);
	// Agregar cuenta admin
	router.post('/crear-admin',
		administradoresController.registrarUsuario
	);
	// Mostrar todos
	router.get('/administradores',
		administradoresController.mostrarUsuarios
	);
	// Mostrar un usuario por su id
	router.get('/administradores/:idUsuario', 
		administradoresController.mostrarUsuario
	);
	// Editar uno por id
	router.put('/administradores/:idUsuario',
		administradoresController.actualizarUsuario
	);
	// Eliminar uno por id
	router.delete('/administradores/:idUsuario', 
		administradoresController.eliminarUsuario
	);
	// Busqueda de administradores
	router.post('/administradores/busqueda/:query',
		administradoresController.buscarAdministrador
	);

	/* CRUD USUARIOS CLIENTES */
	// agregar cliente
	router.post('/crear-cuenta',
		administradoresController.registrarCliente
	);
	// Mostrar todos
	router.get('/clientes', 
		administradoresController.mostrarClientes
	);
	// Mostrar un usuario por id
	router.get('/clientes/:idCliente', 
		administradoresController.mostrarCliente
	);
	// Editar uno por id
	router.put('/clientes/editar/:idCliente',
		administradoresController.actualizarCliente
	);
	// Eliminar uno por id
	router.delete('/clientes/:idCliente', 
		administradoresController.eliminarCliente
	);	
	// Busqueda de clientes
	router.post('/clientes/busqueda/:query',
		administradoresController.buscarCliente
	);

	/* CRUD SECCIONES WEB CONTENIDOS */
	// Agregar
	router.post('/contenidos', 
		contenidoController.nuevoContenido
	);
	// Mostrar todos
	router.get('/contenidos', contenidoController.mostrarContenidos);
	// Mostrar uno por id
	router.get('/contenidos/:idContenido',
		contenidoController.mostrarContenido
	);
	// Editar uno por id
	router.put('/contenidos/:idContenido',
		contenidoController.actualizarContenido
	);
	// Eliminar uno por id
	router.delete('/contenidos/:idContenido',
		contenidoController.eliminarContenido
	);

	/* CRUD SECCIONES WEB CHANGELOG */
	// Agregar
	router.post('/changelog',
		changelogController.nuevoChangelog
	);
	// Mostrar todos
	router.get('/changelog', changelogController.mostrarChangelogs);
	// Mostrar uno por id
	router.get('/changelog/:idChangelog',
		changelogController.mostrarChangelog
	);
	// Editar uno por id
	router.put('/changelog/:idChangelog',
		changelogController.actualizarChangelog
	);
	// Eliminar uno por id
	router.delete('/changelog/:idChangelog',
		changelogController.eliminarChangelog
	);	

	/* CRUD SECCIONES WEB DOCUMENTATION */
	// Agregar
	router.post('/doc',
		documentationController.subirImagen,
		documentationController.nuevoDocumentation
	);
	// Mostrar todos
	router.get('/doc', documentationController.mostrarDocumentations);
	// Mostrar uno por id
	router.get('/doc/:idDocument',
		documentationController.mostrarDocumentation
	);
	// Editar uno por id
	router.put('/doc/:idDocument', 
		documentationController.subirImagen,
		documentationController.actualizarDocumentation
	);
	// Eliminar uno por id
	router.delete('/doc/:idDocument',
		documentationController.eliminarDocumentation
	);

	/* CRUD FERIAS */
	// Agregar
	router.post('/tradeshows',
		feriaController.subirImagen,
		feriaController.nuevaFeria
	);
	// Mostrar todos
	router.get('/tradeshows', feriaController.mostrarFerias);
	// Mostrar uno por id
	router.get('/tradeshows/:idFeria', feriaController.mostrarFeria);
	// Editar uno por id
	router.put('/tradeshows/:idFeria',
		feriaController.subirImagen, 
		feriaController.actualizarFeria
	);
	// Eliminar uno por id
	router.delete('/tradeshows/:idFeria',
		feriaController.eliminarFeria
	);
	// Busqueda de ferias
	router.post('/tradeshows/busqueda/:query',
		feriaController.buscarFerias
	);

	/* CRUD TARJETAS */
	// Agregar
	router.post('/tarjetas', 
		cardController.nuevaCard
	);
	// Mostrar todos
	router.get('/tarjetas', 
		cardController.mostrarCards
	);
	// Mostrar uno por id
	router.get('/tarjetas/:idCard', 
		cardController.mostrarCard
	);
	// Editar uno por id
	router.put('/tarjetas/:idCard', 
		cardController.actualizarCard
	);
	// Eliminar uno por id
	router.delete('/tarjetas/:idCard',
		cardController.eliminarCard
	);
	// Busqueda de tarjetas
	router.post('/tarjetas/busqueda/:query',
		cardController.buscarCard
	);
	// Busqueda de ferias
	router.post('/tarjetas/buscar/:query',
		cardController.buscarTarjetas
	);

	/* CRUD LIBROS */
	// Agrega nuevos libros
	router.post('/books/nuevo/:idFeria', 
		librosController.nuevoLibro
	);

	// Mostrar todos los pedidos
	router.get('/books',
		librosController.mostrarLibros
	);

	// Mostrar un pedidos por su ID
	router.get('/books/:idLibro', 
		librosController.mostrarLibro
	);

	// Actualizar pedidos
	router.put('/books/:idLibro',
		librosController.actualizarLibro
	);

	// Eliminar pedido
	router.delete('/books/:idLibro', 
		librosController.eliminarLibro
	);
	// Busqueda de tarjetas
	router.post('/librosf/busqueda/:query',
		librosFController.buscarLibrosf
	);

	/* CRUD LIBROS FíSICOS */
	// Agregar
	router.post('/librosfisicos',
		librosFController.subirPdf,
		librosFController.nuevoLibroF
	);
	// Mostrar todos
	router.get('/librosfisicos', librosFController.mostrarLibrosF);
	// Mostrar uno por id
	router.get('/librosfisicos/:idLibroF', librosFController.mostrarLibroF);
	// Editar uno por id
	router.put('/librosfisicos/:idLibroF',
		librosFController.subirPdf,
		librosFController.actualizarLibroF
	);
	// Eliminar uno por id
	router.delete('/librosfisicos/:idLibroF',
		librosFController.eliminarLibroF
	);

	/* CRUD PRODUCTORES */
	// Agregar
	router.post('/productores', 
		productoresController.nuevoProductor
	);
	// Mostrar todos
	router.get('/productores', 
		productoresController.mostrarProductores
	);
	// Mostrar uno por id
	router.get('/productores/:idProductor', 
		productoresController.mostrarProductor
	);
	// Editar uno por id
	router.put('/productores/:idProductor', 
		productoresController.actualizarProductor
	);
	// Eliminar uno por id
	router.delete('/productores/:idProductor',
		productoresController.eliminarProductor
	);

	/* CRUD MANEJO DEL CÓDIGO DE PRODUCTOS ARMONIZADO HS6 */

	// Agregar
	router.post('/producto', 
		productoController.nuevoProducto
	);
	// Mostrar todos
	router.get('/productos', 
		productoController.mostrarProductos
	);
	// Mostrar uno por id
	router.get('/producto/:idProducto', 
		productoController.mostrarProducto
	);
	// Editar uno por id
	router.put('/producto/:idProducto', 
		productoController.actualizarProducto
	);
	// Eliminar uno por id
	router.delete('/producto/:idProducto',
		productoController.eliminarProducto
	);

	/* CRUD CALENDARIO PARA MOSTRAR PLANIFICACION DE FERIAS */

	// Agregar
	router.post('/calendario', 
		calendarioController.subirImagen,
		calendarioController.nuevoCalendario
	);
	// Mostrar todos
	router.get('/calendarios', 
		calendarioController.mostrarCalendarios
	);
	// Mostrar uno por id
	router.get('/calendario/:idCalendario', 
		calendarioController.mostrarCalendario
	);
	// Editar uno por id
	router.put('/calendario/:idCalendario', 
		calendarioController.subirImagen,
		calendarioController.actualizarCalendario
	);
	// Eliminar uno por id
	router.delete('/calendario/:idCalendario',
		calendarioController.eliminarCalendario
	);

	///////////////////////////////////////
	/*********** ZONA CLIENTES ***********/
	///////////////////////////////////////
	/* INICIAR SESIÓN */
	router.post('/login', usuariosController.autenticarUsuario);
	/* MOSTRAR CARACTERISTICAS DE PERFIL */
	router.get('/perfil/buscar/:query', usuariosController.mostrarUsuario);

	/* VISTAS TARJETAs Y LIBROS DE CLIENTES */
	router.get('/all-cards',
		clientesVistasController.mostrarTarjetas
	);
	router.get('/books-cards',
		clientesVistasController.mostrarBooks
	);
	/* VISTAS LIBROS DE PDFs */
	router.get('/list',
		librosFController.mostrarLibrosF
	);

	// Agregar
	router.post('/newsletter', 
		newslettersController.nuevoSuscriptor
	);
	// Mostrar todos
	router.get('/newsletter', 
		newslettersController.mostrarSuscriptores
	);
	// Mostrar uno por id
	router.get('/newsletter/:idSuscriptor', 
		newslettersController.mostrarSuscriptor
	);
	// Editar uno por id
	router.put('/newsletter/:idSuscriptor', 
		newslettersController.actualizarSuscriptor
	);
	// Eliminar uno por id
	router.delete('/newsletter/:idSuscriptor',
		newslettersController.eliminarSuscriptor
	);

	return router;
}