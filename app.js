const express = require("express");
const multer  = require("multer");
  
const app = express();
 
const upload = multer({dest:"uploads"});
app.use(express.static(__dirname));
 
app.post("/upload", upload.single("filedata"), function (req, res, next) {

    if (req.url == '/') { //check the URL of the current request
        
        // set response header
        res.writeHead(200, { 'Content-Type': 'text/html' }); 
        
        // set response content    
        res.write('<html><body><h1>Upload file</h1><form action="/upload" method="post" enctype="multipart/form-data"><label>Файл</label><br> <input type="file" name="filedata" /><br><br><input type="submit" value="Send" /></form></body></html>');
        res.end();
    }


    let filedata = req.file;
 
    console.log(filedata);
    if(!filedata)
        res.send("Ошибка при загрузке файла");
    else
        res.send("Файл загружен");
});
app.listen(process.env.PORT || 5000);