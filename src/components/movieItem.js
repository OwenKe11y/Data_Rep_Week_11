import React from 'react';
import '../App.css';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button'; //import bootstrap button
import { Link } from 'react-router-dom';
import axios from 'axios';
export class MovieItem extends React.Component {

    //delete constructor
    constructor(){
        super();

        this.DeleteMovie = this.DeleteMovie.bind(this);
    }

    //delete movie function 
    DeleteMovie(e){
        e.preventDefault();
        console.log("Delete: "+this.props.movie._id);

        axios.delete("http://localhost:4000/api/movies/"+this.props.movie._id)
        .then(()=>{
            this.props.ReloadData();
        })
        .catch();
    }


    render() {

        return (
            <div className="App">
                {/* Bootstrap Card to seperate each movie */}
                <Card>
                    <Card.Header>
                        {/* Movie Title */}
                        <h4>{this.props.movie.title}</h4>
                    </Card.Header>
                    <Card.Body>
                        <blockquote className="blockquote mb-0">

                            {/* Movie Poster */}
                            <img src={this.props.movie.poster} width="300" height="400"></img>

                            <footer className="blockquote-footer">
                            {/* Movie Release Year */}
                            {this.props.movie.year}
                            </footer>
                        </blockquote>
                    </Card.Body>

                    {/*Edit Movie Button*/}
                    <Link to={"/edit/" + this.props.movie._id} className="btn btn-primary">Edit</Link>

                    {/*Delete Movie Button*/}
                    <Button variant="danger" onClick={this.DeleteMovie}>Delete</Button>
                </Card>

            </div>
        );
    }
}