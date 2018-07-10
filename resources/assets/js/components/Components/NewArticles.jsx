import React, { Component } from 'react';
import { toRuMonthYearLocale, capitalize } from './../Helpers/SUtils';
import { Link } from 'react-router-dom';
import SectionTitle from '../Components/SectionTitle';

import { withStyles } from 'material-ui/styles';
import * as css from '../Helpers/cssConstants';


const styles = {
    main: {
        padding: '0 1.6em',
    },
    tabs: {
        background: '#fff',
    },
    item: {
        padding: '0.5em 0 1.3em',
        position: 'relative',
    },
    preview: {
        position: 'absolute',
        left: 0,
        top: '0.5em',
        borderRadius: '0.5em',
        width: '6.5em',
        height: '6.5em',
        overflow: 'hidden',
        boxShadow: '0.8em 0.8em 1.5em 0.3em rgba(0,0,0,0.05)',
        backgroundSize: 'cover',
    },
    inner: {
        marginLeft: '8.5em',
        height: '5.5em',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        paddingBottom: '2em',

    },
    over: {
        // position: 'relative',
        // overflow: 'hidden',
        // height: '6.2em',
        // marginBottom: '0.8em'
    },
    // caption: {
    //     display: 'inline',
    //     background: 'linear-gradient(to right, rgba(104,216,181,1) 0%, rgba(113,133,238,1) 100%)',
    //     color: '#FFF',
    //     borderRadius: '1em',
    //     padding: '0.3em 1em 0.1em',
    //     fontSize: '0.9em',
    //     textTransform: 'uppercase',
    //     fontWeight: 300,
    // },
    title: {
        // fontSize: '1.2em',
        // lineHeight: 1.4,
        // marginBottom: '0.2em',
        ...css.articleBigTitle,
        // maxHeight: '2.7em',
        // color: '#333',
        // overflow: 'hidden',
        // position: 'relative',
        width: '70%',
        // fontWeight: 600,
        // display: 'block',
    },
    // shadow: {
    //     position: 'absolute',
    //     left: 0,
    //     right: 0,
    //     bottom: 0,
    //     height: '50%',
    //     background: 'linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,0.8) 100%)',
    //     zIndex: 20,
    // },
    coverImage: {
        width: '5em',

    },
    cover: {
        height: '2em',
        marginRight: '1em',
        position: 'relative',
    },
    coverContainer: {
        overflow: 'hidden',
        height: 'inherit',
        boxShadow: '2px 2px 5px 0px rgba(0,0,0,0.1)',
    },
    shadow: {
        position: 'absolute',
        width: '8em',
        left: '-1.5em',
        bottom: 0,
    },
    detailsContainer: {
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
    },
    subTitle: {
        ...css.capsMediumText,
        lineHeight: '1.7em',
    }
};

class NewArticles extends Component {
    constructor(props){
        super(props);
    }

    render() {

        // console.log('articles  ---');
        // console.log(this.props.articles);

        const articles =  this.props.articles;
        const { classes } = this.props;

        return (
            <div className={classes.sectionWrapper}>
                <SectionTitle
                    no_links={this.props.no_links}
                    title={this.props.title || 'Новые статьи'}
                    link_label={this.props.label || 'Список последних выпусков'}
                    link={this.props.link || '/'}
                />
                <div className={classes.main}>
                    {articles.map(article =>
                       <div className={classes.item} key={`new_articles_${article.id}`}>
                            <Link to={`/article/${article.id}`}
                                  style={{backgroundImage:'url(' + article.image_path + ')' }}
                                  className={classes.preview} />
                            <div className={classes.inner}>
                                <div className={classes.over}>
                                    <Link to={`/article/${article.id}`} className={classes.title}>
                                        {capitalize(article.title.toLowerCase())}
                                    </Link>
                                    {/*<div className={classes.shadow} />*/}
                                </div>
                                <div className={classes.detailsContainer}>
                                    <div className={classes.cover}>
                                        <div className={classes.coverContainer}>
                                            <img className={classes.coverImage} src={article.issue_image.path} alt={article.title}/>
                                        </div>
                                        <img className={classes.shadow} src="/images/shdw.png" alt=""/>
                                    </div>
                                    <div className={classes.subTitle}>
                                        {article.journal_name}, <br/> {toRuMonthYearLocale(article.content_date)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

        );
    }
}

export default withStyles(Object.assign({}, styles, css))(NewArticles);