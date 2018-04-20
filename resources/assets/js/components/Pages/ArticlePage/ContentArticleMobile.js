import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import NextArticle from "../ArticlePage/NextArticle";
import * as SUtils from "../../Helpers/SUtils";
import IndexMenu from '../../Components/IndexMenu';

const styles = {
    header: {
        width: '100%',
        height: '100%',
        position: 'relative',
        background: '#000',
        // overflow: 'hidden',
        zIndex: 50,
    },
    item: {
        width: '100%',
        backgroundColor: '#000',
        position: 'relative',
        // overflow: 'hidden',
    },
    indexMenu:{
        position: 'absolute',
        left: '1em',
        top: '50%',
        transform: 'translate(0, -50%)',
        zIndex: 50,
    },
    customMenu:{
        right: 0,
        top: 0,
        width: '6em',
        height: '100%',
        zIndex: 50,
        paddingLeft: '2em',
    },
    inner_header: {
        width: '100%',
        position: 'relative',
        zIndex: 20,
    },
    bg: {
        zIndex: 10,
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
        overflow: 'hidden',
    },
    imgBg: {
        zIndex: 10,
        position: 'absolute',
        top: 0,
        right: 0,
        width: '100%',
        opacity: '0.3'
    },
    mask: {
        zIndex: 20,
        position: 'absolute',
        top: '-10%',
        left: 0,
        width: '80%',
        height: '200%',
        overflow: 'hidden',
        background: 'radial-gradient(ellipse at center, rgba(0,125,192,1) 0%, rgba(19,83,186,1) 20%, rgba(58,0,174,0.2) 60%, rgba(58,0,174,0) 70%)',
        opacity: 0.6,
        maxWidth:'30em',
    },
    shadow: {
        zIndex: 20,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '15%',
        overflow: 'hidden',
        background: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%,rgba(0,0,0,0.65) 100%)',
        opacity: 0.6,
    },
    left: {
        overflow: 'hidden',
        boxShadow: 'rgba(0, 0, 0, 0.3) 0.1em -0.1em 0.3em',
        borderRadius: '0.2em',
        float: 'left',
        width: '5.6em',
        maxHeight: '6em',
        margin: '1em 1.2em -1em 4.6em',
    },
    magLeft: {
        width: '100%',
        float: 'left',
    },
    url: {
        display: 'block',
        overflow: 'hidden',
        textDecoration: 'none',
        maxHeight: '5em',
        // cursor: 'pointer',
    },
    right: {
        overflow: 'hidden',
        borderRadius: '0.2em',
        marginLeft: '7.4em',
        padding: '1.8em 0 1.3em',
        maxWidth: '50%',
    },
    title: {
        fontSize: '1.2em',
        textTransform: 'uppercase',
        fontFamily: 'HelveticaNeueCyr, sans-serif',
        fontWeight: 200,
        letterSpacing: 4,
        color: '#fff',
        marginBottom: '0.3em',
        lineHeight: 1.2,
    },
    captionColorSwiper: {
        display: 'inline',
        fontFamily: 'HelveticaNeueCyr, sans-serif',
        color: '#FFF',
        borderRadius: '1em',
        padding: '0.4em 0.6em 0.2em 0.8em',
        fontSize: '0.9em',
        fontWeight: 200,
        letterSpacing: '0.2em',
        lineHeight: 1.6,
        textTransform: 'uppercase',
        border: '1px solid #FFF',
    },

    root: {
        backgroundColor: '#FFF',
        position: 'relative',
        textAlign: 'center',
        overflow: 'hidden',
        zIndex: 20,
        minHeight: '100vh',
    },
    inner: {
        margin: 20,
    },
    background: {
        position: 'fixed',
        overflow: 'hidden',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        zIndex: 0,
        minHeight: '100vh',
        background:'#FFF',
    },
    pageMask: {
        position: 'fixed',
        overflow: 'hidden',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        zIndex: 0,
        minHeight: '100vh',
        background:'rgba(0,0,0,0.5)',
    },
    onLoading: {
        display: 'none',
        zIndex: -10,
    },
    offLoading: {
        position: 'fixed',
        overflow: 'hidden',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        background:'url("data:image/gif;base64,R0lGODlhZABkALMIAPr6+tzc3O7u7ry8vLKyssnJya2trf///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQFCgAIACwAAAAAZABkAAAE//DISau9OOvNu/9gKI5kaZ5oqq5s675wLM90bd94ru987//AoHBILBqPyKRyyWw6n9CodEq9CKqkQKaAHREAF4AhzMUOrhbD4BIYVwQDd9VgCIApdG2lIJcECHRddAYEehJ0BGgSAoETfIOCanRnh3RlEo8SAHF1jXNjf5aMhHWagGMCp1qeVI0Aj6qEYKMGowN3rAACAQUETqxwkHFrnIO3E3S7vYOsSs0Howdidad5FczGmU3PB41tgJyGyIQDAXaVv33jjnnc7upA2PIXnqPT9PDdzELy2Ph4Y97hg+QDG4CDCO+l6RNI4EJa3Gr4W/hvncNrBqYR1EFHIcaK6P8uApzmMUfDfCJPghzZMSINlRRjhkRJk6TLGTA/ytTHc+c4m/kkBqS5MidAfEB5GF23cym6hUl3OO2pc+bKny2Dvhx69alVn5WicuQKlipPkVgz3pQxNSXZqizVasX59mjTukwxijWJ16vdr3DTlsTRlqhFw3qzKu1rNu9ZxHEH3yhclPG7vYQtQ6YMVbFUzZUb+xW8NgZnuKcjl4aR2nHrsJ7Hip7N6rU+zJNB36VdMzZf3qHRwpa7GPhdybxx27CdbFybNWWzIhea3AKfY/riiMN02Xdm3uXeANLD7I6mcEi9554dSo2iA21q6TNwCRqgRBikr34xVVr8OuZdN5+1IvFhlx5xn802wSaI6DENLGC8YskG+s3FFmNvcEIJI6dwEUwhGejyiHLUrQbAfwUI8EgtoVBCgS68VFNhcftJA0soBDxSwB0nBjCAjPSlKACJWymYgY+IMGOOj0AOUM570qi3HIYbtDcJNgSUcw4GRNI1Xz9gylNMmGQOMl2RZaapxphq9nMmXW3GKWeYi81p551d5Knnnnz26eefgAYq6KCEFmrooYgmquiijDbq6KOQRjpEBAAh+QQFCgAIACwfABcAKQA0AAAE//DISes0xurNy8ZbwI2SIVqgFWQkh51USq1sq2GEUMmSgNWcQQGAwsEOPN/PAggQLpiCDlow5KATAMEwSBa2tZ+RiAF0B9OUlovMNLtiqMCJq7rP5Ds3T7NKZWoBcCkCeGVdBERtGAMBRACAQAcCdhMCW3aIim1SFJBhkiVAl2JXWBWfpzuSpBhTqlmRN6E0r7ASn2KhbbO9qLo8t6K+nmUAqUXEMaHIvMnPq0yy0MvKuNPR1MLNwcPa3sWg1uDVv+Lfztnhwunl6rHn7+zd3Lvd7dvY7vv58fzk/ebZGyjNn8Bx9cbhA3ggIbp79PQd/OZQHsOFFf8txCjxIkRmHYo3fiw40SJHgx4JmiupMSLKNrYY0iB50U7MYDQ8rLx4oIopcqR07oS5QZOqoJtmROJyBJdRZ2YMDEFVaEkPO1FsrRmQp+EZW5TASG365kcjRVvbREUzQZBZRyMo/SDQiRQcnzrk1ok5omyUAErmzhl01oaGsD+wchFboKlhJm6BMU1KQrLly5glRwAAIfkEBQoACAAsHAAXACkANAAABP/wyEnrFDbrzcsOXOhlBJAJRMgZg1kZoFUY57gaBEaxVmDQFECBALz9Aq7DTycB/IqAAPGn+s0MBdeRMnhKBF0WNUSVsjC/lMT3FKZB4wOhEBAklUAwjm3AoGBpR1pFTz8DdAJxboUeMy1PA0x4E1ZhhUVrlz45eDE7hEAAAgVDcReGTzGmlKAZqxJLhqyurRaveE59s7aXmLsvNKa3vb6wxZPCxz8AzMPKwZjOv5+0k9O/0rzWxtXc2trJ3dvU4NHP197A49nj6Mjm4uzU4d/t6fPw9fKz9Or37lT6kbNHMGA+fwXPCcR2rtzAgfu4LUwX8d1DhuLwXaTYUN3EbRWgDW4E2VEjwFoITf7jmJHfQYglXY6ME9JArpkoR3ZJBIWdsywVHMXpMiDeMTORghTKVKLCn5wUzBDwdOAKjT9UR6VhcqvJFU98qmKZIITInJQWFrWQMGWTDjNYJBkLgGQDz6Z8YBzQc0bDpUN1LDytA2nR2Q1RAgyYAqmAAB2L2ExteyeEqAClCs1xbFVMXxWIR3UOhGMPaGPEUmtmrLpXBAA7") no-repeat 50% 20% #FFF',
        zIndex: 25,
    },
    arrowOnLoading: {
        display: 'block',
        position: 'fixed',
        zIndex: 45,
        top: 0,
        bottom: 0,
    },
    arrowOffLoading: {
        display: 'none',
        position: 'fixed',
        zIndex: 45,
        top: 0,
        bottom: 0,
    },
    arrowNext: {
        position: 'fixed',
        right: 0,
        top: 0,
        bottom: 0,
        width: '2em',
        background: 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAABQCAMAAABhw6aVAAAA/1BMVEVHcEwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD///8AAAAAAAD+/v4AAAAAAAAAAAABAQEAAAAAAAACAgIAAABISEjm5ubLy8tvb28AAAAAAAAAAAAAAAAAAABvb2+YmJjx8fHf398AAADe3t4AAAACAgIAAAAAAADw8PAAAAAAAAD8/PxcXFzq6ur5+fl0dHS9vb0xMTHu7u4AAADPz89NTU3j4+OFhYXf39+RkZFlZWXg4ODPz88AAAD9/f2SkpLS0tLo6OhnZ2dMTExzc3Pz8/P7+/t6enrFxcXd3d3s7OwkJCSfn596enqzs7NOTk7///9xkL06AAAAVHRSTlMAEQYFBAcMAQIDCg4I/BMZ/RgdFiEfQCYvXNayPDg7KTFEblDKoSOiNSwrIM0nJfUw0+Q5aSHES7BVn16WVHS6qjf4QJGsSihr2O9kiHjSR3oyVzuAcDhhAAACvklEQVRYw83XaXOiMBgHcLlBUyjgwXar6FYjaFfdVdvaY3tup9374Pt/lk04NHaBBDrTaV77myeJSXj+lUrpoSjqZiiKwkg0TRQFQRBFTcOMxSAi8BIAQJJ4QcSMilREJFCtyngAEDKFbnhQlWscp+s6V5OrEl0hJABE7Nvh3uWfpY0Y4GkKFZKqNc78/jEIgpvz34bOURUqxAOZsxfYBMHO6dywqUpRcSF7+XkaomD3dG5RFUYyZ876u0GsBvtUpeBt0I3ZUYJYVISsyfmXgFRmrkrQ/aYUXSlqOD3onH0g1HC/kaeijTDgyPvKrhDi0ZZb77udB2YVnSI0P99rPuyxrgsfIxmVmjjt5jtWFZXi7AaaYO+JypxhdDXQXozdp2qYr9Dx0wspfN2FUNVTlFVCDUqqxoupcusavmitkjtvP0OpJZSQcgzz1oXew5osicXUYG7o4QSVSgF1N0MTRKWUSrbCD8DxJ0I9HuBSaFWVDIUfgJbT6ZFquljaNcCnoUjhq1wfbZeaLuo2V0WLyvo2SvjVcLcfqMcLaOJF0dDWA3r3NxsR0yOf6p2r+9E4a3rERlwcEnVOVl3XytgIYsu3zNtV24EZW078uQdb5k2n6zbS/9xs0/R8mH6Mcsy1D9MPbI5pO630q8Fg/ruEpOlnGa2ISX/EnmsOX7HpvzJDfKiLmaglYDeb5oN534g2p0CddUN1e8Ru1q0b2Y7STNIkko0v1STtKNFi003S+LbWzfxJdOfyG9+4W45jAzbXNJM089D/FgaUq1XTo5okNqBe7+xy+uPXz47nT+ixIQooFkTfleNex+u6kCWghFHIRMp3HN9t1ekmCV26aY0hnMC6xRK6NvHONNAw2eLdJkjqcZCkm/DihpE1TKyYMETWWPESDseANRyTMRzncJXFYBUGfg3ndtbAH7tk0H/8DxSbL2r9DGaMAAAAAElFTkSuQmCC") no-repeat 50% 50% rgba(0,0,0,0.1)',
        backgroundSize: '1.6em auto',
        cursor: 'pointer',
    },
    arrowPrev: {
        position: 'fixed',
        left: 0,
        top: 0,
        bottom: 0,
        width: '2em',
        background: 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAABQCAMAAABhw6aVAAAA/1BMVEVHcEwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD///8AAAAAAAD+/v4AAAAAAAAAAAABAQEAAAAAAAACAgIAAABISEjm5ubLy8tvb28AAAAAAAAAAAAAAAAAAABvb2+YmJjx8fHf398AAADe3t4AAAACAgIAAAAAAADw8PAAAAAAAAD8/PxcXFzq6ur5+fl0dHS9vb0xMTHu7u4AAADPz89NTU3j4+OFhYXf39+RkZFlZWXg4ODPz88AAAD9/f2SkpLS0tLo6OhnZ2dMTExzc3Pz8/P7+/t6enrFxcXd3d3s7OwkJCSfn596enqzs7NOTk7///9xkL06AAAAVHRSTlMAEQYFBAcMAQIDCg4I/BMZ/RgdFiEfQCYvXNayPDg7KTFEblDKoSOiNSwrIM0nJfUw0+Q5aSHES7BVn16WVHS6qjf4QJGsSihr2O9kiHjSR3oyVzuAcDhhAAACvklEQVRYw83XaXOiMBgHcLlBUyjgwXar6FYjaFfdVdvaY3tup9374Pt/lk04NHaBBDrTaV77myeJSXj+lUrpoSjqZiiKwkg0TRQFQRBFTcOMxSAi8BIAQJJ4QcSMilREJFCtyngAEDKFbnhQlWscp+s6V5OrEl0hJABE7Nvh3uWfpY0Y4GkKFZKqNc78/jEIgpvz34bOURUqxAOZsxfYBMHO6dywqUpRcSF7+XkaomD3dG5RFUYyZ876u0GsBvtUpeBt0I3ZUYJYVISsyfmXgFRmrkrQ/aYUXSlqOD3onH0g1HC/kaeijTDgyPvKrhDi0ZZb77udB2YVnSI0P99rPuyxrgsfIxmVmjjt5jtWFZXi7AaaYO+JypxhdDXQXozdp2qYr9Dx0wspfN2FUNVTlFVCDUqqxoupcusavmitkjtvP0OpJZSQcgzz1oXew5osicXUYG7o4QSVSgF1N0MTRKWUSrbCD8DxJ0I9HuBSaFWVDIUfgJbT6ZFquljaNcCnoUjhq1wfbZeaLuo2V0WLyvo2SvjVcLcfqMcLaOJF0dDWA3r3NxsR0yOf6p2r+9E4a3rERlwcEnVOVl3XytgIYsu3zNtV24EZW078uQdb5k2n6zbS/9xs0/R8mH6Mcsy1D9MPbI5pO630q8Fg/ruEpOlnGa2ISX/EnmsOX7HpvzJDfKiLmaglYDeb5oN534g2p0CddUN1e8Ru1q0b2Y7STNIkko0v1STtKNFi003S+LbWzfxJdOfyG9+4W45jAzbXNJM089D/FgaUq1XTo5okNqBe7+xy+uPXz47nT+ixIQooFkTfleNex+u6kCWghFHIRMp3HN9t1ekmCV26aY0hnMC6xRK6NvHONNAw2eLdJkjqcZCkm/DihpE1TKyYMETWWPESDseANRyTMRzncJXFYBUGfg3ndtbAH7tk0H/8DxSbL2r9DGaMAAAAAElFTkSuQmCC") no-repeat 50% 50% rgba(0,0,0,0.1)',
        backgroundSize: '1.6em auto',
        cursor: 'pointer',
        transform: ' scale(-1, 1)',
    },

    listing_root: {
        display: 'block',
    },
    listing_button: {
        color: '#FFF',
        background: 'rgba(0,0,0,0)',
        cursor: 'pointer',
        position: 'absolute',
        right: '2em',
        top: '50%',
        transform: 'translate(0, -50%)',
        border: 0,
        padding: '1em',
    },
    listing_onLoading: {
        display: 'block',
    },
    listing_offLoading: {
        display: 'none',
    },
    listing_onOpen: {
        display: 'block',
        position: 'absolute',
        overflowX: 'hidden',
        overflowY: 'scroll',
        left: 0,
        right: 0,
        top: '6.2em',
        bottom: 0,
        minHeight: '100vh',
        zIndex: 100,
        background: 'url(/images/header.jpg) no-repeat 50% -6.2em #000',
        backgroundSize: '100% auto',
    },
    listing_offOpen: {
        display: 'none',
    },
    listing_item: {
        padding: '0.5em 0 1.3em',
        position: 'relative',
    },
    listing_ava: {
        position: 'absolute',
        left: '1.3em',
        top: '1.3em',
        borderRadius: '0.5em',
        width: '6.5em',
        height: '6.5em',
        overflow: 'hidden',
        backgroundPosition: '50% 50%',
        backgroundSize: 'cover',
        boxShadow: '0.8em 0.8em 1em -0.6em rgba(0,0,0,0.2)',
    },
    listing_inner: {
        margin: '1.3em 1.3em 1.3em 10em',
        height: '6em',
    },
    listing_content: {
        position: 'relative',
        zIndex: 20,
    },
    listing_shadow: {
        zIndex: 10,
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        top: '6.2em',
        background: '#000',
        opacity: 0.8,
    },
    listing_text: {
        fontSize: '1.2em',
        fontFamily: 'HelveticaNeueCyr, sans-serif',
        lineHeight: 1.6,
        margin: '0 0 0.2em',
        padding: 0,
        maxHeight: '3em',
        color: '#FFF',
        overflow: 'hidden',
        position: 'relative',
        width: '70%',
        fontWeight: 300,
        display: 'block',
    },
    listing_pageNumber: {
        color: '#999',
        border: '1px solid #999',
        borderRadius: '1em',
        padding: '0 0.4em',
        lineHeight: 1.6,
        margin: '0 1em 0 0',
    },
    listing_link: {
        display: 'block',
        cursor: 'pointer',
    },
    listing_last: {
        height: '8em',
    },
};


class ContentArticleMobile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            left: 0,
            originalX: 0,
            originalY: 0,
            zIndexPrev: 0,
            zIndexCurrent: 0,
            zIndexNext: 0,
            htmlPrev: 0,
            htmlCurrent: 0,
            htmlNext: 0,
            isLoading: true,
            listingLoad: false,
            allPage: [],
            numberArticle: 0,
            pageNumber: 0,
            idArticle: 0,
            idNext: 0,
            redirectToReferrer: false,
            listingHtml: 0,
            open: false,
        };

        this.minDistance = 15;
    }

    componentDidMount(){
        const self_id = Number(this.props.self_id);
        let other_articles_ids = this.state.allPage;
        this.setState({ isLoading: false, idArticle: this.props.self_id },);
        let listing =[];
        scrollTo(0,0);

        fetch('/api/article/article/'+self_id)
            .then((results) => results.json())
            .then((data) => {
                this.setState({
                    htmlCurrent: (data.html!==null) ? data.html : data.desktop_html,
                    zIndexCurrent: 30,
                    isLoading: true,
                    allPage: data.other_articles_ids,
                    pageNumber: data.page_number,
                    idArticle: data.id,
                    idNext: data.id,
                },);
                other_articles_ids = this.state.allPage;
                function find(array, value) {
                    if (array.indexOf) {
                        return array.indexOf(value);
                    }
                    for (let i = 0; i < array.length; i++) {
                        if (array[i] === value) return i;
                    }
                    return -1;
                }
                const active_article = find(other_articles_ids, self_id);
                this.state.allPage[active_article] = [this.state.htmlCurrent];
                let prev = active_article-1;
                let next = active_article+1;
                const last_article = this.state.allPage.length - 1;
                if (active_article!==0) {
                    fetch('/api/article/article/' + this.state.allPage[prev])
                        .then((results) => results.json())
                        .then((data) => {
                            this.setState({
                                htmlPrev: (data.html !== null) ? data.html : data.desktop_html,
                                numberArticle: active_article,
                            },);
                            this.state.allPage[prev] = [this.state.htmlPrev];
                        })
                        .catch((error) => {
                            console.error(error);
                        });
                }
                if (active_article!==last_article) {
                    fetch('/api/article/article/' + this.state.allPage[next])
                        .then((results) => results.json())
                        .then((data) => {
                            this.setState({
                                htmlNext: (data.html !== null) ? data.html : data.desktop_html,
                            },);
                            this.state.allPage[next] = [this.state.htmlNext];
                        })
                        .catch((error) => {
                            console.error(error);
                        });
                }
            })
            .catch((error) =>{
                console.error(error);
            });

        fetch('/api/article/listing/'+self_id)
            .then((results) => results.json())
            .then((data) => {
                for(let i=0; i < data.length; i++){
                    listing[i] = <div key={String(i)} style={styles.listing_item}>
                        <div onClick={() => this.goToPage(data[i].id)} style={styles.listing_link}>
                            <div style={Object.assign({}, styles.listing_ava, {backgroundImage:'url(' + data[i].image + ')' })} />
                            <div style={styles.listing_inner}>
                                <p style={styles.listing_text}><span style={styles.listing_pageNumber}>{data[i].page_number}</span>{data[i].title}</p>
                            </div>
                        </div>
                    </div>
                }
                listing.push(<div key={'last'} style={styles.listing_last} />);
                this.setState({ listingHtml: listing,  listingLoad: true },);
            })
            .catch((error) =>{
                console.error(error);
            });
    }

    loadPrev = (e) => {
        const active = e;
        let prev = active-1;
        if (this.state.numberArticle>0) {
            if (!this.state.allPage[prev][0]) {
                fetch('/api/article/article/'+this.state.allPage[prev])
                    .then((results) => results.json())
                    .then((data) => {
                        this.setState({
                            htmlNext: this.state.htmlCurrent,
                            htmlCurrent: this.state.htmlPrev,
                            htmlPrev: (data.html!==null) ? data.html : data.desktop_html,
                            isLoading: true,
                            left: 0,
                        },);
                        this.state.allPage[prev] = [this.state.htmlPrev];
                    })
                    .catch((error) =>{
                        console.error(error);
                    });
            }
            else {
                this.setState({
                    htmlNext: this.state.htmlCurrent,
                    htmlCurrent: this.state.htmlPrev,
                    htmlPrev: this.state.allPage[prev][0],
                    isLoading: true,
                    left: 0,
                },);
            }
        }
        else {
            this.setState({
                htmlNext: this.state.htmlCurrent,
                htmlCurrent: this.state.htmlPrev,
                isLoading: true,
                left: 0,
            },);
        }
        this.props.history.push('/article/'+this.state.idArticle);
        scrollTo(0,0);
    };

    loadNext = (e) => {
        const active = e;
        const last_article = this.state.allPage.length - 1;
        let next = active+1;
        if (this.state.numberArticle<last_article) {
            if (!this.state.allPage[next][0]) {
                this.setState({
                    htmlPrev: this.state.htmlCurrent,
                    htmlCurrent: this.state.htmlNext,
                },);
                fetch('/api/article/article/'+this.state.allPage[next])
                    .then((results) => results.json())
                    .then((data) => {
                        this.setState({
                            htmlNext: (data.html!==null) ? data.html : data.desktop_html,
                            isLoading: true,
                            left: 0,
                        },);
                        this.state.allPage[next] = [this.state.htmlNext];
                    })
                    .catch((error) =>{
                        console.error(error);
                    });
            }
            else {
                this.setState({
                    htmlPrev: this.state.htmlCurrent,
                    htmlCurrent: this.state.htmlNext,
                    htmlNext: this.state.allPage[next][0],
                    isLoading: true,
                    left: 0,
                },);
            }
        }
        else {
            this.setState({
                htmlPrev: this.state.htmlCurrent,
                htmlCurrent: this.state.htmlNext,
                isLoading: true,
                left: 0,
            },);
        }
        this.props.history.push('/article/'+this.state.idArticle);
        scrollTo(0,0);
    };

    _get = (e) => {
        const last_article =this.state.allPage.length - 1;
        if (e>0 && this.state.numberArticle>0) {
            this.setState({
                isLoading: false,
                pageNumber: this.state.pageNumber - 1,
                idArticle: this.state.idArticle - 1,
                numberArticle: this.state.numberArticle - 1,
                left: 0,
            },
                // this.loadPrev = () => {
                //     this.loadPrev(this.state.numberArticle);
                // });
                function(){
                    this.loadPrev(this.state.numberArticle);
                    this.setState({idNext: this.state.idArticle,},);
                }.bind(this));
        }
        if (e<0 && this.state.numberArticle!==last_article) {
            this.setState({
                    isLoading: false,
                    pageNumber: this.state.pageNumber + 1,
                    idArticle: this.state.idArticle + 1,
                    numberArticle: this.state.numberArticle + 1,
                    left: 0,
                },

                // this.loadPrev = () => {
                //     this.loadNext(this.state.numberArticle);
                // });
                function(){
                    this.loadNext(this.state.numberArticle);
                    this.setState({idNext: this.state.idArticle,},);
                }.bind(this));
        }
        else {
            this.setState({ left: 0 });
        }
    };

    _onTouchStart = (e) => {
        const touch = e.touches[0];
        this.setState({ originalX: touch.clientX });
        this.setState({ originalY: touch.clientY });
    };

    _onTouchMove = (e) => {
        let deltaX = Math.abs(this.state.originalX-e.changedTouches[0].clientX);
        let deltaY = Math.abs(this.state.originalY-e.changedTouches[0].clientY);
        let next_or_prev = this.state.originalX-e.changedTouches[0].clientX;
        (next_or_prev>0) ? this.setState({ zIndexNext: 10, zIndexPrev: 0 }) : this.setState({ zIndexPrev: 10, zIndexNext: 0 });
        if (deltaX>this.minDistance && deltaY<this.minDistance) {
            const touch = e.changedTouches[0];
            let move = touch.clientX - this.state.originalX;
            this.setState({ left: move });
            this.setState({ originalY: e.changedTouches[0].clientY});
        }
        else {
            this.setState({ left: 0 });
        }
    };

    _onTouchEnd = (e) => {
        const lastItem_article = this.state.allPage[this.state.allPage.length - 1];
        const active_article = this.state.numberArticle;
        let deltaX = Math.abs(this.state.originalX-e.changedTouches[0].clientX);
        let deltaY = Math.abs(this.state.originalY-e.changedTouches[0].clientY);
        if (deltaX>this.minDistance && deltaY<this.minDistance && active_article!==lastItem_article) {
                this._get(e.changedTouches[0].clientX - this.state.originalX);
        }
        else {
            this.setState({ left: 0 });
        }
    };

    changedPageNext = () => {
        this._get(-1);
    };

    changedPagePrev = () => {
        this._get(+1);
    };

    goToPage = page =>  {
        this.setState(prevState => ({
            open: !prevState.open
        }));
        document.body.style.position = (!this.state.open===true) ? 'fixed': 'relative';
        const self_id = page;
        let other_articles_ids = this.state.allPage;
        this.setState({ isLoading: false, idArticle: this.props.self_id },);
        fetch('/api/article/article/'+self_id)
            .then((results) => results.json())
            .then((data) => {
                this.setState({
                    htmlCurrent: (data.html!==null) ? data.html : data.desktop_html,
                    zIndexCurrent: 30,
                    isLoading: true,
                    allPage: data.other_articles_ids,
                    pageNumber: data.page_number,
                    idArticle: data.id,
                    idNext: data.id,
                },);
                this.props.history.push('/article/'+this.state.idArticle);
                other_articles_ids = this.state.allPage;
                function find(array, value) {
                    if (array.indexOf) {
                        return array.indexOf(value);
                    }
                    for (let i = 0; i < array.length; i++) {
                        if (array[i] === value) return i;
                    }
                    return -1;
                }
                const active_article = find(other_articles_ids, self_id);
                this.state.allPage[active_article] = [this.state.htmlCurrent];
                let prev = active_article-1;
                let next = active_article+1;
                const last_article = this.state.allPage.length - 1;
                if (active_article!==0) {
                    fetch('/api/article/article/' + this.state.allPage[prev])
                        .then((results) => results.json())
                        .then((data) => {
                            this.setState({
                                htmlPrev: (data.html !== null) ? data.html : data.desktop_html,
                                numberArticle: active_article,
                            },);
                            this.state.allPage[prev] = [this.state.htmlPrev];
                        })
                        .catch((error) => {
                            console.error(error);
                        });
                }
                if (active_article!==last_article) {
                    fetch('/api/article/article/' + this.state.allPage[next])
                        .then((results) => results.json())
                        .then((data) => {
                            this.setState({
                                htmlNext: (data.html !== null) ? data.html : data.desktop_html,
                            },);
                            this.state.allPage[next] = [this.state.htmlNext];
                        })
                        .catch((error) => {
                            console.error(error);
                        });
                }
            })
            .catch((error) =>{
                console.error(error);
            });
        scrollTo(0,0);
    };

    listingMenu = (e) => {
        this.setState(prevState => ({
            open: !prevState.open
        }));
        document.body.style.position = (!this.state.open===true) ? 'fixed': 'relative';
    };

    render() {
        const prev = <div style={Object.assign({}, styles.background, {zIndex: this.state.zIndexPrev})}>
                            <div style={styles.inner} dangerouslySetInnerHTML={{ __html: this.state.htmlPrev }} />
                            <div style={styles.pageMask} />
                        </div>;

        const current = <div onTouchStart={this._onTouchStart} onTouchMove={this._onTouchMove} onTouchEnd={this._onTouchEnd}
                           style={Object.assign({}, styles.root, {zIndex: 30 }, {left: this.state.left + 'px'})} >
                            <div style={this.state.isLoading ? styles.onLoading : styles.offLoading} />
                            <div style={styles.inner} dangerouslySetInnerHTML={{ __html: this.state.htmlCurrent }} />
                        </div>;

        const next = <div style={Object.assign({}, styles.background, {zIndex: this.state.zIndexNext})}>
                            <div style={styles.inner} dangerouslySetInnerHTML={{ __html: this.state.htmlNext }} />
                            <div style={styles.pageMask} />
                        </div>;
        const journal_name = this.props.data.journal ? this.props.data.journal.name : '';
        const page_number = this.props.data.article ? this.props.data.article.page_number : '';
        const pages_count = this.props.data.issue ? this.props.data.issue.pages_count : '';
        const image_path = this.props.data.issue ? this.props.data.issue.image_path : '';
        const issue_id = this.props.data.article ? this.props.data.article.issue_id : '';

        const nextArticle = <div onClick={this.changedPageNext} style={{display: 'block'}}><NextArticle id_next={this.state.idNext} self_id={this.props.self_id} data={this.props.data} /></div>;
        const arrow = SUtils.isMobile(true) ? '' : <div style={this.state.isLoading ? styles.arrowOnLoading : styles.arrowOffLoading}><div style={styles.arrowNext} onClick={this.changedPageNext}> </div> <div style={styles.arrowPrev} onClick={this.changedPagePrev}> </div></div>;

        return (
            <div>
                <div style={styles.header}>
                    <div style={styles.item}>
                        <div style={styles.inner_header}>
                            <div style={styles.indexMenu}>
                                <IndexMenu data={this.props.data} />
                            </div>
                            <div style={styles.customMenu}>
                                <div>
                                    <div>
                                        <div style={this.state.listingLoad ? styles.listing_onLoading : styles.listing_offLoading} >
                                            <button style={styles.listing_button} onClick={this.listingMenu}>
                                                {this.state.open ? '▲' : '▼'}
                                            </button>
                                        </div>
                                        <div style={this.state.open ? styles.listing_onOpen : styles.listing_offOpen}>
                                            <div style={styles.listing_content}>
                                                {this.state.listingHtml}
                                            </div>
                                            <div style={styles.listing_shadow}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div style={styles.left}>
                                <Link  to={`/issue/${issue_id}`} style={styles.url}>
                                    <img style={styles.magLeft} src={image_path} alt={journal_name} />
                                </Link>
                            </div>
                            <div style={styles.right}>
                                <div style={styles.url}>
                                    <h3 style={styles.title}>&laquo;{journal_name}&raquo;</h3>
                                    <div style={styles.page}>
                                        <p style={styles.captionColorSwiper}>
                                            <span>{this.state.pageNumber}/</span>
                                            <span>{pages_count}</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div style={styles.bg}>
                            <img style={styles.imgBg} src="/images/header.jpg" alt={journal_name} />
                            <div style={styles.mask} />
                            <div style={styles.shadow} />
                        </div>
                    </div>
                </div>
                {prev}
                {current}
                {next}
                {nextArticle}
                {arrow}
            </div>
        );

    }
}

export default ContentArticleMobile;