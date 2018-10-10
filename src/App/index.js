import React, { Component } from "react";
import "./style.css";
import Login from "../Login";
import Register from '../Register';
import PrivateRoute from "../PrivateRoute";
import UserCollection from "../UserCollection";
import AlbumList from '../AlbumList';
import AlbumDetails from '../AlbumDetails';
import BrowseUserMate from '../BrowseUserMate';
import UpdateUser from '../UpdateUser';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

class App extends Component {

  logOut = () => {
    localStorage.clear();
  }

  render() {
    return (
      <Router>
        <div className="App">
          <div className="header-container">
            <h1 className='welcome-screen-title'>My Vinyl Collection</h1>
            <nav className="nav-links">
              <div className="link-wrapper">
                <Link 
                className="link"
                to='/my-collection'>My Collection  </Link>
                &nbsp;
                &nbsp;
            </div>
              <div className="link-wrapper">
                <Link 
                className="link"
                to='/register'>Register </Link>
                &nbsp;
                &nbsp;
            </div>
              <div className="link-wrapper">
                <Link 
                className="link"
                to='/' onClick={this.logOut}>Log out/ Log in </Link>
              </div>
            </nav>
          </div>
          <div className="body-container">
            <Switch>
              <PrivateRoute exact path="/albums" component={AlbumList} />
              <PrivateRoute exact path='/albums/:id' component={AlbumDetails} />
              <PrivateRoute exact path='/my-collection' component={UserCollection} />
              <PrivateRoute exact path='/users/:id' component={BrowseUserMate} />
              <PrivateRoute exact path='/my-collection/update' component={UpdateUser} />
              <Route exact path='/' component={Login} />
              <Route exact path='/register' component={Register} />
            </Switch>
          </div>
        </div>
      </Router >
    );
  }
}

export default App;
