import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import path from 'path';

// Routes
import employee from './routes/employee.js';

var app = express();
dotenv.config();
app.set('port', process.env.PORT);

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())

// Root route
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, 'frontend', 'public')));
app.get('/', function (req, res, next) {
  res.sendFile(path.join(__dirname, 'frontend', 'public', 'index.html'));
});

app.get('/api', function (req, res, next) {
  res.json({ "message": "Hello from server!" });
});

// Employee routes
app.use("/api/employee", employee);

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
