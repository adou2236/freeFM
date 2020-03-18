import React from "react";
import Http from "axios"
import {Menu, Pagination, Spin} from 'antd'
import {Link} from "react-router-dom";
import store from "../store/index";
import mutation from "../store/mutation";
require('./Content.css')

class Content extends React.Component{
    constructor(props) {
        super(props);
        this.state ={
            loading:true,
            albumId:store.getState().albumId,
            currentPage:1,
            total:0,
            details:[],
            showsroll:{}

        }
        this.handleStoreChange = this.handleStoreChange.bind(this);
        // 注册监听store，store变化后调用组件的handleStoreChange方法更新组件的state
        store.subscribe(this.handleStoreChange);
    }
    handleStoreChange() {
        this.setState({albumId:store.getState().albumId})
        this.searchalbumList(store.getState().albumId,1)

    }

    changePage =(e)=>{
        this.setState({loading:true})
        this.setState({currentPage:e});
        this.searchalbumList(localStorage.getItem("albumId"),e)
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
    searchalbumList(id,currentPage){
        console.log("id",id)
        Http({
            url:"https://api.imjad.cn/qqfm/v1/",
            method:"GET",
            params:{
                type:"album",
                id: id,
                page:currentPage,
                page_size:20
            }
        }).then(response=>{
            this.setState({loading:false});
            this.setState({total:response.data.data.total, details:response.data.data.albumInfoList})
        }).catch(error=>{
            console.log(error)
        })

    }
    // componentWillReceiveProps(props) {
    //     this.setState({albumId:store.getState().albumId})
    //     this.searchalbumList(this.state.albumId,1)
    //     console.log(props)
    // }
    componentDidMount() {
        this.setState({albumId:store.getState().albumId})
        this.searchalbumList(localStorage.getItem("albumId"),1)
    }
    submitalbum=(e)=>{
        const playingAlbum = {}
        playingAlbum.albumID = e.albumID;
        playingAlbum.name = e.name;
        playingAlbum.showNum = e.showNum;
        playingAlbum.desc = e.desc;
        playingAlbum.cover = e.cover.urls[0].url;
        mutation.changePlayingAlbum(playingAlbum)
    }

    render() {
        let List = []
        this.state.details.forEach((item,index)=>{
            List.push(<li
            key={index}>
                <Link to={{pathname:"/AlbumList"}} onClick={()=>this.submitalbum(item.album)}>
                    <div className={"albumBox"} >
                        <img src={item.album.cover.urls[0].url} className={"cover"} alt={"封面不存在"}/>
                        <div className={"text title"}>{item.album.name}</div>
                        <div className={"text"}>{item.album.displayText}</div>
                    </div>
                </Link>

            </li>)


        });
       return(

           <div  onMouseOver={this.mouseOver}
                 onMouseOut={this.mouseOut} style={this.state.showsroll} className={"dark"}>
               <div className={"breadToast"}>共{this.state.total}个专辑</div>

               <Spin
                   spinning={this.state.loading}
                   size="large"
                   tip="加载中...">
                   <div className={"albumList"}>
                       <ul>
                           {List}
                       </ul>
                   </div>
               </Spin>
               <Pagination className={"pagination"}
                           pageSize={20} current={this.state.currentPage}
                           onChange={this.changePage} total={this.state.total} />
           </div>
       )
   }



}

export default Content
