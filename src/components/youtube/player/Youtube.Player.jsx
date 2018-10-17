import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import './Youtube.Player.scss';

class YoutubePlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    const id = window.location.href
      .replace(/^.*\//g, '')
      .replace(/^.*\..*/g, '');
    const iframe = '<iframe title="Video"' +
      '        width="100%"' +
      '        height="100%"' +
      '        src={https://www.youtube.com/embed/'+id+'?autoplay=1}'+
      '        frameBorder="0"'+
      '        allowFullScreen/>';
    setTimeout(() => {
      if (document.getElementsByClassName('frame-block')[0]) {
        document.getElementsByClassName('frame-block')[0].innerHTML = iframe;
      }
    }, 1000);

  }

  render() {
    return (
      <div className="video-container">
        <div className="frame-block"/>
        <div className="controls">
          <Link className="btn btn-primary" to="/youtube"> &#60; Back to Trends</Link>
        </div>
      </div>);
  }
}

export default YoutubePlayer;
