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
let port = process.env.PORT || 3000;
app.listen(port);
console.log(`now listening to port ${port}`);