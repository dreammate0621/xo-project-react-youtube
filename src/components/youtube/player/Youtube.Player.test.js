import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import YoutubePlayer from './Youtube.Player';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Router><YoutubePlayer /></Router>, div);
  ReactDOM.unmountComponentAtNode(div);
});
