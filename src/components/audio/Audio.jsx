import React from 'react';
import styled, { keyframes } from 'styled-components';

// audio组件最外层容器
const AudioContent = styled.div`
	position: fixed;
	width: 100%;
	bottom: 0;
	left: 0;
`;

// audio控制宽度的容器
const AudioDiv = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin: 0 auto;
	padding: 0 10px;
	max-width: 1150px;
	height: 50px;
	line-height: 50px;
	background: #fbfbfd;
	cursor: pointer;
`;

// audio组件左侧侧部分容器
const LeftDiv = styled.div`
	display: flex;
	justify-content: flex-start;
	align-items: center;
	line-height: normal;
	font-size: 14px;
	color: #31c27c;
`;

// poster容器
const change = keyframes`
	0%{
		transform:rotate(0deg);
	}
　　50%{
		transform:rotate(180deg);
	}
　　100%{
		transform:rotate(360deg);
	}
`;

const ImageDiv = styled.div`
	display: inline-block;
	width: 45px;
	height: 45px;
	margin-right: 10px;
	border-radius: 50%;
	background-size: cover;
	background-position: center;
	background-image: url(${ props => (props.poster === undefined) ? require("../../image/music.png") : props.poster });
	opacity: 1;
	animation: ${ change } 10s linear infinite;
	animation-fill-mode: forwards;
	animation-play-state: ${ props => props.isrock ? "running" : "paused" }
`;

// 控制图标容器
const ControlDiv= styled.div`
	width: 20px;
	height: 20px;
	padding: 5px;
	border-radius: 50%;
	border: 2px solid #c9c9c9;
	text-align: center;
	line-height: 20px;
	cursor: pointer;
	.iconfont{
		font-size: 18px;
		color: #c9c9c9;
	}
	&:hover{
		border-color: #31c27c;
		.iconfont{
			color: #31c27c;
		}
	}
`;

// audio标签组件
const AudioContainer = styled.div`
	display: none;
`

class Audio extends React.Component {
	constructor(props){
	  super(props);
	  this.state = {
	  	// 是否正在播放
	    isplay: false
	  };
	  this.contorlsChange = this.contorlsChange.bind(this);
	  this.gotoPlay = this.gotoPlay.bind(this);
	}

	// 播放或者暂停
	contorlsChange(e){
		e.stopPropagation();
		// 保证audio标签已被创建
		if(this.refs.audioItem){
			if(this.state.isplay){
				this.refs.audioItem.pause();
			}else{
				this.refs.audioItem.play();
			}
			this.setState({isplay: !this.state.isplay});
		}
	}

	// 跳转
	gotoPlay(){
		if(this.refs.audioItem){
			this.props.ongotoPlay();
		}
	}

	shouldComponentUpdate(nextProps){
		// 判断props.message是否更新
		if(this.props.message.music !== nextProps.message.music){
			this.setState({isplay: true});
		}
		return true
	}

	render(){
		// 切换暂停/播放图标
		let control;
		if( !this.state.isplay ){
			// 没有在播放
			control = <span className="iconfont icon-play"></span>
		}else{
			control = <span className="iconfont icon-zanting"></span>
		}

		// 是否创建audio标签
		let audioShow;
		if( this.props.message.name !== undefined ){
			// 为audio生成key，当播放歌曲切换时生成新的audio标签
			audioShow = (
				<AudioContainer>
					<audio controls="true" autoPlay="true" key={ this.props.message.name } ref="audioItem">
						<source src={ this.props.message.music + ".mp3" } type="audio/mpeg"/>
						<source src={ this.props.message.music + ".ogg" } type="audio/ogg"/>
					</audio>
				</AudioContainer>
			)
		}
		
		return (
			<AudioContent>
				<AudioDiv onClick={ this.gotoPlay }>
					<LeftDiv>
						<ImageDiv poster={ this.props.message.poster } isrock={ this.state.isplay }></ImageDiv>
						<div>
							{ this.props.message.name } - { this.props.message.author }
						</div>
					</LeftDiv>
						
					{ audioShow }

					<ControlDiv onClick={ this.contorlsChange }>
						{ control }
					</ControlDiv>
				</AudioDiv>
			</AudioContent>
		)
	}
}

export default Audio;