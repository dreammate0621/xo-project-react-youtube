import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Header from '../common/header/Header';
import './App.scss';
import Youtube from './youtube/Youtube';
import YoutubePlayer from './youtube/player/Youtube.Player';
import { appConfig } from '../config';

const config = appConfig;
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

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Header config={config} onChanges={onChanges} setTitle={setTitle}/>
          <Switch>
            <Route exact path="/" render={() => (<Redirect to="/youtube"/>)}/>
            <Route exact path="/youtube" render={()=><Youtube
              config={config} onChanges={onChanges} setTitle={setTitle}/>}/>
            <Route exact path="/youtube/:videoId" component={YoutubePlayer}/>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
