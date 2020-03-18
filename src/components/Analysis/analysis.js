import React from "react";
import Selector from "./type/contentbox"
import { Menu, Icon } from 'antd';


class Analysis extends React.Component{
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.state = {key:'winrate'}
    }

    handleClick = e => {
        this.setState({
            key: e.key,
        });
    };
    render() {
        const key  = this.state.key;
        return(
            <div>
                <Menu
                    style={{textAlign:'center',backgroundColor:'#001529',color:'white'}}
                    selectedKeys={key}
                    onClick={this.handleClick}
                    mode="horizontal"
                    theme="light">
                    <Menu.Item key="winrate">
                        <Icon type="appstore" />
                       合成道具时间
                    </Menu.Item>
                    <Menu.Item key="line">
                        <Icon type="mail" />
                        英雄分路
                    </Menu.Item>
                    <Menu.Item key="other">
                        <Icon type="appstore" />
                        其他
                    </Menu.Item>
                </Menu>

                <Selector type={this.state.key} />
            </div>
        )
    }
}
export default Analysis
