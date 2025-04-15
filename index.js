const express = require('express');
const path = require('path');
const exec = require('child_process').exec;

const app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true })); 

app.get('/', (req, res) => {
    res.render('index');
});
app.get('/property', (req, res) => {
    res.render('property');
});
app.get('/getCalendar', (req, res) => {
  var command = 'curl https://ical.booking.com/v1/export?t=4a488311-a383-4796-91b8-cf3d8b877809'; 
  child = exec(command, function(error, stdout, stderr) {
    res.status(200).send(stdout);
  })
});
const port = process.env.PORT || 8080;
const server = app.listen(port, () => {
    console.log(`The application started on port ${server.address().port}`);
});