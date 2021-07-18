import Login from "./pages/signin.component";
import React from 'react';
import axios from 'axios';
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Nav from 'react-bootstrap/Nav'
import Home from "./pages/client.home.component"
import Order from "./pages/client.order.component";
import AuthService from "./services/auth.service";
import Profile from "./pages/profile.component";
import Story from "./pages/pdf-story.component";
import Dashboard from "./pages/agent.dashboard.component"
import './App.css';
import SignUp from "./pages/signup.component";

class App extends React.Component {
  constructor(props){
    super(props);
    this.logOut = this.logOut.bind(this);
    this.state = {
      currentUser : undefined,
      username : "",
      parts:[],
      orders: [],
    };
  }
  componentDidMount() {
    const user = AuthService.fetchCurrentUser();
    if (user) {
      this.setState({
        currentUser: user,
        username: user.username
      });
    }
  }
  getParts=()=>{
    axios.get('http://localhost:3000/parts')
    .then((response)=>{
      this.setState({parts: response.data});
      console.log(response.data)
    })
  }
  getPending = () => {
    axios.get('http://localhost:3000/pos/pending')
    .then((response) => {
        //console.log(response.data);
        this.setState({
            pending : response.data
        })
    });
  }
  getProcessed = () => {
    axios.get('http://localhost:3000/pos/processed')
    .then((response) => {
        //console.log(response.data);
        this.setState({
            processed : response.data
        })
    });
  }

  logOut() {
    AuthService.signout();
  }
  render(){
    const {currentUser} = this.state;
    return (
      <div className="App">
        <Navbar fixed="top" collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand style={{fontFamily:'Zen Tokyo Zoo'}} href="/">
          READ📚IT
        </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link style={{margin:"0px 10px 0px 10px"}} href="/">Books 📖</Nav.Link>
              <Nav.Link style={{margin:"0px 10px 0px 10px"}} href="/orders">Orders 📦</Nav.Link>
              <Nav.Link style={{margin:"0px 10px 0px 10px"}} href="/about">About us ℹ️</Nav.Link>
              <Nav.Link style={{margin:"0px 10px 0px 10px"}} href="/dashboard">Dashboard</Nav.Link>
            </Nav>
           
            <Nav>
              {currentUser ?(
                <NavDropdown title={this.state.username} id="basic-nav-dropdown" className="justify-content-end">
                <NavDropdown.Item href="profile">Profile</NavDropdown.Item>
                <NavDropdown.Item href="orders">Orders</NavDropdown.Item>
                <NavDropdown.Divider />
                  <NavDropdown.Item onClick={this.logOut}>Logout</NavDropdown.Item>
                </NavDropdown>
              ):(
                
                <Nav.Link eventKey={2} href="login" className="justify-content-end">
                  Login
                </Nav.Link>
              )}
            </Nav>

          </Navbar.Collapse>

        </Navbar>
        <div style={{maxWidth:'inherit'}} className="container">
          <BrowserRouter>
            <Switch>
              <Route exact path="/weekly">
                <Story/>
              </Route>
              <Route exact path="/">
                <Home/>
              </Route>
              <Route exact path="/orders">
                <Order/>
              </Route>
              <Route exact path="/profile">
                <Profile/>
              </Route>
              <Route exact path="/login">
                <Login/>
              </Route>
              <Route exact path="/dashboard">
                <Dashboard/>
              </Route>
              <Route exact path="/signup">
                <SignUp/>
              </Route>
              
            </Switch>
          </BrowserRouter>
        </div>
        
    </div>
    );
  }
}

export default App;
