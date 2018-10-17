import React from 'react';
import ReactDOM from 'react-dom';
import Youtube from './Youtube';

const config = {};
let store;
const onChanges = (fn) => {
  if (fn) {
    store = fn;
  }

  store();
};
let titleStore = '';
const setTitle = (title) => {
  if (title) {
    titleStore = title;
  }
  return titleStore;
};

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Youtube config={config} onChanges={onChanges} setTitle={setTitle} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
