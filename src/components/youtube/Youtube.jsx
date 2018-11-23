/* eslint-disable */
import React, { Component } from 'react';
import Axios from 'axios';
import MovieIcon from '@material-ui/icons/Movie';
import AvTimerIcon from '@material-ui/icons/AvTimer';
import VisibilityIcon from '@material-ui/icons/Visibility';
import FavoriteIcon from '@material-ui/icons/Favorite';
import WarningIcon from '@material-ui/icons/Warning';
import PropTypes from 'prop-types';

import { YoutubeService } from '../../services/youtube/Youtube';
import './Youtube.scss';

const service = new YoutubeService();

class Youtube extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trends: [],
      isError: false
    };
  }

  componentWillMount() {
    this.props.setTitle('YOUTUBE');
    this.props.onChanges(() => this.loadVideos());
  }

  async loadVideos() {
    Axios.all(await service.getTrendingVideos(this.props.config.maxVideosToLoad))
         .then((data) => {
           this.setState({
             trends: data,
             isError: false
           });
         })
         .catch((err) => {
           this.setState({isError: true});
           console.log(err);
         });
  }

  openVideo() {
    return window.location.href = '/youtube/' + this;
  }

  youtubeCard() {
    return this.state.trends.map((videos, index) =>
      <div key={index} className="card-container">
        <div className="card" onClick={this.openVideo.bind(videos.id)}>
          <div className="img-container">
            <img src={videos.thumbnail} alt={videos.title}/>
            <MovieIcon/>
          </div>
          <div className="video-statistic">
            <div className="publishedAt">
              <AvTimerIcon/>
              <span>{videos.publishedAt}</span>
            </div>
            <div className="viewCount">
              <VisibilityIcon/>
              <span>{videos.viewCount}</span>
            </div>
            <div className="likeCount">
              <FavoriteIcon/>
              <span>{videos.likeCount}</span>
            </div>
          </div>
          <p className="video-title text-ellipsis">
            {videos.title}
          </p>
        </div>
      </div>
    );
  }

  errorOnPage() {
    return <div className="error-plate">
    <WarningIcon/>
    <span>Error loading. Please try again later.</span>
  </div>;
  }

  render() {
    return !this.state.isError ? ( <div id="youtube">
      <div className="row">
        {this.youtubeCard()}
      </div>
    </div>) : (this.errorOnPage());
  }
}

Youtube.propTypes = {
  setTitle : PropTypes.func,
  config   : PropTypes.object,
  onChanges: PropTypes.func
};

export default Youtube;
