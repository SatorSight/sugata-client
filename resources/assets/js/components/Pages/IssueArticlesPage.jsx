import React, { Component } from "react";
import IssueArticlesHeader from './IssueArticlesPage/IssueArticlesHeader';
import IssuesTheme from "../Components/IssuesTheme";
import MainTabs from './../Components/MainTabs';
import OtherIssues from './../Components/OtherIssues';
import NextIssueArticle from "../Components/NextIssueArticle";
import * as SUtils from './../Helpers/SUtils';
import * as ResourceRoutes from "../Helpers/ResourceRoutes";
import Lines from 'react-preloaders/Preloaders/Lines';

const styles = {
    item: {
        width: '100%',
        backgroundColor: '#000',
        position: 'relative',
        overflow: 'hidden',
        maxWidth: '720px',
        margin: '0 auto',
    },
};
class IssueArticlesPage extends Component {

    constructor(props){
        super(props);

        this.state = {
            data: {},
            _this: this,
            loading: true
        }
    }

    load = resource => SUtils.updateStateWithApiRequestFor(resource, this.state._this);

    componentWillMount(){
        this.setState({loading: true}, () => {
            const promises = ResourceRoutes.ISSUE_RESOURCES.map(resource => this.load(resource));
            Promise.all(promises).then(() => {
                this.setState({loading: false});
            });
        });
    }

    render() {

        console.log(this.props);
        return (
            <div style={styles.item}>
                {this.state.loading
                    ? <Lines
                        color={'#f7f7f7'}
                        bgColor={'#222'}
                        time={1400}/>
                    : null}
                <IssueArticlesHeader data={this.state.data} id={this.props.match.params.id}/>

                <NextIssueArticle data={this.state.data}/>
            </div>
        );
    }
}

export default IssueArticlesPage;