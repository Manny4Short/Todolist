let bodyparser = require('body-parser');
let mongoose = require('mongoose');
let dotenv = require('dotenv');

dotenv.config({
    path: './.env'
})


//database key

let datakey = process.env.DATABASE_LINK

//connect to mongodb cloud
mongoose.connect(datakey, { useNewUrlParser: true , useUnifiedTopology: true} );

//create a mongodb schema
let todoSchema = new mongoose.Schema({
    item: String
})

let Todo = mongoose.model('Todo', todoSchema);

let urlencodedparser = bodyparser.urlencoded({extended: false});


module.exports = function(app){

    app.get('/todo' , function(req, res){
        //get data from mongodb and pass to the view
        Todo.find({}, function(err, data){
            if (err) throw err;
            res.render('todo', {todos: data});
            console.log('data passed to the view')
        })
        
    })
    
    app.post('/todo' , urlencodedparser, function(req, res){
        //get data from the view and add it to mongo db
        let newTodo = Todo(req.body).save(function(err,data){
            if (err) throw err;
            res.json(' list passed to the database')
        })
                
    })

    app.delete('/todo/:item' , function(req, res){

        //delete specific item from mongodb
        let forDelete = {item: req.params.item.replace(/\-/g, " ")}
        Todo.deleteOne(forDelete, function(err,data){
            if (err) throw err;
            res.json(data);
            console.log('data deleted from the database')
        })
       
    })
}