const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;


var app = express();
app.set('view engine', 'hbs');
app.use((req,res,next)=> {
    var now = new Date().toString();
    var log = req.method + ' ' + req.path;
    fs.appendFile('server.log', log + '\n', (err)=>{
        if(err) throw err;
    });
    next();
});

app.use((req,res,next)=>{
    res.render('maintenance.hbs',{
        pageTitle:'Maintenance'
    });
});

hbs.registerPartials(__dirname + '/views/partial');

hbs.registerHelper('getCurrentYear',()=>{
    return new Date().getFullYear();
})


app.get('/home', (req,res) =>{
   // res.send('<h1>Hello<h1>');
   res.render('home.hbs',{
        pageTitle:'Welcome Page',
       // currentYear: new Date().getFullYear(),
        welcome: 'Home'
   });
});

app.get('/about', (req,res) =>{
    res.render('about.hbs',{
        pageTitle:'About Page',
       // currentYear: new Date().getFullYear()
    });

});

app.get('/j',(req,res) => {
    res.send({
        name:"Ankit",
        age:24
    })
});

app.get('/bad',(req,res) => {
    res.send({
        status:"Error",
    })
});

app.listen(port, () => {
    console.log(`Server ${port} is started`);
});
