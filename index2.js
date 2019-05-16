const express = require('express');
const app = express(); 
const port = 3000;
const path = require('path'); 

//get, patch y otro método, con tres urls diferentes, con status diferentes y textos en cada status.

app.get('/something', (req, res) => { //recuerda que el único método que vas a visualizar en el browser es GET (dar info), los demás métodos sólo en postman.
    res.status(418).send("algo") //aquí pueden ser archivos también.
});

app.patch('/somethingelse', (req, res) => {
    res.status(404).send("error: no hay nada")
});


app.listen(port, function () {
  console.log('Este servidor corre bien en: ' + port);
});

