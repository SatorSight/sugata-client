import React, { Component } from "react";
import SwiperTop from './SwiperTop';
import SwiperMain from './SwiperMain';
import * as SUtils from "../Helpers/SUtils";
const styles = {
    issuesSwiper: {
        overflow: 'hidden',
        marginTop: '-7em',
        position: 'relative',
        zIndex: 50,
    },
    inner: {
        position: 'relative',
        height: '7em',
    },
    shadow: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: '1em',
        zIndex: 35,
        background: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 100%)',
        opacity: 0.4,
    },
};
class IssuesSwiper extends Component {
    constructor(props) {
        super(props);
        let index = 0;
        this.state = {
            index: index,
        };
    }

    handleChangeIndex = index => {
        this.setState({ index });
    };

    render() {
        let issues = this.props.issues;
        let articles = this.props.articles;

        return (
            <div style={styles.issuesSwiper}>
                {SUtils.any(issues) && SUtils.any(articles) ? <div style={styles.over}>
                    <div style={styles.inner}>
                        <SwiperTop
                            bundle_id={this.props.bundle_id}
                            parent_type={this.props.parent_type}
                            active={this.state.index}
                            issues={issues}
                            changer={this.handleChangeIndex} />
                        <div style={styles.shadow} />
                    </div>
                    <SwiperMain active={this.state.index} issues={issues} articles={articles} changer={this.handleChangeIndex} />
                </div> : null }
            </div>
        );
    }
}
export default IssuesSwiper;