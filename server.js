const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3001;
const idgenerater = require('./idgenerater')
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(express.static('public'));
const {savednotes} = require("./db/Notes.json");

const writenote = (body, savednotesArray) => {
    const note = body;
    savednotesArray.push(note);
    fs.writeFileSync(
      path.join(__dirname, './db/Notes.json'),
      JSON.stringify({ savednotes: savednotesArray })
    );
    return note;
  }; 
  
  // app.get('*', (req, res) => {
  //   res.sendFile(path.join(__dirname, './Develop/public/index.html'));
  // });

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('/api/notes', (req, res) => {
  res.json(savednotes);
});

app.post('/api/notes', (req, res) => {
  req.body.id = idgenerater();
  const newnote = writenote(req.body, savednotes);
  res.json(newnote);
});
    
app.listen(PORT, () => {
    console.log(`Server is listening on PORT ${PORT}`);
  });