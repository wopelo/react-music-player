import React from 'react';
import styled, { injectGlobal } from 'styled-components';

const ContentDiv = styled.div.attrs({
  isplay: props => props.isplay
})`
	display: flex;
	justify-content: space-between;
	padding: 0 10px;
	height: 50px;
	line-height: 50px;
	background-color: ${props => (props.index % 2 !== 0) ? '#fbfbfd' : 'white'};
	cursor: pointer;
	&:hover{
		background-color: #31c27c;
		color: white;
		div{
			color: white;
		}
	}
`;

// 时间长度专用样式
const LengthDiv = styled.div`
	color: #999;
`;

// 正在播放专用样式
injectGlobal`
	.clickList{
		background: #31FF9c;
		color: white;
		div{
			color: white;
		}
	}
`

class List extends React.Component {
	constructor(props){
	  super(props);
	  this.state = {
	  	// 播放列表
	    list: this.props.list,
	    // 当前播放歌曲
	    nowPlay: "",
	    // 对应每一个ContentDiv，如果点击则设为clickList
	    clickClass: new Array(this.props.list.length)
	  };
	  this.playSong = this.playSong.bind(this);
	}

	playSong(message, index, e){
		// 检查这首歌是否正在播放
		if(this.state.nowPlay !== message.name){
			let arr = new Array(this.state.list.length);
			arr[index] = "clickList";
			// 调用父组件方法
			this.props.onplaySong(message);
			this.setState({
				nowPlay: message.name,
				clickClass: arr
			});
		}
	}

	render(){
		const listItem = this.state.list.map((item, index) => {
			// 储存该首歌曲的相关信息
			let message = {};
			for(let n in item){
				message[n] = item[n];
			}
			return (
				<ContentDiv className={ this.state.clickClass[index] } key={ item.name } index={ index } onClick={ this.playSong.bind(this, message, index)}>
					<div>
						{ item.name } - { item.author }
					</div>
					<LengthDiv>
						{ item.length }
					</LengthDiv>
				</ContentDiv>
			);
		});

		return (
			<div>
				{ listItem }
			</div>
		)
	}
}

export default List;