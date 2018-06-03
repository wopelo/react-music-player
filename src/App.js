import React, { Component } from 'react';
import { HashRouter, Route, Redirect, Switch } from 'react-router-dom';
import styled, { injectGlobal } from 'styled-components';
// import Index from './components/index/Index.jsx';
import Audio from './components/audio/Audio.jsx';
import List from './components/list/List.jsx';
import Play from './components/play/Play.jsx';
// 在子组件中不必再引入
import './font/iconfont.css';

// 模拟数据
import * as data from'./data/data.json';

// 设置样式
injectGlobal`
  .normal{
    text-decoration: none;
  }
  .active{
    display: none;
  }
`;

const AppDiv = styled.div`
  max-width: 1170px;
  margin: 0 auto;
  padding: 0 10px;
  color: #333;
`;

const TitleDiv = styled.div`
  height: 50px;
  line-height: 50px;
  background-color: #fbfbfd;
  padding: 0 10px;
  color: #999;
`;

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      // 播放列表
      list: data,
      //当前播放歌曲信息
      songMessage: {},
      // 是否跳转
      redirect: false
    };
    this.clickList = this.clickList.bind(this);
    this.gotoPlay = this.gotoPlay.bind(this);
  }

  // list组件播放新歌曲
  clickList(message){
    this.setState({
      songMessage: message
    });
  }

  // 切换到play界面
  gotoPlay(){
    if(!this.state.redirect){
      window.location.replace("#/play");
    }else{
      window.location.replace("#/index");
    }
    this.setState({
      redirect: !this.state.redirect
    });
  }

  render(){
    return (
      <AppDiv>
        <TitleDiv>
          React Music Player
        </TitleDiv>
        <HashRouter>
          <div>
              <Switch>
                <Route path="/index" exact>
                  <List list={ this.state.list } onplaySong={ this.clickList }></List>
                </Route>
                <Route path="/play" component={ Play }></Route>
                <Redirect to="/index"></Redirect>
              </Switch>
          </div>
        </HashRouter>
        <Audio message={ this.state.songMessage } ongotoPlay={ this.gotoPlay } redirect={ this.state.redirect }></Audio>
      </AppDiv>
    );
  }
}

export default App;
