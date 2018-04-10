import React, { Component } from 'react';
import * as SUtils from "../../Helpers/SUtils";

const styles = {
    root: {
        backgroundColor: '#FFF',
        position: 'relative',
        textAlign: 'center'
    },
    inner: {
        margin: 20,
    }
};


class ContentArticleMobile extends Component {
    constructor(props) {
        super(props);

        this._onTouchStart = this._onTouchStart.bind(this);
        this._onTouchMove = this._onTouchMove.bind(this);
        this._onTouchEnd = this._onTouchEnd.bind(this);

        this.state = {
            left: 0,
            swiped: false,
            originalX: 0,
            originalY: 0,
        };
        this.minDistance = 15;
    }
    _onTouchStart(e) {
        const touch = e.touches[0];
        this.setState({ originalX: touch.clientX });
        this.setState({ originalY: touch.clientY });
        this.setState({ swiped: false });
    }

    _onTouchMove(e) {
        let deltaX = Math.abs(this.state.originalX-e.changedTouches[0].clientX);
        let deltaY = Math.abs(this.state.originalY-e.changedTouches[0].clientY);
        if (deltaX>this.minDistance && deltaY<this.minDistance) {
            const touch = e.changedTouches[0];
            let move = touch.clientX - this.state.originalX;
            this.setState({ left: move });
            this.setState({ originalY: e.changedTouches[0].clientY});
        }
        else {
            this.setState({ left: 0 });
        }
    }

    _onTouchEnd(e) {
        const touch = e.changedTouches[0];
        const trackX = Math.abs(touch.clientX - this.state.originalX);
        if (trackX > this.minDistance ) {
            this.setState({ swiped: true });
            this.setState({ left: 0 });
        }
    }

    render() {
        const article_title = this.props.data.article ? this.props.data.article.title : '';
        const article_html = this.props.data.article ? this.props.data.article.html : '';
        const article_desktop_html = this.props.data.article ? this.props.data.article.desktop_html : '';
        let html;
        html = (article_html!==null) ? article_html : article_desktop_html;

        return (
            <div onTouchStart={this._onTouchStart} onTouchMove={this._onTouchMove} onTouchEnd={this._onTouchEnd}
                 style={Object.assign({}, styles.root, {left: this.state.left + 'px'})} >
                <h3>{article_title}</h3>
                <div style={styles.inner} id="content-mobile" dangerouslySetInnerHTML={{ __html: html }} />
            </div>
        );

    }
}

export default ContentArticleMobile;