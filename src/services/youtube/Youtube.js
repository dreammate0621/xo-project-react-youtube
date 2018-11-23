import Axios from 'axios';
import {appConfig} from '../../config';
import {VideoClass} from '../../models/video.class';

const axios = Axios.create({
  baseURL: appConfig.getYoutubeEndPoint('videos')
});

export class YoutubeService {
  constructor() {
    this.nextPageToken = '';
  }

  async getTrendingVideos(videosPerPage = appConfig.maxVideosToLoad) {
    this.nextPageToken = '';

    const request = (params) => axios.get('/', {params}).then(({ data }) => {
      const { items, nextPageToken } = data;
      this.nextPageToken = nextPageToken;

      return items
        .map((item) => new VideoClass(item))
        .filter((item) => item.id !== '');
    }).catch((err) => err);

    let videos = [];
    let getParams = {
      part: appConfig.partsToLoad,
      chart: appConfig.chart,
      videoCategoryId: appConfig.defaultCategoryId,
      regionCode: appConfig.defaultRegion,
      maxResults: Math.min(videosPerPage, 50),
      key: appConfig.youtubeApiKey,
      pageToken: this.nextPageToken
    };

    while (videos.length < videosPerPage) {
      getParams.maxResults = Math.min(videosPerPage - videos.length, 50);
      getParams.pageToken = this.nextPageToken;
      videos = videos.concat(await request(getParams));
    }

    return videos;
  }
}
