import React, {Component} from 'react';
// import {Router, Route} from 'react-router';

import ReactDOM from 'react-dom';
import {BrowserRouter, Route, NavLink} from 'react-router-dom'
import Lines from 'react-preloaders/Preloaders/Lines';

import MainPage from './Pages/MainPage'
import BundlePage from './Pages/BundlePage'
import AuthPage from './Pages/AuthPage'
import JournalPage from './Pages/JournalPage'

export default class Application extends Component {
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
                        <Route path="/bundle" component={BundlePage}/>
                        <Route path="/auth" component={AuthPage}/>
                        <Route path="/journal" component={JournalPage}/>
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}