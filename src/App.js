import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Header } from './components/header';
import { Footer } from './components/footer';
import { Content } from './components/content';
import { Navbar, Nav } from 'react-bootstrap';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Create } from './components/create';//imported create component 
import { Read } from './components/read';//imported read component 
import { Edit } from './components/edit';

class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="/">Navbar</Navbar.Brand>
            <Nav className="mr-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/create">Create</Nav.Link>
              <Nav.Link href="/read">Read</Nav.Link>
            </Nav>
          </Navbar>
          <Switch>
            <Route path='/' component={Content} exact></Route>
            {/* Repleaced "footer" with create */}
            <Route path='/create' component={Create} exact></Route>
            {/* Repleaced "header" with read */}
            <Route path='/read' component={Read} exact></Route>
            {/* Adding Edit component */}
            <Route path='/edit/:id' component={Edit} exact></Route>
          </Switch>



          {/* <Header></Header>
          <Content></Content>
          <Footer></Footer> */}
        </div>
      </Router>
    );
  }
}

export default App;
