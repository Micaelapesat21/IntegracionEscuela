// Initialize express router
let router = require('express').Router();
let apiController = require('./controllers/apiControllers');
    

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
    apiController.obtenerTitulares(req,res);
});

//EndPoint para login del titular
router.post('/loginTitular',function(req,res)
{
    console.log("leer");
    apiController.loginTitular(req,res);
});

//EndPoint para insertar titular en la BD
router.post('/crearTitular/Esctitular',function(req,res)
{
    console.log(req.body);
    apiController.crearTitular(req,res);
});

//EndPoint para eliminar titular en la BD
router.delete('/eliminarTitular/Esctitular',function(req,res)
{
    apiController.eliminarTitular(req,res);
});

//EndPoint para modificar titular en la BD
router.post('/actualizarTitular/Esctitular',function(req,res)
{
    apiController.actualizarTitular(req,res);
});



//EndPoint para insertar  usuario en la BD con Social Credentials
/*router.post('/registerUserWithSocialCredentials/Bpuser',function(req,res)
{
    console.log(req.body);
    apiController.registerUserWithSocialCredentials(req,res);
});
*/

// Export API routes
module.exports = router;