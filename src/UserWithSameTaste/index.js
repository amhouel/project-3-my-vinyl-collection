import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import BrowseUserMate from '../BrowseUserMate';
import "./style.css";
export default class UserWithSameTaste extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userMates: [],
      user: {}
    }
  }
  componentDidMount = async () => {
    this.fetchUserMates();
    this.fetchUser();
  }

  fetchUserMates = async () => {
    const id = this.props.id;
    const response = await fetch(`/api/albums/${id}/users`)
    const userMates = await response.json();
    this.setState({
      userMates: userMates
    })
  }

  fetchUser = async () => {
    const user = await (await fetch('/api/current-user', {
      method: "GET",
      headers: {
        'jwt-token': localStorage.getItem('user-jwt'),
      }
    })).json();
    this.setState({
      user: user
    });
  }

  render() {
    return (
      <div>
        {this.state.userMates.length > 0 && (
          <div className="usermate-list-container">
            <h2>Check out who also owns this album</h2>
            <div className='user-same-taste-list'>
              {this.state.userMates.map(userMate => {
                if (userMate.id !== this.state.user.id) {
                  return (
                    <div className="usermate-container" key={userMate.id}>
                      <Link className="usermate-link" to={`/users/${userMate.id}`}>
                        <div className="usermate-name">
                          {userMate.username.toUpperCase()}
                        </div>
                        <div className="usermate-image-container">
                          <img className="usermate-profile-pic" src={userMate.pictureSrc}></img>
                        </div>
                      </Link>
                      <Route exact path={`/users/${userMate.id}`}
                        render={(props) => <BrowseUserMate {...props} />} />
                    </div>
                  )
                }
              })}
            </div>

          </div>
        )}
      </div>
    )
  }
}
