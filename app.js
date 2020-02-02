let express = require('express');
let todoController = require('./controllers/todoController')

let app = express();

//set up template engine

app.set('view engine', 'ejs');

//statice files
app.use( express.static('./assets'));

//fire controllers
todoController(app)
//set up port
app.listen(3000);
console.log('now listening to port 3000');