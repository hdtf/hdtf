// JavaScript source code
const http = require('http');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const db = require('./database');


app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));


app.post('/register.html', function (req, res) {
    let name = req.body.name;
    let numb = req.body.numb;
    let phone = req.body.phone;
    let git = req.body.git;
    let act = req.body.acti;
    let interest = [0, 0, 0, 0, 0, 0, 0, 0, 0, ""];
    let talent = [0, 0, 0, 0, 0, 0, 0, 0, 0, ""];
    for (let i = 1; i < 11; i++) {
        eval("var c = req.body.c" + i + ";");
        eval("var d = req.body.d" + i + ";");
        if (c) {
            if (c === "on") {
                c = 1;
            }
            interest[i-1] = c;
        }
        if (d) {
            if (d === "on") {
                d = 10;
            }
            talent[i-1] = d;
        }
    }
    console.log(name);
    console.log(numb);
    console.log(phone);
    console.log(git);
    console.log(act);
    console.log(interest);
    console.log(talent);
    db.setDB(name, numb, phone, git, act, interest, talent, (err) =>{
        if(err){
            res.send("<script>alert('아 씨x 에러남');location.href='http://klist.cf';</script>");
        }else{
            res.send("<script>alert('Message sent succesfully');location.href='http://klist.cf';</script>");
        }
    });


});

http.createServer(app).listen(80, function () {
   console.log('Server running at klist.cf');
});