const express = require("express");
const app = express();

app.get('/', (req, res)=>{
    res.send('Hola Mundito');
});

app.get('/saludo', (req, res)=>{
    console.log('Buenos días Tecnológicos');
    res.send('Buenos días Tecnológicos');
});

app.get('/saludo/:nombre/:edad/:direccion', (req, res)=>{
    console.log('Buenos días ALEXIS');
    res.send(`Buenos días ${req.params.nombre}<br> tienes ${req.params.edad} años <br> y vives en la zona ${req.params.direccion}`);
});

app.listen(3000, ()=>{
    console.log('Servidor OK en puerto 3000');
});

