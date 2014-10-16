var express = require('express');    //Express Web Server 
var busboy = require('connect-busboy'); //middleware for form/file upload
var path = require('path');     //used for file path
var fs = require('fs-extra');       //File System - for file manipulation

var app = express();
app.use(busboy());
app.use(express.static(path.join(__dirname, 'public')));

app.route('/upload')
    .post(function (req, res, next) {

        //Function to upload the file and pass it to the folder

        var fstream;
        req.pipe(req.busboy);
        req.busboy.on('file', function (fieldname, file, filename) {
            console.log("Uploading: " + filename);

            //Path where image will be uploaded
            fstream = fs.createWriteStream(__dirname + '/public/file/' + filename);
            file.pipe(fstream);
            fstream.on('close', function () {    
                console.log("Upload Finished of " + filename);              
                res.redirect('back');           //where to go next
            });
        });
    });

var server = app.listen(3030, function() {
    console.log('Listening on port %d', server.address().port);
});