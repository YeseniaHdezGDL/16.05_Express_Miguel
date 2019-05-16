

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

/*
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
*/ 

//Lo de abajo es para agregar elementos a un arreglo llamado librería
//recordar que cuando haces cosas en el body, van a ser peticiones POST porque se está agragando info
//cuando es GET no se hace nada el body
//ya listo el código, ponerlo a correr en consola y abrir postman
//en postman picarle a cookies y añadir una a localhost add
//quitar primera parte y poner foo=bar; add cookie
//abajo de post, ir al body (después de headers) en barra horizontal
//desde ahí añadir {"libro":"Los miserables", "autor":"Victor Hugo"}
//si todo bien, aparecerá "el libro a sido añadido"

/*tercer commit
const express = require('express');
const app = express(); 
const port = 3000;

const parseadorCuerpo = require('body-parser'); //middleware
const parseadorCookies = require ('cookie-parser'); //middleware

let libreria = [];

app.use(parseadorCuerpo.json()); //como son middlewares, se ponen como .use
app.use(parseadorCookies());

app.post('/libritos', (req, res) => {
    console.log(req.body); //{"libro":"Los miserables", "autor":"Victor Hugo"}
    console.log(req.cookies); //imprime la cookie que agregamos: foo=bar.
    if (req.body.libro && req.body.autor) {
        libreria.push(req.body);
        res.status(200).send("El libro ha sido añadido.");
    } else {
        res.status(400).send({error: "Tienes que poner un libro y un autor."})
    }
});

app.listen(port, function () {
    console.log('Este servidor corre bien en: ' + port);
});
*/

//falta correrlo correctamente

const express = require('express');
const llavecita = require('jsonwebtoken'); //recordar que el nombre formal es jwt

const app = express();
const port = 3000;
const llavePrivada = 'holagente'

//Para verificar que el usuario existe en base de datos
app.post('/auth/signin', (req, res) => { 
    if (req.body.usuario && req.body.contrasena) {
        res.status(400).send("Se necesita usuario y contraseña")
};

llavecita.sign({ user: req.body.user, theme: 'black' }, llavePrivada, function(err, token) {
    if(err) {
      res.send(500).end();
    } else {
      res.status(200).send({token: token})
    }
  });

llavecita.verify(req.headers.authorization, llavePrivada, function(err, decoded) {
    if(err) {
      res.status(500).end('aqui')
    } else {
      console.log(decoded)
    }
  });

app.use((req, res, next) => {
    llavecita.verify(req.headers.authorization, llavePrivada, function(err, decoded) {
        if (err) {
            res.status(500).end('Aquí')
        } else {
            console.log(decoded)
            next()
        }
    });
});

app.get('/otrolugar', (req, res) => {
    res.send("Al otro lado del camino")
});

app.listen(port, function () {
    console.log('Este servidor corre bien en: ' + port);
});