
const { create } = require('domain');
const express = require('express');
const path = require('path');
const { title } = require('process');
const dataj=require('./db/db.json')
const fs = require("fs");
const { text } = require('express');

const app = express();
const PORT = 3001;

app.use(express.json());//add req.body
var uniqid = require('uniqid');// ad id

app.use(express.static('public'));



app.get("/notes",(req,res) =>{
    res.sendFile(path.join(__dirname, 'public/notes.html'));
});

 





  
app.get('/api/notes',(req, res)=> {
    fs.readFile("db/db.json","utf8", (err, data) => {
        if (err) {throw err}
        else { 
        const notes= JSON.parse(data);
          res.json(notes);
        }
    });
});


 


   

  app.post("/api/notes",(req, res)=> {

     
     const {title,text} = req.body;
     const newNote={title,text, id:uniqid()};
     res.json(newNote);
     fs.readFile("./db/db.json","utf8", (err, data) => {
        if (err) {throw err}
        else {
          const notes= JSON.parse(data);
          notes.push(newNote); 
          fs.writeFile('./db/db.json',JSON.stringify(notes),err => {
            if (err) throw err;
            return true;
        });
           //console.log("Deleted note with id "+req.params.id);      
}
             })
  
  
    });


    app.get('*',(req,res)=>{
      res.sendFile(path.join(__dirname, 'public/index.html'))
  })




  app.delete("/api/notes/:id",(req, res)=>{
    fs.readFile("./db/db.json","utf8", (err, data) => {
       // console.log(data);
        if (err) {throw err}
        else { 
          const notes= JSON.parse(data);
          const newar =notes.findIndex(({id})=>id===req.params.id);
          if(newar>=0){
          notes.splice(newar,1);
          res.json(notes);
          fs.writeFile('./db/db.json',JSON.stringify(notes),err => {
                    if (err) throw err;
                    return true;
                });;
          //console.log("Deleted note with id "+req.params.id);      
        }
        
                
                   
          
    }
  
    })


});






       
 

 

          

    //  function writeNote(notes) {
    //     fs.writeFile('./db/db.json',JSON.stringify(notes),err => {
    //         if (err) throw err;
    //         return true;
    //     });
    // }

  
    

      app.listen(PORT, () =>
      console.log(` app listening at http://localhost:${PORT}`));


