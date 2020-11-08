// Initialize express router
let router = require('express').Router();
let escTitularController = require('./controllers/escTitularController');
let escAlumnoController = require('./controllers/escAlumnoController');
let escCuotaController = require('./controllers/escCuotaController');
let escAdicionalController = require('./controllers/escAdicionalController');
let escComedorController = require('./controllers/escComedorController');
let escTipoCuotaController = require('./controllers/escTipoCuotaController');
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

//EndPoint para leer toda la base de adicional
router.get('/obtenerAdicionales',function(req,res)
{
    console.log("leer");
    escAdicionalController.obtenerAdicionales(req,res);
});


//EndPoint para insertar adicional en la BD
router.post('/crearAdicional/Escadicional',function(req,res)
{
    console.log(req.body);
    escAdicionalController.crearAdicional(req,res);
});

//EndPoint para eliminar adicional en la BD
router.delete('/eliminarAdicional/Escadicional',function(req,res)
{
    escAdicionalController.eliminarAdicional(req,res);
});

//EndPoint para modificar adicional en la BD
router.post('/actualizarAdicional/Escadicional',function(req,res)
{
    escAdicionalController.actualizarAdicional(req,res);
});



//ESCADICIONAL

//EndPoint para leer toda la base de tipocuota
router.get('/obtenerTipoCuotas',function(req,res)
{
    console.log("leer");
    escTipoCuotaController.obtenerTipoCuotas(req,res);
});


//EndPoint para insertar tipocuota en la BD
router.post('/crearTipoCuota/Esctipocuota',function(req,res)
{
    console.log(req.body);
    escTipoCuotaController.crearTipoCuota(req,res);
});

//EndPoint para eliminar tipocuota en la BD
router.delete('/eliminarTipoCuota/Esctipocuota',function(req,res)
{
    escTipoCuotaController.eliminarTipoCuota(req,res);
});

//EndPoint para modificar tipocuota en la BD
router.post('/actualizarTipoCuota/Esctipocuota',function(req,res)
{
    escTipoCuotaController.actualizarTipoCuota(req,res);
});



// Export API routes
module.exports = router;