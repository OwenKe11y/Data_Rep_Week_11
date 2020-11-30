const express = require('express')
const app = express()
const port = 4000
const cors = require('cors');// import cors
const bodyParser = require("body-parser");//import body-parser
const mongoose = require('mongoose');//import mongoosejs
const path = require('path');

//navigate to build folder and static folder
app.use(express.static(path.join(__dirname, '../build')));
app.use('/static', express.static(path.join(__dirname, 'build//static')));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//include mongoose.connect
const myConnectionString = 'mongodb+srv://admin:admin@cluster0.mgmlj.mongodb.net/movies?retryWrites=true&w=majority';
mongoose.connect(myConnectionString, { useNewUrlParser: true });

//Define new Schema
const Schema = mongoose.Schema;

var movieSchema = new Schema({
    title: String,
    year: String,
    poster: String
});

//Declare movie Schema 
var MovieModel = mongoose.model("movie", movieSchema);

//Want to constantly use cors, code taken from lab sheet
app.use(cors());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


//Movie data linked to api/movies
app.get('/api/movies', (req, res) => {

    // const mymovies = [{
    //     "Title": "Avengers: Infinity War",
    //     "Year": "2018",
    //     "imdbID": "tt4154756",
    //     "Type": "movie",
    //     "Poster": "https://m.media-amazon.com/images/M/MV5BMjMxNjY2MDU1OV5BMl5BanBnXkFtZTgwNzY1MTUwNTM@._V1_SX300.jpg"
    //     },
    //     {
    //     "Title": "Captain America: Civil War",
    //     "Year": "2016",
    //     "imdbID": "tt3498820",
    //     "Type": "movie",
    //     "Poster": "https://m.media-amazon.com/images/M/MV5BMjQ0MTgyNjAxMV5BMl5BanBnXkFtZTgwNjUzMDkyODE@._V1_SX300.jpg"
    //     },
    //     {
    //     "Title": "Charlie Wilson's War",
    //     "Year": "2007",
    //     "imdbID": "tt0472062",
    //     "Type": "movie",
    //     "Poster": "https://m.media-amazon.com/images/M/MV5BMTgwMDgwMDc4MF5BMl5BanBnXkFtZTYwOTU3MDM4._V1_SX300.jpg"
    //     }
    //     ];

    //Interact with Data base
    MovieModel.find((err, data) => {
        res.json(data);
    })


    // //server status message if everything is ok
    // res.status(200).json({
    //     "message":"Everything is grand",
    //     movies:mymovies});
})

//Search for a movie
app.get('/api/movies/:id', (req,res)=>{
    console.log(req.params.id);

    //return movie if it has that id
    MovieModel.findById(req.params.id, (err, data)=>{
        res.json(data);
    })
})

//Update a Movie
app.put('/api/movies/:id', (req,res)=>{
    console.log("Update movie: " + req.params.id);
    console.log(req.body);

    MovieModel.findByIdAndUpdate(req.params.id,req.body, {new:true},
        (err,data)=>{
            res.send(data);
        })
})

//Delete a movie 
app.delete('/api/movies/:id', (req,res)=>{
    //console.log for debugging 
    console.log("Delete movie: " +req.params.id);

    MovieModel.findByIdAndDelete(req.params.id, (err,data)=>{
        //return some data
        res.send(data);
    });
});


//sending movie title, year and poster to the console using middle ware
app.post('/api/movies', (req, res) => {
    console.log('Movie recieved');
    console.log(req.body.title);
    console.log(req.body.year);
    console.log(req.body.poster);

    MovieModel.create({
        title: req.body.title,
        year: req.body.year,
        poster: req.body.poster

    });

    res.send('Item added');

})

//navigate to the index.html in build
app.get('*', (req,res)=>{
    res.sendFile(path.join(__dirname+'/../build/index.html'))
})

//localhost:4000
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})