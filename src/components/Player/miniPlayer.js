import React from "react";
import store from "../../store/index";
import { Slider,Row,Col} from 'antd';
import { PlayCircleOutlined ,PauseCircleOutlined } from '@ant-design/icons';
import TimeFormatter from "../Tools/TimeFormatter";

require("./miniPlayer.css");

class miniPlayer extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            currentTime:0,
            currentMusic : store.getState().currentMusic,
            paused: false
        }
        // 注意需要绑定 this
        this.handleStoreChange = this.handleStoreChange.bind(this);
        // 注册监听store，store变化后调用组件的handleStoreChange方法更新组件的state
        store.subscribe(this.handleStoreChange);

    }
    componentDidMount() {
    }

    handleStoreChange() {
        this.setState({currentMusic:store.getState().currentMusic})
    }
    changePosition=(e)=>{//该变位置触发，得到改变前的值
        console.log(e)
        this.setState({currentTime:e})
    };
    onAfterChange=(e)=>{//松开鼠标触发，得到改变后的值
        console.log("SSSSS",e)
        this.setState({currentTime:e})
        this.audio.currentTime=e
    }
    syncTime=(e)=>{
        this.setState({currentTime:this.audio.currentTime})
        console.log(this.audio.currentTime)
    }

    startPlay=()=>{
        this.audio.play();
        this.setState({paused:false})

    };
    stopPlay=()=>{
        this.audio.pause();
        this.setState({paused:true})
    };


    render() {
        var operation = {};
        if(this.state.paused){
            operation = <PlayCircleOutlined style={{fontSize:30,margin:'auto'}} onClick={this.startPlay}/>

        }
        else {
            operation=<PauseCircleOutlined style={{fontSize:30,margin:'auto'}} onClick={this.stopPlay}/>
        }
        return(
            <div className={"playerBox"}>
                <div className={"innerBox"}>
                    <div className={"miniCover"} style={{backgroundImage:'url('+ this.state.currentMusic.cover.urls[0].url +')'||''}}>
                        {operation}
                    </div>
                    {/*<img className={"cover"} src={this.state.cover.urls[0].url}/>*/}

                    <div className={"tools"}>
                        {this.state.currentMusic.name}
                        <Row >
                            <Col span={15}>
                                <Slider max={this.state.currentMusic.duration}
                                        value={this.state.currentTime}
                                        min={0}
                                        tipFormatter={null}
                                        onChange={this.changePosition}
                                        onAfterChange={this.onAfterChange} />

                            </Col>
                            <Col span={4}>
                                {TimeFormatter.formatTime(this.state.currentTime)}/{TimeFormatter.formatTime(this.state.currentMusic.duration)}
                            </Col>

                        </Row>

                    </div>
                    <audio
                        key="audio"
                        autoPlay
                        ref={(node) =>{
                            this.audio=node
                        }}
                        onTimeUpdate={this.syncTime}
                        src={this.state.currentMusic.audioURL.urls[0].url}>
                    </audio>
                </div>



            </div>
        )
    }
}
export default miniPlayer
