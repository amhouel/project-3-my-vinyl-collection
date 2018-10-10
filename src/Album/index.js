import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import AlbumDetails from '../AlbumDetails';
import "./style.css";

export default class Album extends Component {

  render() {
    return (

      <div className="album-container" >
        <Link to={`/albums/${this.props.id}`}>
          <div className='prop-title'>{this.props.title}</div>
          <div className ='prop-artist'>{this.props.artist}</div>
          <div><img className='album-image-solo' src={`images/${this.props.coverPictureSrc}`}></img></div>
        </Link>
        <Route exact path={`/albums/${this.props.id}`}
          render={(props) => <AlbumDetails {...props} />} />
        <button
          className="add-album-button"
          type="button"
          onClick={this.props.onClickAddButton}>Add To Collection</button>
      </div>
    )
  }
}
