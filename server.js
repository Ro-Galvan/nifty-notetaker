const express = require('express'); // we are requiring express module
const path = require('path'); //requiring path module

const app = express();  //we take express and execute it--we get an express application
const PORT = process.env.PORT || 3001; //set a const for a port number-- this will never change by denotting them in all CAPS

app.use(express.static('public'));  // middleware-what happens in between request and responses on express server. we are telling the app to serve a static directory called public--this will allow and expose the html files as public info on internet

app.use(express.json()); 
app.use(express.urlencoded({extended:true}));








app.get('*',(req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});
app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);