import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import UserAlbum from '../UserAlbum';
import AlbumList from '../AlbumList';
import "./style.css";

export default class UserCollection extends Component {
    constructor(props) {
        super(props);
        const token = localStorage.getItem('user-jwt');
        this.state = {
            isLoggedIn: token,
            user: {},
            userAlbums: [],
        }
    }

    componentDidMount = async () => {
        this.fetchUser();
        this.fetchAlbums();
    }

    fetchUser = async () => {
        const user = await (await fetch('/api/current-user', {
            method: "GET",
            headers: {
                'jwt-token': this.state.isLoggedIn,
            }
        })).json();
        this.setState({
            user: user
        });
    }

    fetchAlbums = async () => {
        const albums = await (await fetch('/api/current-user/albums', {
            method: "GET",
            headers: {
                'jwt-token': this.state.isLoggedIn,
            }
        })).json();

        this.setState({
            userAlbums: albums
        });
    }

    deleteAlbum = async (id) => {
        const deleteAlbum = await fetch('/api/current-user/albums', {
            method: "DELETE",
            body: JSON.stringify({ albumId: id }),
            headers: {
                'Content-Type': 'application/json',
                'jwt-token': this.state.isLoggedIn
            }
        });
        this.fetchUser();
        this.fetchAlbums();
    }

    render() {
        return (
            <div>
                <div className="user-collection-container">
                    <h1 className='personalize-welcome'>Welcome {this.state.user.name}!</h1>
                    <div>
                        <button className='update-profile-button'><Link className='update-link' to='/my-collection/update'>Update Your Profile</Link></button>
                    </div>
                    <div className="user-container">
                        <div className="user-img-container">
                            <img className='user-profile-pic' src={this.state.user.pictureSrc} alt='user-picture' />
                        </div>
                        <div className="user-info">
                            <h2>User Name: {this.state.user.username}</h2>
                            <h2>Email: {this.state.user.email}</h2>
                            <h2>City: {this.state.user.city}</h2>
                           
                        </div>
                    </div>
                    <div className="album-collection-container">
                        <div className='vinyl-collection'>
                            <h2 className='vinyl-collection-h2'>Your Vinyl Collection</h2>
                        </div>
                        {this.state.userAlbums.length > 0 && this.state.userAlbums.map(userAlbum => {
                            let count = 0;
                            return (
                                <UserAlbum
                                    key={userAlbum.id - `${count += 1}`}
                                    id={userAlbum.id}
                                    albumImgSrc={userAlbum.coverPictureSrc}
                                    albumTitle={userAlbum.title}
                                    albumArtist={userAlbum.artist}
                                    onClickDeleteButton={() => this.deleteAlbum(userAlbum.id)}
                                />
                            )
                        }
                        )}
                    </div>
                    <div className='add-button-div'>
                        <button className='addition-button'> <Link className='addition-link' to='/albums'>Add New Album</Link></button>
                    </div>
                </div>
                <Route exact path="/albums" component={AlbumList} />
            </div>
        )
    }
}
