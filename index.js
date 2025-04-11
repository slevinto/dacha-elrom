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
    var command = 'curl ';
  if (req.query.property == 'Botz')
    command = command + 'https://ical.booking.com/v1/export?t=4a488311-a383-4796-91b8-cf3d8b877809'; 
  if (req.query.property == 'Etz')
    command = command + 'https://ical.booking.com/v1/export?t=3ec950df-fed9-4ce4-8e71-4fcfbda7b057'; 
  child = exec(command, function(error, stdout, stderr) {
    res.status(200).send(stdout);
  })
});

const server = app.listen(3000, () => {
    console.log(`The application started on port ${server.address().port}`);
});