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
// const notes = require('./db/db.json'); //--do I need this? can use to call each note using req.params,'/api/notes/:title' & with a for loop

// const uuid = require('./helpers/uuid'); // Helper method for generating unique ids
// generates unique ids
const uuid =
  Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);


    // ******************************************************BELOW IS GET (receive saved notes) API****************************
// TO DO: 
// (retrieve note data from a JSON file)-- read file

//1.   GET /api/notes should read the db.json file and return all saved notes as JSON.
// RETURN ALL THE NOTES
app.get('/api/notes', (req, res) => {
  fs.readFile('./db/db.json', 'utf-8', (err, data) => { 
    if (err) {
      console.error(err);
    } else {
      // Convert string into JSON object
      res.json(JSON.parse(data))
    }
      //***might need to do JSON.parse around readfile not console log it
    // res.json(JSON.parse(data))
    // console.log('not working', JSON.parse(data)
    // console.log(JSON.parse(data));
    // Sending all reviews to the client
    
});
    // Send a message to the client
    // res.json(`${req.method} request received to get notes`);
    
    // Log our request to the terminal
    console.info(`${req.method} request received to get notes`);
    
  });
  //   });

  // })



//   const readAndAppend = (title, text) => {
//     fs.readFile(file, 'utf8', (err, data) => {
//       if (err) {
//         console.error(err);
//       } else {
//         const parsedData = JSON.parse(data); //save to a variable
//         parsedData.push(content); //push into an array
//         saveNote(text, parsedData); //write a file
//       }
//     });
//   };
// });
  // readAndAppend(saveNote, './db/feedback.json');

// 1. WHEN I click on the Save icon
// 2. THEN the new note I have entered is saved and appears in the left-hand column with the other existing notes

// 3. WHEN I click on an existing note in the list in the left-hand column
// 4. THEN that note appears in the right-hand column

// 5. WHEN I click on the Write icon in the navigation at the top of the page
// 6. THEN I am presented with empty fields to enter a new note title and the note’s text in the right-hand column

    // ******************************************************BELOW IS POST (send notes) API****************************


// TO DO: The following API routes should be created: 

// This application will use an Express.js back end and will 
// (save note to JSON file)  WRITE it

// 1.  POST /api/notes should receive a new note to save on the request body, 
// add it to the db.json file, and then return the new note to the client. 
// You'll need to find a way to give each note a unique id when it's saved (look into npm packages that could do this for you).

app.post('/api/notes', (req, res) => {
  console.info(`${req.method} request received to add a note`);
  const { title, text } = req.body; //activity 17
  if (title && text) {
    // Variable for the object we will save
    const saveNote = [{
      title,
      text,
      note_id: uuid,
    }];
    const noteString = JSON.stringify(saveNote);  // (saveNote, null, 2); null and 2 are formatted styles when fs file is returned
    
    // const note = JSON.parse(data);
    // // Add a new review
    // note.push(saveNote);
    
    fs.writeFile('./db/db.json', noteString, (err) =>
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
  } else {
    res.status(500).json('Error in saving note');
  }
});

// console.log(req.body)
// save each one to its own variable, from req.body you need to pull then create another variable that stores note and append it 
// res.
// write to file takes in 2 arguments  traverse into dv and db.json
//add new note to the array



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
