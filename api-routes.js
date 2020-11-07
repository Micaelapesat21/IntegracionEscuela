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

//EndPoint para insertar titular en la BD
router.post('/crearTitular/Esctitular',function(req,res)
{
    console.log(req.body);
    apiController.crearTitular(req,res);
});

//EndPoint para eliminar  usuario en la BD
router.delete('/eliminarTitular/Esctitular',function(req,res)
{
    apiController.eliminarTitular(req,res);
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