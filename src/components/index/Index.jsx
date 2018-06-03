import React from 'react';
import Audio from '../audio/Audio.jsx';
import List from '../list/List.jsx';

class Index extends React.Component {
	constructor(props){
	  super(props);
	  this.state = {
		// 播放列表
		list: this.props.list,
		// 歌曲信息
		songMessage: {},
		try: {}
	  };
	  this.clickList = this.clickList.bind(this);
	  this.cutSong = this.cutSong.bind(this);
	}

	clickList(message){
	  this.setState({songMessage: message});
	  this.props.onplaySong({
	  	name: message.name,
	  	author: message.author
	  });
	}

	cutSong(audio){
		this.props.oncheckSong(audio);
	}

	render(){
		return (
			<div>
				<List list={ this.state.list } onplaySong={ this.clickList }></List>
				<Audio message={ this.state.songMessage } oncutSong={ this.cutSong }></Audio>
			</div>
		)
	}
}

export default Index;