var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/', function(req, res, next) {
  if(!req.body.height || !req.body.weight) {
    res.status(400)
    res.send("preencha os parametros height e weight").end()
  }
  res.send(calculateImc(req.body.height, req.body.weight)).end();
});


function translateImc(imc) {
    if (imc < 18.5) return 'magreza';
    else if (imc >= 18.5 && imc < 24.9) return 'normal';
    else if (imc >= 24.9 && imc < 30) return 'sobrepeso';
    return 'obesidade'
}


function calculateImc(height, weight) {
    if (!height || !weight) return null;

    var imc =  Number((weight /(height ** 2)).toFixed(2));
    var imcDescription = translateImc(imc);
   
    return {'imc': imc, 'imcDescription': imcDescription, "height": height, "weight": weight};;
}

module.exports = router;
