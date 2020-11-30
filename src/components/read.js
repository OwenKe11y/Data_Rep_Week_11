import React from 'react';
import '../App.css';
import { Movies } from './movies'; // import movies component 
import axios from 'axios';

export class Read extends React.Component {

    constructor(){
        super();
        this.ReloadData = this.ReloadData.bind(this);

    }
    
    //create variable to hold our data
    state = {
        movies:
            []

    };

    //Function for getting our movie data from our server api and promise
    componentDidMount() {
        axios.get('http://localhost:4000/api/movies').then
            (
                (response) => {
                    this.setState({ movies: response.data })
                })
            .catch(
                (error) => { console.log(error) } //incase something goes wrong
            );
    }

    //Reload the data on the page
    ReloadData() {

        axios.get('http://localhost:4000/api/movies').then
            (
                (response) => {
                    this.setState({ movies: response.data })
                })
            .catch(
                (error) => { console.log(error) } //incase something goes wrong
            );
    }



    render() {

        return (
            <div className="App">
                <h1>My read in another component</h1>
                {/* importing our movie tag */}
                <Movies movies={this.state.movies} ReloadData={this.ReloadData}></Movies>
            </div>
        );
    }
}