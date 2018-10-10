import React, { Component } from 'react';
import UserWithSameTaste from '../UserWithSameTaste';
import AlbumList from '../AlbumList';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import "./style.css";

export default class AlbumDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      album: {}
    }
  }

  componentDidMount = async () => {
    this.scrollToTop();
    this.fetchAlbum();

  }

  fetchAlbum = async () => {
    const id = this.props.match.params.id;
    const response = await fetch(`/api/albums/${id}`)
    const album = await response.json();
    this.setState({
      album: album
    })
  }

  scrollToTop = () => {
    window.scrollTo(0, 0);
  }

  calculateRatingStars = () => {
    const rating = this.state.album.rating;

    let yellowStarString = '';

    for (let i = 0; i < rating; i++) {
      yellowStarString += '⭐️';
    }

    return yellowStarString;
  }

  fetchUser = async () => {
    const response = await fetch('/api/current-user', {
      headers: {
        'jwt-token': localStorage.getItem('user-jwt')
      }
    })
    const user = await response.json();
    this.setState({
      user: user
    });
  }

  AddToCollectionButton = async id => {
    await fetch('/api/current-user/albums', {
      method: 'POST',
      body: JSON.stringify({ albumId: this.state.album.id }),
      headers: {
        'Content-Type': 'application/json',
        'jwt-token': localStorage.getItem('user-jwt')
      }
    })
    this.fetchUser();
  }

  render() {
    return (
      <div>
        <div className="album-container-list">
          <button
            className="add-album-button"
            type="button"
            onClick={this.AddToCollectionButton}>Add To Collection</button>
          <button className='button-album-container' ><Link className='to-albumlist-button' to='/albums'>View Full Album List</Link></button>
          <Route exact path="/albums" component={AlbumList} />
          <div className='side-panel-1'>
            <div className="a1 album-title">
              <h2 className='desc-h2'>Album Title</h2>
              <div className='return-input'>{this.state.album.title}</div>
            </div>
            <div className="a1 album-artist">
              <h2 className='desc-h2'>Artist</h2>
              <div className='return-input'>{this.state.album.artist}</div>
            </div>
            <div className="a1 album-release">
              <h2 className='desc-h2'>Release Year</h2>
              <div className='return-input'>{this.state.album.releaseYear}
              </div>
            </div>
            <div className="a1 album-genre">
              <h2 className='desc-h2'>Genre</h2>
              <div className='return-input'>{this.state.album.genre}</div>
            </div>
          </div>
          <div className='side-panel-2'>
            <div className="a1 album-image-container">
              <h2 className='desc-h2'>Cover</h2>
              <img className="album-image-individual" src={`../images/${this.state.album.coverPictureSrc}`} />
            </div>
            <div className="album-rating">
              <h2 className='return-input-desc-h2'>Rating: <span className='rating-starz'> {this.calculateRatingStars()}</span></h2>
            </div>
            <div className="album-description">
              <h2 className='desc-h2'>Description</h2>
              <div className='return-input-description'>{this.state.album.description}</div>
            </div>

          </div>
        </div>
        <div className='same-taste desc-h2'>
          <UserWithSameTaste
            id={this.props.match.params.id} />
        </div>
      </div>
    )
  }
}
