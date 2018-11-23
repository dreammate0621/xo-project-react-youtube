import moment from 'moment';

export class VideoClass {
  id = '';
  title = '';
  thumbnail = '';
  publishedAt = '';
  viewCount = 0;
  likeCount = 0;

  constructor(data) {
    if (!data || !data[ 'snippet' ] || !data[ 'statistics' ]) {
      return;
    }

    this.id = data[ 'id' ];
    this.title = data[ 'snippet' ][ 'title' ];
    this.thumbnail = data[ 'snippet' ][ 'thumbnails' ][ 'high' ][ 'url' ];
    this.publishedAt = moment(data[ 'snippet' ][ 'publishedAt' ])
      .fromNow();

    const viewCount = parseInt(data[ 'statistics' ][ 'viewCount' ], 10);
    const likeCount = parseInt(data[ 'statistics' ][ 'likeCount' ], 10);
    this.viewCount = isNaN(viewCount) ? 0 : viewCount;
    this.likeCount = isNaN(likeCount) ? 0 : likeCount;
  }
}
