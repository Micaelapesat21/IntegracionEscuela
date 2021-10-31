// Initialize express router
let router = require('express').Router();
let escTitularController = require('./controllers/escTitularController');
let escAlumnoController = require('./controllers/escAlumnoController');
let escCuotaController = require('./controllers/escCuotaController');
let escServicioController = require('./controllers/escServicioController');
let escEmpleadoController = require('./controllers/escEmpleadoController');    
let escTurnoController = require('./controllers/escTurnoController');
let escUsuariosController = require('./controllers/escUsuariosController');
let escCursoController = require('./controllers/escCursoController');
let escAlumnoAsistenciaController = require('./controllers/escAlumnoAsistenciaController');
let escNotificacionController = require('./controllers/escNotificacionController');
let escMensajesController = require('./controllers/escMensajesController');
let escAlumnoRetirosController = require('./controllers/escAlumnoRetirosController');
let escAlumnoCertificadosController = require('./controllers/escAlumnoCertificadosController');
let escTarjetaController = require('./controllers/escTarjetaController');
let escTipoController = require('./controllers/escTipoController');



// para las imagenes
const AWS = require('aws-sdk');
const multerS3 = require( 'multer-s3' );
const multerrr = require('multer');
//const uploadCertificados = multerrr({dest: 'Certificados/'})

// SET STORAGE RETIROS
var storage = multerrr.diskStorage({
    destination: function (req, file, cb) {
      cb(null,  'Certificados/')
    },
    filename: function (req, file, cb) {
        cb(null, path.basename( file.originalname, path.extname( file.originalname ) ) + '-' + Date.now() + path.extname( file.originalname ) )
    
    }
  })
const uploadCertificados = multerrr({storage: storage})
const uploadRetiros = multerrr({
    dest: 'Retiros/',
})

const path = require( 'path' );
const url = require('url');
const fs= require('fs');

const s3 = new AWS.S3({
    accessKeyId: "AKIAYYJPLQ2CRBWYJPGY",
    secretAccessKey: "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", 
    region: 'sa-east-1'
});

const profileImgUpload = multerrr({
    storage: multerS3({
     s3: s3,
     bucket: 'regiapp-s3-data',
     //acl: 'public-read',
     key: function (req, file, cb) {
        console.log(file);
      cb(null, 'Retiros/' + path.basename( file.originalname, path.extname( file.originalname ) ) + '-' + Date.now() + path.extname( file.originalname ) )
     }
    }),
    limits:{ fileSize: 20000000 }, // In bytes: 2000000 bytes = 2 MB
    fileFilter: function( req, file, cb ){
     checkFileType( file, cb );
    }
   }).single('profileImage');

   const profileImgUploadCertificados = multerrr({
    storage: multerS3({
     s3: s3,
     bucket: 'regiapp-s3-data',
     //acl: 'public-read',
     key: function (req, file, cb) {
        console.log(file);
      cb(null, 'Certificados/' + path.basename( file.originalname, path.extname( file.originalname ) ) + '-' + Date.now() + path.extname( file.originalname ) )
     }
    }),
    limits:{ fileSize: 20000000 }, // In bytes: 2000000 bytes = 2 MB
    fileFilter: function( req, file, cb ){
     checkFileType( file, cb );
    }
   }).single('profileImageCertificado');

      
function checkFileType( file, cb ){
    // Allowed ext
    const filetypes = /jpeg|jpg|png|gif/;
    // Check ext
    const extname = filetypes.test( path.extname( file.originalname ).toLowerCase());
    console.log("file.originalname " + file.originalname)
    // Check mime
    console.log("extname " + extname);
    const mimetype = filetypes.test( file.mimetype );
    console.log("mimetype " + file.mimetype);
    if( mimetype && extname ){
     return cb( null, true );
    } else {
     cb( 'Error: Images Only!' );
    }
};


// Set default API response
router.get('/', function (req, res) 
{
    console.log("estoy aca?")
    res.json(
    {
       status: 'API Its Working',
       message: 'Welcome to RESTHub crafted with love!',
    });
});


router.post('/cargarFactura',function(req,res)
{
    console.log("leer");
    escCuotaController.crearFacturaBanco(req,res);
})


//ESCTURNO

//EndPoint para leer toda la base de turno
router.get('/obtenerTurnos',function(req,res)
{
    console.log("leer");
    escTurnoController.obtenerTurnos(req,res);
});


//EndPoint para insertar turno en la BD
router.post('/crearTurno/Escturno',function(req,res)
{
    console.log(req.body);
    escTurnoController.crearTurno(req,res);
});

//EndPoint para eliminar turno en la BD
router.delete('/eliminarTurno/Escturno',function(req,res)
{
    escTurnoController.eliminarTurno(req,res);
});

//EndPoint para modificar turno en la BD
router.post('/actualizarTurno/Escturno',function(req,res)
{
    escTurnoController.actualizarTurno(req,res);
});




//ESCTITULAR

//EndPoint para leer toda la base de titulares
router.get('/obtenerTitulares',function(req,res)
{
    console.log("leer");
    escTitularController.obtenerTitulares(req,res);
});

//EndPoint para obtener el titular por mail
router.get('/obtenerTitular',function(req,res)
{
    console.log("leer");
    escTitularController.obtenerTitular(req,res);
});

//EndPoint para login del titular
router.post('/loginTitular',function(req,res)
{
    console.log("leer");
    escTitularController.loginTitular(req,res);
});

//EndPoint para insertar titular en la BD
router.post('/crearTitular/Esctitular',function(req,res)
{
    console.log(req.body);
    escTitularController.crearTitular(req,res);
});

//EndPoint para eliminar titular en la BD
router.delete('/eliminarTitular/Esctitular',function(req,res)
{
    escTitularController.eliminarTitular(req,res);
});

//EndPoint para modificar titular en la BD
router.post('/actualizarTitular/Esctitular',function(req,res)
{
    escTitularController.actualizarTitular(req,res);
});

//EndPoint para insertar  usuario en la BD con Social Credentials
/*router.post('/registerUserWithSocialCredentials/Bpuser',function(req,res)
{
    console.log(req.body);
    escTitularController.registerUserWithSocialCredentials(req,res);
});
*/



//ESCALUMNO
router.post('/crearAlumno/Escalumno',function(req,res)
{
    console.log("post: " + req.body.nombre);
    escAlumnoController.crearAlumno(req,res);
});

router.post('/actualizarAlumno/Escalumno', function(req, res)
{
    escAlumnoController.actualizarAlumno(req,res);
});

router.delete('/eliminarAlumno/Escalumno', function(req, res)
{
    escAlumnoController.eliminarAlumno(req,res);
});

//obtener todos los alumnos de la collection
router.get('/obtenerAlumnos', function(req, res)
{
    escAlumnoController.obtenerAlumnos(req,res);
});

//path para obtener todos los alumnos de un titular, dado su id
router.get('/obtenerAlumnoPorTitular/:id', function(req, res)
{
    escAlumnoController.obtenerAlumnoPorTitular(req, res);
});

//path para obtener todos los alumnos de un titular, dado su id
router.get('/obtenerAlumnoPorUsuario/:id', function(req, res)
{
    escAlumnoController.obtenerAlumnoPorUsuario(req, res);
});

router.post('/asignarServicioAlumno', function(req, res)
{
    escAlumnoController.asignarServicioAlumno(req, res);
});

router.post('/desasignarServicioAlumno', function(req, res)
{
    escAlumnoController.desasignarServicioAlumno(req, res);
});

router.post('/asignarCursoAlumno', function(req, res)
{
    escAlumnoController.asignarCursoAlumno(req, res);
});

//ESCCUOTA

//EndPoint para leer toda la base de cuota
router.get('/obtenerCuotas',function(req,res)
{
    console.log("leer");
    escCuotaController.obtenerCuotas(req,res);
});

//EndPoint para leer toda los pagos de las cuotas
router.get('/obtenerPagos',function(req,res)
{
    console.log("leer");
    escCuotaController.obtenerPagos(req,res);
});

//EndPoint para leer toda la base de cuota por usuario
router.post('/obtenerCuotasDeUsuario',function(req,res)
{
    console.log("obtenerCuotasDeUsuario");
    escCuotaController.obtenerCuotasDeUsuario(req,res);
});


//EndPoint para insertar cuota en la BD
router.post('/crearCuota/Esccuota',function(req,res)
{   
    escCuotaController.crearCuota1(req,res);
});

//EndPoint para eliminar cuota en la BD
router.delete('/eliminarCuota/Esccuota',function(req,res)
{
    escCuotaController.eliminarCuota(req,res);
});

//EndPoint para modificar cuota en la BD
router.post('/actualizarCuota/Esccuota',function(req,res)
{
    escCuotaController.actualizarCuota(req,res);
});

//EndPoint para pagar la factura
router.post('/realizarPago',function(req,res)
{
    escCuotaController.realizarPago(req,res);
});

//Endpoint para pago de cutas
router.post('/pagarCuota',function(req,res)
{
    escCuotaController.pagarCuota(req,res);
});

//EndPoint para obtener facturas pagas
router.get('/obtenerPago',function(req,res)
{
    escCuotaController.obtenerPago(req,res);
});

//ESCEMPLEADO

//EndPoint para leer toda la base de empleado
router.get('/obtenerEmpleados',function(req,res)
{
    console.log("leer");
    escEmpleadoController.obtenerEmpleados(req,res);
});

//EndPoint para obtener el empleado por mail
router.get('/obtenerEmpleado',function(req,res)
{
    console.log("leer");
    escEmpleadoController.obtenerEmpleado(req,res);
});

//EndPoint para login del empleado
router.post('/loginEmpleado',function(req,res)
{
    console.log("leer");
    escEmpleadoController.loginEmpleado(req,res);
});

//EndPoint para insertar empleado en la BD
router.post('/crearEmpleado/Escempleado',function(req,res)
{
    console.log(req.body);
    escEmpleadoController.crearEmpleado(req,res);
});

//EndPoint para eliminar empleado en la BD
router.delete('/eliminarEmpleado/Escempleado',function(req,res)
{
    escEmpleadoController.eliminarEmpleado(req,res);
});

//EndPoint para modificar empleado en la BD
router.post('/actualizarEmpleado/Escempleado',function(req,res)
{
    escEmpleadoController.actualizarEmpleado(req,res);
});


//ESCADICIONAL

//EndPoint para leer toda la base de servicio
router.get('/obtenerServicios',function(req,res)
{
    console.log("leer");
    escServicioController.obtenerServicios(req,res);
});


//EndPoint para insertar servicio en la BD
router.post('/crearServicio/Escservicio',function(req,res)
{
    console.log(req.body);
    escServicioController.crearServicio(req,res);
});

//EndPoint para eliminar servicio en la BD
router.delete('/eliminarServicio/Escservicio',function(req,res)
{
    escServicioController.eliminarServicio(req,res);
});

//EndPoint para modificar servicio en la BD
router.post('/actualizarServicio/Escservicio',function(req,res)
{
    escServicioController.actualizarServicio(req,res);
});

//ESCUSUARIOS

//EndPoint para leer toda la base de Usuarios
router.get('/obtenerUsuarios',function(req,res)
{
    escUsuariosController.obtenerUsuarios(req,res);
});

//EndPoint para obtener el usuario por mail
router.get('/obtenerUsuario',function(req,res)
{
    escUsuariosController.obtenerUsuario(req,res);
});

//EndPoint para obtener el nombre del usuario
router.get('/obtenerNombreUsuario/:usuario',function(req,res)
{
    escUsuariosController.obtenerNombreUsuario(req,res);
});


//EndPoint para login del Usuarios
router.post('/loginUsuarios/escusuarios',function(req,res)
{
    console.log("loginUsuarios");
    escUsuariosController.loginUsuarios(req,res);
});

//EndPoint para insertar Usuarios en la BD
router.post('/crearUsuarios/escusuarios',function(req,res)
{
    console.log(req.body);
    escUsuariosController.crearUsuarios(req,res);
});

//EndPoint para eliminar Usuarios en la BD
router.delete('/eliminarUsuarios/escusuarios',function(req,res)
{
    escUsuariosController.eliminarUsuarios(req,res);
});

//EndPoint para modificar empleado en la BD
router.post('/actualizarUsuarios/escusuarios',function(req,res)
{
    escUsuariosController.actualizarUsuarios(req,res);
});

//ESCALUMNOSRFID

//Endpoint para obtener los alumnos con los serial RFID
router.get('/obtenerAlumnosRfid', function(req, res)
{
    escAlumnoController.obtenerAlumnosRfid(req,res);
});

//Endpoint para asignar un serial rfid a un alumno
router.post('/asignarAlumnoRfid', function(req, res)
{
    escAlumnoController.asignarAlumnoRfid(req, res);
});

//Endpoint para desasignar un serial Rfid de un alumno
router.post('/desasignarAlumnoRfid', function(req, res)
{
    escAlumnoController.desasignarAlumnoRfid(req, res);
});

//ESCCURSO

//Endpoint para obtener los alumnos por curso
router.get('/obtenerAlumnosPorCurso/:curso', function(req, res)
{
    escCursoController.obtenerAlumnosPorCurso(req,res);
});

//EndPoint para leer toda la base de cursos
router.get('/obtenerCursos',function(req,res)
{
    escCursoController.obtenerCursos(req,res);
});

//EndPoint para leer toda la base de cursos
router.get('/obtenerCursosPorId/:curso',function(req,res)
{
    console.log("obtenerCursosPorId");
    escCursoController.obtenerCursosPorId(req,res);
});

//EndPoint para insertar Curso en la BD
router.post('/crearCurso/Esccurso',function(req,res)
{
    console.log(req.body);
    escCursoController.crearCurso(req,res);
});

//EndPoint para eliminar Curso en la BD
router.delete('/eliminarCurso/Esccurso',function(req,res)
{
    escCursoController.eliminarCurso(req,res);
});

//EndPoint para modificar turno en la BD
router.post('/actualizarCurso/Esccurso',function(req,res)
{
    escCursoController.actualizarCurso(req,res);
});


//ESCALUMNOASISTENCIA

router.post('/crearAsistencia/Escasistencia',function(req,res)
{
    console.log(req.body);
    escAlumnoAsistenciaController.crearAsistencia(req,res);
});

//Endpoint para obtener los alumnos por curso
router.get('/obtenerAlumnosPorCursoA', function(req, res)
{
    escAlumnoAsistenciaController.obtenerAlumnosPorCursoA(req,res);
});

//obtenemos las asistencias de un alumno en un rango de fechas particular
router.post('/obtenerAsistenciasPorAlumnoYFecha', function(req, res)
{
    escAlumnoAsistenciaController.obtenerAsistenciasPorAlumnoYFecha(req,res);
});

router.get('/obtenerAsistencias', function(req, res)
{
    escAlumnoAsistenciaController.obtenerAsistencias(req,res);
});

///ESCNOTIFICACION

//EndPoint para obtener las notificacion por Usuario
router.get('/obtenerNotificacionesPorUsuario/:usuario', function(req, res)
{
    console.log("leer obtenerNotificacionesPorUsuario");
    escNotificacionController.obtenerNotificacionesPorUsuario(req,res);
});

//EndPoint para obtener las notificacion
router.get('/obtenerNotificaciones',function(req,res)
{
    console.log("api-router-obtenerNotificaciones");
    escNotificacionController.obtenerNotificaciones(req,res);
});

//EndPoint para crear notificacion
router.post('/crearNotificacion/Escnotificacion',function(req,res)
{
    console.log(req.body);
    escNotificacionController.crearNotificacion(req,res);
});

//EndPoint para enviar notificaciones Masivas
router.post('/crearNotificacionMasiva/Escnotificacion',function(req,res)
{
    escNotificacionController.crearNotificacionMasiva(req,res);
});

//EndPoint para eliminar Curso en la BD
router.delete('/eliminarNotificacion/Escnotificacion',function(req,res)
{
    escNotificacionController.eliminarNotificacion(req,res);
});
//EndPoint para enviar notificaciones Masivas
router.patch('/actualizarNotificacion/Escnotificacion/:id',function(req,res)
{
    escNotificacionController.actualizarNotificacion(req,res);
});


///ESCMENSAJES

//EndPoint para obtener las notificacion por Usuario
router.get('/obtenerMensajePorUsuario/:usuario', function(req, res)
{
    console.log("leer obtenerMensajePorUsuario");
    escMensajesController.obtenerMensajePorUsuario(req,res);
});

//EndPoint para obtener las notificacion
router.get('/obtenerMensajes',function(req,res)
{
    console.log("api-router-obtenerMensajes");
    escMensajesController.obtenerMensajes(req,res);
});

//EndPoint para crear notificacion
router.post('/crearMensaje/Escmensaje',function(req,res)
{
    console.log("crear mensahe el body es: " + req.body);
    escMensajesController.crearMensaje(req,res);
});

//EndPoint para actualizar un Mensaje y marcarlo como Leido
router.post('/actualizarMensaje/Escmensaje/:id',function(req,res)
{
    escMensajesController.actualizarMensaje(req,res);
});

///FIN ESCMENSAJES

//EndPoint para eliminar Curso en la BD
router.delete('/eliminarNotificacion/Escnotificacion',function(req,res)
{
    escNotificacionController.eliminarNotificacion(req,res);
});

//ESCALUMNORETIROS
//EndPoint para crear responsables de retiros de alumnos
router.post('/crearRetiro/Escalumnoretiros',function(req,res)
{
    escAlumnoRetirosController.crearRetiro(req,res);
});

//EndPoint para obtener los responsables de retirar
router.get('/obtenerRetiros',function(req,res)
{
    escAlumnoRetirosController.obtenerRetiros(req,res);
});

//EndPoint para obtener los esponsables para retirar a un alumno
router.get('/obtenerRetirosPorAlumno/:alumnoId',function(req,res)
{
    escAlumnoRetirosController.obtenerRetirosPorAlumno(req,res);
});


//ESCALUMNO CERTIFICADO
//EndPoint para crear responsables de retiros de alumnos
router.post('/crearCertificado/Escalumnocertificados',function(req,res)
{
    escAlumnoCertificadosController.crearCertificado(req,res);
});

//EndPoint para obtener los responsables de retirar
router.get('/obtenerCertificados',function(req,res)
{
    escAlumnoCertificadosController.obtenerCertificados(req,res);
});

//EndPoint para obtener los esponsables para retirar a un alumno
router.get('/obtenerCertificadosPorAlumno/:alumnoId',function(req,res)
{
    escAlumnoCertificadosController.obtenerCertificadosPorAlumno(req,res);
});

//EndPoint para IMAGENES
router.post('/cargaCertificado', uploadCertificados.single("Certificado"), (req,res) => 
{

    console.log("nombre " + req.file.filename);
    console.log("nombre2 " + req.file.fieldname);
    console.log("nombre2 " + req.file.path);

   // var encode_image = img.toString('base64');
     // Define a JSONobject for the image attributes for saving to database
  
  //  var finalImg = {
  //    contentType: req.file.mimetype,
 //     image:  new Buffer(encode_image, 'base64')
  //  };

   console.log(finalImg);
        
                res.status(200)

});

// Endpoint imagenes de RETIROS
router.post( '/profile-img-upload', function(req,res) {   
    profileImgUpload( req, res, ( error ) => {
    if( error ){
     console.log( 'errors', error );
     res.json( { error: error } );
    } else {
     // If File not found
     if( req.file === undefined ){
      console.log( 'Error: No File Selected!' );
      res.json( 'Error: No File Selected' );
     } else {
      // If Success
      const imageName = req.file.key;
      const imageLocation = req.file.location;// Save the file name into database into profile model
      console.log("Successsssssss");
      console.log("imageName: " +  imageName);
      console.log("imageLocation: " +  imageLocation);

      /*
      res.json({
       image: imageName,
       location: imageLocation
      });
        */
      const datos = {
        image: imageName,
        location: imageLocation
      }
      res.status(200).send(datos);
     
     }
    }
   });
});

// Endpoint imagenes de Certificados
router.post( '/profile-img-upload-certificados', function(req,res) {   
    profileImgUploadCertificados( req, res, ( error ) => {
    if( error ){
     console.log( 'errors', error );
     res.json( { error: error } );
    } else {
     // If File not found
     if( req.file === undefined ){
      console.log( 'Error: No File Selected!' );
      res.json( 'Error: No File Selected' );
     } else {
      // If Success
      const imageName = req.file.key;
      const imageLocation = req.file.location;// Save the file name into database into profile model
      console.log("Successsssssss");
      console.log("imageName: " +  imageName);
      console.log("imageLocation: " +  imageLocation);

      const datos = {
        image: imageName,
        location: imageLocation
      }
      res.status(200).send(datos);
     
     }
    }
   });
});

router.post('/obtenerImagenS3',function(req,res)
{
    console.log("req.nombreImagen" + req.body.nombreImagen)
    var parametrosGetObject = {
        Bucket: 'regiapp-s3-data',
        //Key: 'tarjeta arduino y lector rfid.JPG',
        Key: req.body.nombreImagen
        //Etag: 'a3a61aba8edffee39079bf7d71581617'
    }
    s3.getObject(parametrosGetObject, (err,data)=> {
        if (err) throw err;
        console.log(data);
        //envio el buffer
        res.status(200).send(data);
        //el data.Body es el que tiene el buffer
    });
});

//END POINT TARJETAS
//EndPoint para crear una tarjeta
router.post('/crearTarjeta/Esctarjeta',function(req,res)
{
    escTarjetaController.crearTarjeta(req,res);
});
//EndPoint para obtener las tarjetas
router.get('/obtenerTarjetas',function(req,res)
{
    escTarjetaController.obtenerTarjetas(req,res);
});

//EndPoint para obtener las tarjetas de un usuario
router.get('/obtenerTarjetaPorIdUsuario/:id',function(req,res)
{
    escTarjetaController.obtenerTarjetaPorIdUsuario(req,res);
});

// Export API routes
module.exports = router;