import React, { Component } from "react";
import IssueArticlesHeader from './IssueArticlesPage/IssueArticlesHeader';
import NextIssueArticle from "../Components/NextIssueArticle";
import * as SUtils from './../Helpers/SUtils';
import * as ResourceRoutes from "../Helpers/ResourceRoutes";
import Lines from 'react-preloaders/Preloaders/Lines';
import Waiter from '../Helpers/Waiter2';

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

    self_id = null;

    constructor(props){
        super(props);

        this.self_id = this.props.match.params.id;

        this.state = {
            data: {},
            loading: true
        }
    }

    componentDidMount(){
        SUtils.load(ResourceRoutes.ISSUE_RESOURCES, this);
    }
    componentWillReceiveProps(nextProps){
        SUtils.load(ResourceRoutes.ISSUE_RESOURCES, this);
    }

    loadMoreNewArticles = () => SUtils.appendStateWithApiRequestFor('new_articles', 'issue', 'more_new_articles', this, this.self_id);
    // loadMorePopularArticles = () => SUtils.appendStateWithApiRequestFor('popular_articles', 'more_popular_articles', this.state._this);

    render() {
        const controls = {
            'more_new_articles': this.loadMoreNewArticles,
            // 'more_popular_articles': this.loadMorePopularArticles
        };

        return (
            <div>
                {this.state.loading
                    ? <Waiter/>
                    : null}
                <IssueArticlesHeader self_id={this.self_id} data={this.state.data}/>
                <NextIssueArticle data={this.state.data}/>
            </div>
        );
    }
}

export default IssueArticlesPage;

// constructor(props){
//     super(props);
//
//     this.state = {
//         data: {},
//         _this: this,
//         loading: true
//     }
// }
//
// load = resource => SUtils.updateStateWithApiRequestFor(resource, this.state._this);
//
// componentWillMount(){
//     this.setState({loading: true}, () => {
//         const promises = ResourceRoutes.ISSUE_RESOURCES.map(resource => this.load(resource));
//         Promise.all(promises).then(() => {
//             this.setState({loading: false});
//         });
//     });
// }
//
// render() {
//
//     console.log(this.props);
//     return (
//         <div style={styles.item}>
//             {this.state.loading
//                 ? <Waiter/>
//                 : null}
//             <IssueArticlesHeader data={this.state.data} id={this.props.match.params.id}/>
//
//             <NextIssueArticle data={this.state.data}/>
//         </div>
//     );
// }