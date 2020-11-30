import React from 'react';
import '../App.css';
import axios from 'axios';
export class Edit extends React.Component {

    //constructor 
    constructor() {
        super();

        //Binding events
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeYear = this.onChangeYear.bind(this);
        this.onChangePoster = this.onChangePoster.bind(this);


        this.state = {
            Title: '',
            Year: '',
            Poster: ''
        }
    }

    //log unique id and update the document
    componentDidMount(){
        console.log(this.props.match.params.id);

        axios.get('http://localhost:4000/api/movies/' + this.props.match.params.id)
        .then(response => {
            this.setState({
                _id:response.data._id,
                Title:response.data.title,
                Year:response.data.year,
                Poster:response.data.Poster
            })
        })
        .catch((error)=>{
            console.log(error)
        })
    }

    //Method for Movie Title input
    onChangeTitle(e) {
        this.setState({
            Title: e.target.value
        });
    }

    //Method for Movie Year input
    onChangeYear(e) {
        this.setState({
            Year: e.target.value
        });
    }

    //Method for Movie Poster input
    onChangePoster(e) {
        this.setState({
            Poster: e.target.value
        });
    }

    //Method for when the movie is submitted
    onSubmit(e) {
        e.preventDefault();
        alert("Movie: " + this.state.Title + " " + "Year: " + this.state.Year + " " + "Poster: " + this.state.Poster);

        const newMovie = {
            title: this.state.Title,
            year: this.state.Year,
            poster: this.state.Poster,
            _id:this.state._id
        }

        axios.put('http://localhost:4000/api/movies/'+this.state._id,newMovie)
        .then(res =>{
            console.log(res.data)
        })
        .catch();


        // axios.post('http://localhost:4000/api/movies', newMovie)
        // .then((res)=>{console.log(res);
        // })
        // .catch((err)=>{console.log(err);
        // });

    }
    render() {

        return (
            <div className='App'>
                <form onSubmit={this.onSubmit}>

                    {/* Movie Title input Control */}
                    <div className="form-group">
                        <label>Add Movie Title</label>
                        <input type='text'
                            className="form-control"
                            value={this.state.Title}
                            onChange={this.onChangeTitle}></input>
                    </div>

                    {/* Movie Year input Control */}
                    <div className="form-group">
                        <label>Add Movie Year</label>
                        <input type='text'
                            className="form-control"
                            value={this.state.Year}
                            onChange={this.onChangeYear}></input>
                    </div>

                    {/* Movie Poster Control */}
                    <div className="form-group">
                        <label>Movie Poster</label>
                        <textarea type='text'
                            className="form-control"
                            value={this.state.Poster}
                            onChange={this.onChangePoster}></textarea>
                    </div>

                    {/* Add Movie button */}
                    <div className="form-group">
                        <input type='submit'
                            value='Edit Movie'
                            className='btn btn-primary'></input>
                    </div>
                </form>
            </div>
        );
    }
}