import React, {PureComponent} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom'

import DataLoader from '../components/Helpers/DataLoader';

import MainPage from './Pages/IndexPage'
import AuthPage from './Pages/AuthPage'
import TagPage from './Pages/TagPage'
import BundlePage from './Pages/BundlePage'
import IssuePage from './Pages/IssuePage'
import ArticlePage from './Pages/ArticlePage'
import JournalPage from './Pages/JournalPage'
import AllIssuesJournal from './Pages/AllIssuesJournalPage'
import AllIssuesBundle from './Pages/AllIssuesBundlePage'
import JustSubscribedDialog from './Components/JustSubscribedDialog'

import NotFound404 from './Components/NotFound404'
import Waiter from './Helpers/Waiter';

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
                        <Route path="/*" component={JustSubscribedDialog}/>
                        <Route path="/*" component={DataLoader}/>
                        <Switch>
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
                            <Route path="/tag/:id" component={TagPage}/>
                            {/*<Route path="/test" exact component={TestComponent}/>*/}

                            <Route path="*" component={NotFound404}/>
                        </Switch>

                    </div>
                </BrowserRouter>
            </div>
        );
    }
}