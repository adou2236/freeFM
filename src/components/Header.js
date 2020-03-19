import React from "react";
import {
    BrowserRouter as Router,
    Route,
    Link,
} from 'react-router-dom'
import Http from "axios"
import {Menu, Icon,Button,Switch   } from 'antd';
import MiniPlayer from "./Player/miniPlayer"
import mutation from "../store/mutation";
import store from "../store/index";
require('./Header.css');
const { SubMenu } = Menu;



class Header extends React.Component {
    constructor() {
        super();
        this.handleStoreChange = this.handleStoreChange.bind(this);
        // 注册监听store，store变化后调用组件的handleStoreChange方法更新组件的state
        store.subscribe(this.handleStoreChange);
    }
    handleStoreChange() {
        this.setState({theme:store.getState().theme})
    }
    state = {
        theme: store.getState().theme,
        current: 'team',
        collapsed:false,
        mainType:[],
        albumId:'',
        showsroll:{},
        pageName:"Content"
    };
    componentDidMount() {
        Http({
            url:"albumType.json",
            method:"GET",
            dataType: 'jsonp',
            crossDomain: true,
        }).then(response=>{
            this.setState({mainType:response.data.mainType})
        }).catch(error=>{
            console.log(error)
        })

    }

    handleClick = e => {
        console.log('click ', e);
        this.setState({
            current: e.key,
        });
    };
    toggleCollapsed = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        })
    };
    mouseOver =()=>{
        this.setState({
            showsroll:{overflow:'auto'}
        })

    };
    mouseOut =()=>{
        this.setState({
            showsroll:{overflow:'hidden'}
        })

    };


    submitalbum=(e)=>{
        mutation.changeAlbum(e)
    };

    nightMod = (checked) =>{
        if(checked){
            mutation.changeTheme("dark")
        }
        else{
            mutation.changeTheme("light")
        }
    };

    render() {
        // if(this.state.pageName==='AlbumList'){
        //     return <Redirect to='/AlbumList'/>
        // }
        // else
        //     return <Redirect to='/Content'/>;


        let OMenu = [];
        this.state.mainType.forEach((item,index)=>{
            let IMenu = [];
            item.detailType.forEach((item2,index2)=>{
                IMenu.push(<Menu.Item
                    key={item2.index}
                    value={item2.name}>
                    <Link onClick={()=>this.submitalbum(item2.index)} to={{pathname:"/Content"}} replace>{item2.name}</Link>

                </Menu.Item>)
            });
            OMenu.push(
                <SubMenu
                    key={item.id}
                    title={
                    <span>
                        <span>{item.name}</span>
                    </span>}>
                    {IMenu}
                </SubMenu>)
        });
        return (
            <div className={"mainBox"}>
                {/*<div className={"headBar"}>*/}
                {/*    <Switch   onChange={this.nightMod} />*/}
                {/*</div>*/}
                <div  className={"box"}>
                    <div onMouseOver={this.mouseOver} onMouseOut={this.mouseOut} style={this.state.showsroll} className={"sideBar"}>
                        <Menu
                            defaultOpenKeys={['1']}
                            defaultSelectedKeys={['39104']}

                            mode="inline"
                            theme={this.state.theme}
                            inlineCollapsed={this.state.collapsed}>
                            {OMenu}
                        </Menu>
                    </div>
                    {this.props.children}
                </div>
                <div className={"miniPlayer"}>
                    <MiniPlayer />
                </div>
            </div>

        );
    }
}


export default Header
