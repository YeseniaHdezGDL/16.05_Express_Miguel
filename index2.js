const express = require('express');
const app = express(); 
const port = 3000;
const path = require('path'); 

//get, patch y otro método, con tres urls diferentes, con status diferentes y textos en cada status, primer commit

/*app.get('/something', (req, res) => { //recuerda que el único método que vas a visualizar en el browser es GET (dar info), los demás métodos sólo en postman.
    res.status(418).send("algo") //aquí pueden ser archivos también.
});

app.patch('/somethingelse', (req, res) => { 
    res.status(404).send("error: no hay nada")
});

app.listen(port, function () {
  console.log('Este servidor corre bien en: ' + port);
});*/ 

//Abajo estamos haciendo un MIDDLEWARE (línea 27-39) que básicamente es hacer algo "en medio" de la función real para un mismo path (/holi)

app.all('*', (req, res, next) => { //'*' es para indicar que cuando se haga una req siempre se haga esto, como una función global
    console.log('Esta persona buscó esto en: ', req.path); //estos datos se imprimen en consola para, por ejemplo, conocer las acciones (búsquedas, preferencias etc) que realizas
    next(); //con esta línea estamos indicando que pase a realizar lo siguiente terminado el console
});

app.get('/holi', (req, res, next) => {
    //res.send('hola por primera vez');// lo quité para que se ejecute el next
    console.log('holaaa por primera vez en la consola'); 
    next(); //como pusimos next otra vez, y NO HAY un res.send pasa a la siguiente, porque eso sí, NO PUEDE HABER DOS res.send para un mismo path (/holi)
});

app.get('/holi', (req, res) => {
    res.send("hola por segunda vez") //esto si se muestra en browser/postman
});

app.get('/salebye', (req, res) => {
    res.end("Adios pues")
});


app.listen(port, function () {
    console.log('Este servidor corre bien en: ' + port);
});