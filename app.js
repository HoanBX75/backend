
const express = require('express');

const app = express();

app.use((req, res) => {
    res.json({ message: 'Votre requête coco a bien été reçue !' }); 
 });
 

module.exports = app;


/*
const server = http.createServer((req, res) => {
    console.log ("cpipic")
    res.end('Voilà la réponse d du serveur !');
});
server.listen(process.env.PORT || 3001);
*/

