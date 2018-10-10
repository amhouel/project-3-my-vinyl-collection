import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import AlbumDetails from '../AlbumDetails';
import "./style.css";

export default class UserAlbum extends Component {
    albumClick = async (id) => {
        this.setState({
            id: id
        });
    }

    render() {
        return (
            <div className="album-container" onClick={this.albumClick}>
                <Link to={`/albums/${this.props.id}`}>
                    <div className="album-image-container">
                        <img className="album-image" src={`images/${this.props.albumImgSrc}`} alt="album cover" />
                    </div>
                    <div className="album-info-container">
                        <div className="album-title-div">{this.props.albumTitle}</div>
                        <div className="album-artist-div">{this.props.albumArtist}</div>
                    </div>
                </Link>
                <Route exact path={`/albums/${this.props.id}`}
                    render={(props) => <AlbumDetails {...props} />} />
                <button className='deletion-button' onClick={this.props.onClickDeleteButton}>Delete From Collection</button>
            </div>
        )
    }
}   
