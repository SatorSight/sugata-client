import React, {PureComponent} from 'react';
import {BrowserRouter, Route} from 'react-router-dom'

import DataLoader from '../components/Helpers/DataLoader';

import MainPage from './Pages/IndexPage'
import AuthPage from './Pages/AuthPage'
import BundlePage from './Pages/BundlePage'
import IssuePage from './Pages/IssuePage'
import ArticlePage from './Pages/ArticlePage'
import JournalPage from './Pages/JournalPage'
// import TagPage from './Pages/TagPage'
import AllIssuesJournal from './Pages/AllIssuesJournalPage'
import AllIssuesBundle from './Pages/AllIssuesBundlePage'

import Waiter from '../components/Helpers/Waiter2';


export default class Application extends PureComponent {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <div className="container">
                <Waiter/>
                <BrowserRouter>
                    <div>
                        <Route path="/*" component={DataLoader}/>
                        <Route exact path="/" component={MainPage}/>
                        <Route path="/auth" component={AuthPage}/>
                        <Route path="/bundle/:id" component={BundlePage}/>
                        <Route path="/issue/:id" component={IssuePage}/>
                        <Route path="/article/:id" component={ArticlePage}/>
                        <Route path="/journal/:id" component={JournalPage}/>
                        {/*<Route path="/tag/:id" component={TagPage}/>*/}
                        <Route exact path="/all_issues" component={AllIssuesJournal}/>
                        <Route path="/all_issues_journal/:id" component={AllIssuesJournal}/>
                        <Route path="/all_issues_bundle/:id" component={AllIssuesBundle}/>
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}