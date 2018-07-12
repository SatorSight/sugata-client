import React, { Component } from 'react';
import { toRuMonthYearLocale, capitalize } from './../Helpers/SUtils';
import { Link } from 'react-router-dom';
import SectionTitle from '../Components/SectionTitle';
import ProgressiveImage from '../Helpers/ProgressiveImage';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import * as css from '../Helpers/cssConstants';

const styles = {
    main: {
        padding: '0 1.6em',
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
    },
    title: {
        ...css.articleBigTitle,
        width: '70%',
    },
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
        const { classes, articles } = this.props;
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
                           <Link to={`/article/${article.id}`}>
                               <ProgressiveImage
                                   src={article.image_path}
                                   preview={article.image_path_resized}
                                   className={classes.preview}
                                   alt={article.title}
                               />
                           </Link>
                           <div className={classes.inner}>
                                <div className={classes.over}>
                                    <Link to={`/article/${article.id}`} className={classes.title}>
                                        {capitalize(article.title.toLowerCase())}
                                    </Link>
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

NewArticles.propTypes = {
    articles: PropTypes.arrayOf(PropTypes.object),
    title: PropTypes.string,
    link: PropTypes.string,
    label: PropTypes.string,
    no_links: PropTypes.bool,
    classes: PropTypes.objectOf(PropTypes.string),
};

export default withStyles(Object.assign({}, styles, css))(NewArticles);