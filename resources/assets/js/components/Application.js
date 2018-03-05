import React, {Component} from 'react';
// import {Router, Route} from 'react-router';

import ReactDOM from 'react-dom';
import {BrowserRouter, Route, NavLink} from 'react-router-dom'
import Lines from 'react-preloaders/Preloaders/Lines';

import MainPage from './Pages/MainPage'
<<<<<<< HEAD
import ArticlePage from './Pages/ArticlePage'
import LoginPage from './Pages/LoginPage'
=======
import AuthPage from './Pages/AuthPage'
import ArticlePage from './Pages/ArticlePage'
>>>>>>> d322e0707874bfc429dd85045c4213ef36654981
import MagazinePage from './Pages/MagazinePage'

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
<<<<<<< HEAD
                        <Route path="/article" component={ArticlePage}/>
                        <Route path="/login" component={LoginPage}/>
=======
                        <Route path="/auth" component={AuthPage}/>
                        <Route path="/article" component={ArticlePage}/>
>>>>>>> d322e0707874bfc429dd85045c4213ef36654981
                        <Route path="/magazine" component={MagazinePage}/>
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}