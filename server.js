// we are requiring express module
const express = require('express'); 
//requiring path module-- built in and no install needed allows us to join paths and resolve joining local directory with directory path of local computer
const path = require('path'); 
//we take express and execute it--we get an express application
const app = express();  
//set a const for a port number-- this will never change by denotting them in all CAPS
const PORT = process.env.PORT || 3001; 
// local host-middleware-what happens in between request and responses on express server. we are telling the app to serve assets: a static directory called public--this will allow and expose the html files as public info on internet// local host-middleware-what happens in between request and responses on express server. we are telling the app to serve a static directory called public--this will allow and expose the html files as public info on internet
app.use(express.static('public'));  
// Sets up the Express app to handle data parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// importing the package/module: fs -file system
const fs = require('fs'); 
// generates unique ids
const uuid =
  Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);

    // ******************************************************BELOW IS GET (receive saved notes) API****************************

// RETURN ALL THE NOTES
app.get('/api/notes', (req, res) => {
  fs.readFile('./db/db.json', 'utf-8', (err, data) => { 
    if (err) {
      console.error(err);
    } else {
      // Convert string into JSON object
      res.json(JSON.parse(data))
    }
});
    // Log our request to the terminal
    console.info(`${req.method} request received to get notes`);

  });

    // ******************************************************BELOW IS POST (send notes) API****************************
app.post('/api/notes', (req, res) => {
  console.info(`${req.method} request received to add a note`);
  const { title, text } = req.body; //activity 17
  if (title && text) {
    // Variable for the object we will save
    const saveNote = {
      title,
      text,
      note_id: uuid,
    };
    fs.readFile('./db/db.json', 'utf-8', (err, data) => { 
      if (err) {
        console.error(err);
      } else {
        // Convert string into JSON object
        const parsedData = JSON.parse(data); //parseddata is what is currently in db file
        parsedData.push(saveNote);
        // console.log('pushed worked',parsedData);
        fs.writeFile('./db/db.json', JSON.stringify(parsedData, null, 2), (err) =>
          err
            ? console.error(err)
            : console.log(
              `note titled: ${saveNote.title} has been POSTED to JSON file` 
            )
        );
        const response = {
          status: 'success',
          body: saveNote,
        };
    
        console.log(response);
        res.status(201).json(response);
      }
    });
    
  } else {
    res.status(500).json('Error in saving note');
  }
});
  // TO DO: return the HTML routes: notes file
  app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
  });

  //TO DO: return the HTML routes: index.html file
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
  });

  app.listen(PORT, () =>
    console.log(`Example app listening at http://localhost:${PORT}`)
);
