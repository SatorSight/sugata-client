import React, {Component} from 'react';
import {BrowserRouter, Route} from 'react-router-dom'

import MainPage from './Pages/MainPage'
import AuthPage from './Pages/AuthPage'
import BundlePage from './Pages/BundlePage'
import IssuePage from './Pages/IssuePage'
import ArticlePage from './Pages/ArticlePage'
import JournalPage from './Pages/JournalPage'
import TagPage from './Pages/TagPage'
import AllIssuesJournal from './Pages/AllIssuesJournalPage'
import AllIssuesBundle from './Pages/AllIssuesBundlePage'

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
                        <Route path="/all_issues/journal/:id" component={AllIssuesJournal}/>
                        <Route path="/all_issues/bundle/:id" component={AllIssuesBundle}/>
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}