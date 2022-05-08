const express = require('express'); //Importando la dependencia a una variable.
let app = express(); //Declaramos la app de Express.
let PORT = process.env.PORT || 3000; //Asignando el puerto que escuchará las peticiones.
app.use('/assets', express.static(__dirname + '/public')); //Directorio virtual para contenido estático.

app.set('view engine', 'ejs'); //Template de EJS

//Directorio raíz (nuestra primera ruta).
app.get('/',(req, res) => {
    res.send(`<!DOCTYPE html> <html lang="en"> <head> <link rel="stylesheet" href="/assets/style.css">
    <title>Document</title> </head>
    <body> <h1>Hola mundo </h1>
    </p></body> </html>`);
});

/*Segundo directorio, el cual recibe el nombre de una persona, un mensaje y 
un parámetro.*/
app.get('/person/:id', (req, res) => {
    res.render('person', {NAME: req.params.id, Msg: req.query.message, Times: req.query.times});
});

app.get('/student', (req, res) => {
    res.render('index'); //Indicamos el archivo index.ejs al método render.
});

/*Establecemos los parámetros de envío para nuestro tercer directorio "student",
añadiendo como parámetro extra un callback, esto con la finalidad de que se ejecute
antes que el route handler.*/
app.post('/student', express.urlencoded({ extended: false }), (req, res) => {
    res.send(`First Name es: ${req.body.fname}, 
    Last Name es: ${req.body.lname}`);
});

/*Una vez que demos click al botón "Submit" este route handler nos muestra en la consola 
la información contenida en el objeto JSON que se encuentra en nuestro archivo index.ejs.*/
app.post('/personjson', express.json({type: '*/*'}), (req, res) => {
    console.log('El objeto contiene:', (req.body));
    console.log('Nombre:' , req.body.firstname);
    console.log('Apellido:' , req.body.lastname);
});

app.listen(PORT); //Activamos el servidor.