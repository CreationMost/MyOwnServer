const express = require("express");
const multer  = require("multer");
  
const app = express();
 
const upload = multer({dest:"uploads"});
app.use(express.static(__dirname));
 
app.post("/upload", upload.single("filedata"), function (req, res, next) {

    res.writeHead(200);
    res.end(`
    <!DOCTYPE html>
<html>
<head>
    <title>Node.js</title>
    <meta charset="utf-8" />
</head>
<body>
    <h1>Upload file</h1>
    <form action="/upload" method="post" enctype="multipart/form-data">
        <label>Файл</label><br>
        <input type="file" name="filedata" /><br><br>
        <input type="submit" value="Send" />
      </form>
</body>
<html>`);
   
    let filedata = req.file;
 
    console.log(filedata);
    if(!filedata)
        res.send("Ошибка при загрузке файла");
    else
        res.send("Файл загружен");
});
app.listen(process.env.PORT || 5000);
