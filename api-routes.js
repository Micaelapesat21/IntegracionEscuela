// Initialize express router
let router = require('express').Router();
let escTitularController = require('./controllers/escTitularController');
let escAlumnoController = require('./controllers/escAlumnoController');
let escCuotaController = require('./controllers/escCuotaController');
let escServicioController = require('./controllers/escServicioController');
let escComedorController = require('./controllers/escComedorController');
let escFacturaController = require('./controllers/escFacturaController');
let escEmpleadoController = require('./controllers/escEmpleadoController');    

// Set default API response
router.get('/', function (req, res) 
{
    res.json(
    {
       status: 'API Its Working',
       message: 'Welcome to RESTHub crafted with love!',
    });
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
    escAlumnoController.crearAlumno(req,res);
});

router.post('/actalizarAlumno/Escalumno', function(req, res)
{
    escAlumnoController.actualizarAlumno(req,res);
});

router.delete('/eliminarAlumno/Escalumno', function(req, res)
{
    escAlumnoController.eliminarAlumno(req,res);
});

router.get('/obtenerAlumnos', function(req, res)
{
    escAlumnoController.obtenerAlumnos(req,res);
});

router.get('/obtenerAlumnoPorTitular', function(req, res)
{
    escAlumnoController.obtenerAlumnoPorTitular(req, res);
});


//ESCCUOTA

//EndPoint para leer toda la base de cuota
router.get('/obtenerCuotas',function(req,res)
{
    console.log("leer");
    escCuotaController.obtenerCuotas(req,res);
});


//EndPoint para insertar cuota en la BD
router.post('/crearCuota/Esccuota',function(req,res)
{
    console.log(req.body);
    escCuotaController.crearCuota(req,res);
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






//ESCCOMEDOR

//EndPoint para leer toda la base de comedor
router.get('/obtenerComedores',function(req,res)
{
    console.log("leer");
    escComedorController.obtenerComedores(req,res);
});


//EndPoint para insertar comedor en la BD
router.post('/crearComedor/Esccomedor',function(req,res)
{
    console.log(req.body);
    escComedorController.crearComedor(req,res);
});

//EndPoint para eliminar comedor en la BD
router.delete('/eliminarComedor/Esccomedor',function(req,res)
{
    escComedorController.eliminarComedor(req,res);
});

//EndPoint para modificar comedor en la BD
router.post('/actualizarComedor/Esccomedor',function(req,res)
{
    escComedorController.actualizarComedor(req,res);
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




// Export API routes
module.exports = router;