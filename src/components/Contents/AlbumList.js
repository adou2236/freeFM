import React from "react";
import Http from 'axios';
import { Pagination, List, Spin} from 'antd';
import { PlayCircleOutlined ,PauseCircleOutlined } from '@ant-design/icons';
import store from '../../store/index'
import mutation from "../../store/mutation";

require('./AlbumList.css')


class AlbumList extends React.Component{
    state ={
        playingAlbum:store.getState().playingAlbum,
        albumList : [],
        total:0,
        current:1,
        showingList :[],
        loading:false,
        showsroll:{},
        theme:store.getState().theme
    };
    constructor() {
        super();
        this.handleStoreChange = this.handleStoreChange.bind(this);
        // 注册监听store，store变化后调用组件的handleStoreChange方法更新组件的state
        store.subscribe(this.handleStoreChange);
    }
    handleStoreChange() {
        this.setState({theme:store.getState().theme})
    }
    showList(albumList,page){
        var showingList = albumList.slice((page-1)*10,page*10).toString()
        Http({
            url:"https://api.imjad.cn/qqfm/v1/?type=skip_show&id=rd003q4BfU3HYZaO&shows=",
            method:"GET",
            params:{
                type: 'skip_show',
                id: "rd003v8thW1HWSae",
                shows:showingList
            }
        }).then(response=>{
            this.setState({showingList:Object.values(response.data.data.showList)});
            this.setState({loading:false})
        }).catch(error=>{
            console.log(error)
        })
    }
    playIt=(e)=>{
        console.log(e)
        mutation.changeCurrentMusic(e)
    };
    changePage=(e)=>{
        this.setState({loading:true})
        this.setState({current:e});
        this.showList(this.state.albumList,e)
    };
    mouseOver =()=>{
        this.setState({
            showsroll:{overflow:"auto"}
        })

    };
    mouseOut =()=>{
        this.setState({
            showsroll:{overflow:"hidden"}
        })

    };
    componentDidMount() {
        console.log(store.getState())
        Http({
            url:"https://api.imjad.cn/qqfm/v1/",
            method:"GET",
            params:{
                type:"show",
                id:this.state.playingAlbum.albumID
            }
        }).then(response=>{
            console.log(response);
            this.setState({albumList:response.data});
            this.showList(this.state.albumList,1)
            this.setState({total:response.data.length})
        }).catch(error=>{
            console.log(error)
        })
    }

    render() {
        // console.log("aaa",this.state.showingList)
        // var Ali = []
        // this.state.showingList.forEach((item,index)=>{
        //     Ali.push(
        //         <li>
        //             <div>{item.show.name}</div>
        //         </li>
        //     )
        // })



        return (
            <div  onMouseOver={this.mouseOver}
                  onMouseOut={this.mouseOut}
                  style={this.state.showsroll}
                  className={"mainBox"}>
                <div>
                    <div  className={"coverArea"}>
                        <div className={"contentBox"}>
                            <img className={'ImgCla'}  src={this.state.playingAlbum.cover}/>
                            <div  className={"description"}>
                                <div style={{fontSize:20}}>{this.state.playingAlbum.name}</div>
                                <div style={{fontSize:15}}>共{this.state.playingAlbum.showNum}集</div>
                                {this.state.playingAlbum.desc}
                            </div>
                        </div>
                        <div style={{backgroundImage:'url('+ this.state.playingAlbum.cover+')'||''}}  className={"Rgalss"}> </div>
                        <span className="blur-mask"></span>
                    </div>
                    <Spin spinning={this.state.loading}>
                        <div className={"listArea"}>
                            <List
                                style={{ cursor: 'pointer'}}
                                itemLayout="vertical"
                                size="large"
                                bordered
                                dataSource={this.state.showingList}
                                renderItem={item =>
                                    <List.Item
                                    onClick={()=>this.playIt(item.show)}
                                    extra={
                                        item.show.showID===store.getState().currentMusic.showID?<PauseCircleOutlined style={{fontSize:50}}/>:<PlayCircleOutlined style={{fontSize:50}}/>
                                    }>
                                        <List.Item.Meta
                                            // avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                            title={item.show.name}
                                            description={"播放量:"+item.show.playNum+"时长:"+item.show.duration}
                                        />
                                    </List.Item>
                                }

                            />
                            <Pagination
                                style={{textAlign:"center"}}
                                onChange={this.changePage}
                                current={this.state.current}
                                pageSize={10}
                                total={this.state.total} />

                    </div>
                </Spin>

                </div>
            </div>
        )
    }
}
export default AlbumList
