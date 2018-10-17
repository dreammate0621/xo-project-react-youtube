import { YoutubeService } from './Youtube';
import expect from 'expect';

it('renders without crashing', () => {
 new YoutubeService();
});

it('getTrendingVideos function', async () => {
  const service = new YoutubeService();
  const result = await service.getTrendingVideos();
  expect(result.length).toEqual(24);
});
