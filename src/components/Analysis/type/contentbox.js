import React from "react";
import { Select,Button,Table,Progress,Pagination} from 'antd';
import Http from "axios"; //导入axios


class Type1 extends React.Component{

    constructor(props) {
        super(props);
        const { Option } = Select;
        this.state = {
            type:props.type,
            name:"装备",
            options:[],
            times:[],
            items:[],
            lines:[],
            data:[],
            loading: false,
            current:1
        }
    }
    componentWillReceiveProps(props){
        this.setState({
            type: props.type
        })
    }
    componentDidMount(){
        Http({
            url:"list.json",
            method:"GET"

        }).then(response=>{
            this.setState({options:response.data.heros})
            this.setState({times:response.data.time})

        }).catch(error=>{
            console.log(error)
        });
        Http({
            url:"list.json",
            method:"GET"

        }).then(response=>{
            this.setState({items:response.data.items})


        }).catch(error=>{
            console.log(error)
        });

        Http({
            url:"list.json",
            method:"GET"

        }).then(response=>{
            this.setState({lines:response.data.line})

        }).catch(error=>{
            console.log(error)
        });
    }
    SearchIt =() =>{
        this.setState({loading:true});
        Http({
            url:"list.json",
            method:"GET"

        }).then(response=>{
            this.setState({loading:false});
            this.setState({data:response.data.data})
        }).catch(error=>{
            this.setState({loading:false});
            console.log(error)
        });
    };
    changePage = page  =>{
        this.setState({current:page});
    };
    render() {
        let Heros =[];
        let Items = [];
        let Times = [];
        let name = "";
        if(this.state.type==="winrate"){
            name="装备";
            this.state.items.forEach((item,index)=>{
                Items.push(<Select.Option key={index} value={item.name}>{item.name}</Select.Option>);
            });
        }
        else if(this.state.type==="line"){
            name="分路";
            this.state.lines.forEach((item,index)=>{
                Items.push(<Select.Option key={index} value={item.name}>{item.name}</Select.Option>);
            });
        }
        this.state.options.forEach((item,index)=>{
            Heros.push(<Select.Option key={index} value={item.name}>{item.name}</Select.Option>);
        });
        this.state.times.forEach((item,index)=>{
            Times.push(<Select.Option key={index}  value={item}>{item}</Select.Option>);
        });


        const columns = [
            {
                title: '角色',
                dataIndex: 'hero',
            },
            {
                title: '时间',
                dataIndex: 'time',
            },
            {
                title: '道具',
                dataIndex: 'item',
            },
            {
                title: '胜率',
                dataIndex: 'winrate',
                render :winrate=>(

                    <div >
                         <Progress
                             strokeColor={{
                                 '0%': '#108ee9',
                                 '100%': '#87d068',
                             }}
                             percent={winrate}
                         />
                    </div>


                )
            },
        ];



        return <div>
            <div>
                <Select
                    showSearch
                    style={{ width: 200 }}
                    placeholder="选择角色"
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }>
                    {Heros}
                </Select>
                <Select
                    showSearch
                    style={{ width: 200 }}
                    placeholder={name}
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                >
                    {Items}
                </Select>
                <Select
                    style={{ width: 200 }}
                    placeholder="选择时间"
                >
                    {Times}
                </Select>
                <Button icon="search"
                        loading={this.state.loading}
                        onClick={this.SearchIt}/>
            </div>
            <Table columns={columns} dataSource={this.state.data} size="middle" />
            {/*<Pagination current={this.state.current} onChange={this.changePage} total={50} />*/}

        </div>

    }
}

class Type2 extends React.Component {
    constructor() {
        super();
        const {Option} = Select;
        this.state = {
            name: "场景",
            others:[],
            loading: false,
            data:[],
            Data:[],
            scenario:''
        }
    };
    componentDidMount() {
        Http({
            url:"list.json",
            method:"GET"

        }).then(response=>{
            this.setState({others:response.data.others});
        })
    };
    AVG  = arr =>{
        let sum = 0;
        arr.forEach((item,index)=>{
                sum+=item.wins/item.games
        });
        let num = (sum/(arr.length)*100).toFixed(2)
        return num;
    };
    onChange = value =>{
        this.setState({scenario:value})
    };
    SearchIt = () => {
        this.setState({loading:true});
        Http({
            url:"https://api.opendota.com/api/scenarios/misc",
            method:"GET",
            params:{
                scenario:this.state.scenario
            }
        }).then(response=>{
            this.state.others.forEach(item=>{
                let details = [];
                response.data.forEach(item2=>{
                    if(item2.scenario === item.scenario){
                        details.push(item2)
                    }
                });
                item.details = details
            });
            this.setState({data:this.state.others.filter(item=>{return item.details.length>0})});
            this.setState({loading:false})
        }).catch(error=>{
            console.log(error)
        })
    };

    render() {
        let Others = [];
        this.state.others.forEach((item,index)=>{
            Others.push(<Select.Option key={index} value={item.scenario}>{item.name}</Select.Option>)
        });
        const columns = [
            {
                title: '场景',
                dataIndex: 'name',
            },
            {
                title: '胜率',
                dataIndex: 'details',
                render :details=>(
                    <div >
                        <Progress
                            strokeColor={{
                                '0%': '#108ee9',
                                '100%': '#87d068',
                            }}
                            percent={this.AVG(details)}
                        />
                    </div>
                )
            },
        ];


        return <div>
            <div>
                <Select
                    showSearch
                    style={{width: 300}}
                    placeholder="选择场景"
                    optionFilterProp="children"
                    onChange={this.onChange}
                    filterOption={(input, option) =>
                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }>
                    {Others}
                </Select>
                <Button icon="search"
                        loading={this.state.loading}
                        onClick={this.SearchIt}/>

            </div>
            <Table
                pagination={{position:"top"}}
                columns={columns}
                dataSource={this.state.data}
                size="middle" />
        </div>
    }
}



function Selector(props){
    const type = props.type;
    if(type==="winrate"||type==="line"){
        return <Type1 type = {type}/>
    }
    else
        return <Type2/>
}


export default Selector;
