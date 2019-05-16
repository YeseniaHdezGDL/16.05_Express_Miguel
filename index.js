const express = require('express');
const usandoXpress = express(); //lo normal es que se use la palabra 'app' en vez de 'usandoXpress'.
const puerto = 3000;
const elCamino = require('path'); //como en node

usandoXpress.all('/holi', (loQuePido, loQueRegreso) => loQueRegreso.send('Que pedo banda'));  
usandoXpress.all('/bye', (loQuePido, loQueRegreso) => loQueRegreso.send('Adios pues!'));
usandoXpress.use('/lainfo', express.static(elCamino.join(__dirname, 'lainfo'))); //para mostrar archivos/folders estáticos

usandoXpress.listen(puerto, function () {
  console.log('Este servidor corre bien en: ' + puerto);
});


//http://localhost:3000/lainfo/lainfo.txt así se accede

/*usandoXpress.get('/holi', function(loQuePido, loQueRegreso) {
    loQueRegreso.send('Hola gente!');
});

usandoXpress.post('/holi', function(loQuePido, loQueRegreso) {
    loQueRegreso.send('Hola gente!');
});

usandoXpress.get('/holi', function(loQuePido, loQueRegreso) {
    loQueRegreso.send('Hola gente!');
});

usandoXpress.put('/holi', function(loQuePido, loQueRegreso) {
    loQueRegreso.send('Hola gente!');
});

usandoXpress.delete('/holi', function(loQuePido, loQueRegreso) {
    loQueRegreso.send('Hola gente!');
});ESTO SI FUNCIONA, PERO SE EVITA PONIENDO .all jeje*/

/*usandoXpress.get('/holi', function (req, res) {
  res.send('Hola gente!');
});ESTO SI FUNCIONA*/

/*const taco = (loQuePido, loQueRegreso) => {
    if(loQuePido.usandoXpress.get('/holi',)) {
        let respuesta = saludo(loQuePido);
        loQueRegreso.end(respuesta);
    }
    else if (loQuePido.usandoXpress.get('/bye')) {
        let respuesta = despedida(loQuePido);
        loQueRegreso.end(respuesta);
    }
}ESTO NO FUNCIONA*/

//la diferencia entre usar .all y .use

