import React from 'react';
import Header from "../components/Header";
import AlbumList from "../components/Contents/AlbumList";
import Content from "../components/Content";
import {Router,Route,Switch} from 'react-router-dom';
import { createHashHistory } from "history";
const history = createHashHistory();


class RouterConfig extends React.Component{
    render(){
        return(
            <Router history={history}>
                <Switch>
                    <Route path='/'
                           render={() =>
                               <Header>
                                   <Route path='/Content' component={Content}/>
                                   <Route path='/AlbumList' component={AlbumList}/>
                               </Header>
                           }/>

                </Switch>
            </Router>
        )
    }
}
export default RouterConfig;

