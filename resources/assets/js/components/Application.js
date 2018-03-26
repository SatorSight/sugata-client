import React, {Component} from 'react';
// import {Router, Route} from 'react-router';

import {BrowserRouter, Route, NavLink} from 'react-router-dom'
import Lines from 'react-preloaders/Preloaders/Lines';

import MainPage from './Pages/MainPage'
import AuthPage from './Pages/AuthPage'
import BundlePage from './Pages/BundlePage'
import IssuePage from './Pages/IssuePage'
import JournalPage from './Pages/JournalPage'
// import IssueArticlesPage from './Pages/IssueArticlesPage'
import TagPage from './Pages/TagPage'
import * as SUtils from "./Helpers/SUtils";

export default class Application extends Component {

    constructor(props){
        super(props);

        this.state = {
            authorized: false
        }
    }

    componentWillMount(){
        SUtils.loadAuthorizationToState(this);
    }

    render() {
        return (
            <div className="container">
                <Lines
                    color={'#f7f7f7'}
                    bgColor={'#222'}
                    time={1400}/>
                <BrowserRouter>
                    <div>
                        <Route exact path="/" component={MainPage}/>
                        <Route path="/auth" component={AuthPage}/>
                        <Route path="/bundle/:id" component={BundlePage}/>
                        <Route path="/issue/:id" component={IssuePage}/>
                        <Route path="/journal/:id" component={JournalPage}/>
                        {/*<Route path="/issue_articles/:id" component={IssueArticlesPage}/>*/}
                        <Route path="/tag/:id" component={TagPage}/>
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}