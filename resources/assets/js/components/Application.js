import React, {Component} from 'react';
// import {Router, Route} from 'react-router';

import {BrowserRouter, Route, NavLink} from 'react-router-dom'
import Lines from 'react-preloaders/Preloaders/Lines';

import MainPage from './Pages/MainPage'
import AuthPage from './Pages/AuthPage'
import BundlePage from './Pages/BundlePage'
import IssuePage from './Pages/IssuePage'
import ArticlePage from './Pages/ArticlePage'
import JournalPage from './Pages/JournalPage'
import TagPage from './Pages/TagPage'
import * as SUtils from "./Helpers/SUtils";

import Waiter from './Helpers/Waiter2';

export default class Application extends Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <div className="container">
                <BrowserRouter>
                    <div>
                        <Route exact path="/" component={MainPage}/>
                        <Route path="/auth" component={AuthPage}/>
                        <Route path="/bundle/:id" component={BundlePage}/>
                        <Route path="/issue/:id" component={IssuePage}/>
                        <Route path="/article/:id" component={ArticlePage}/>
                        <Route path="/journal/:id" component={JournalPage}/>
                        <Route path="/tag/:id" component={TagPage}/>
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}