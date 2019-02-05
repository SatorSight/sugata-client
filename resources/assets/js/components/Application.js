import React, {PureComponent} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom'

import DataLoader from '../components/Helpers/DataLoader';

import MainPage from './Pages/IndexPage'
import AuthPage from './Pages/AuthPage'
import TagPage from './Pages/TagPage'
import BundlePage from './Pages/BundlePage'
import PayPage from './Pages/PayPage'
import IssuePage from './Pages/IssuePage'
import ArticlePage from './Pages/ArticlePage'
import JournalPage from './Pages/JournalPage'
import AllIssuesJournal from './Pages/AllIssuesJournalPage'
import AllIssuesBundle from './Pages/AllIssuesBundlePage'
import TagSearchPage from './Pages/TagSearchPage'
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
                            {/*<Route path="/pay" component={PayPage}/>*/}
                            <Route path="/bundle/:id" component={BundlePage}/>
                            <Route path="/issue/:id" component={IssuePage}/>
                            <Route path="/article/:id" component={ArticlePage}/>
                            <Route path="/journal/:id" component={JournalPage}/>
                            <Route exact path="/all_issues" component={AllIssuesJournal}/>
                            <Route path="/all_issues_journal/:id" component={AllIssuesJournal}/>
                            <Route path="/all_issues_bundle/:id" component={AllIssuesBundle}/>
                            <Route path="/tag/:id" component={TagPage}/>
                            <Route path="/tag_search/" component={TagSearchPage}/>
                            <Route path="/pay/:bundle_id" component={PayPage}/>
                            {/*<Route path="/test" exact component={TestComponent}/>*/}

                            <Route path="*" component={NotFound404}/>
                        </Switch>

                    </div>
                </BrowserRouter>
            </div>
        );
    }
}