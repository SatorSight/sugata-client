import React, {Component} from 'react';
import IndexMenu from '../../Components/IndexMenu';
import CustomMenu from '../../Components/CustomMenu';
import * as SUtils from "../../Helpers/SUtils";
import { Link } from 'react-router-dom'


const styles = {
    header: {
        width: '100%',
        position: 'relative',
        background: '#000',
    },
    mask: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        top: 0,
        zIndex: 10,
        backgroundSize: 'cover',
        boxShadow: 'inset 0 -5em 4em -4em rgba(0,0,0,1)',
        overflow: 'hidden',
    },
    bg: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        top: 0,
        zIndex: 10,
        backgroundSize: 'cover',
        opacity: 0.4,
        overflow: 'hidden',
        backgroundImage:'url("/images/header.jpg")'
    },
    colorOne: {
        position: 'absolute',
        left: '40%',
        bottom: '-70%',
        width: '100%',
        height: '130%',
        zIndex: 30,
        background: 'radial-gradient(ellipse at center, rgba(0,125,192,1) 0%, rgba(19,83,186,1) 20%, rgba(58,0,174,0.2) 60%, rgba(58,0,174,0) 70%)',
        opacity: 0.6,
    },
    colorTwo: {
        position: 'absolute',
        left: 0,
        top: 0,
        width: '50%',
        height: '100%',
        zIndex: 20,
        background: 'linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)',
    },
    colorThree: {
        position: 'absolute',
        right: '-25%',
        top: '40%',
        width: '100%',
        height: '100%',
        zIndex: 15,
        background: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 70%)',
    },
    inner: {
        position: 'relative',
        overflow: 'hidden',
        margin: '0 auto',
        textAlign: 'center',
        zIndex: 30,
    },
    pc: {
        overflowY: 'hidden',
        overflowX: 'auto',
    },
    h1: {
        fontSize: '1.3em',
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        color: '#FFF',
        fontWeight: 200,
        display: 'inline-block',
        padding: '0em 1.4em 0.85em',
        margin: '1em auto 0',
        position: 'relative',
        zIndex: 30,
        minWidth: '12em',
    },
    date: {
        color: '#FFF',
        fontSize: '0.9em',
        lineHeight: 3,
        letterSpacing: 1,
        fontWeight: 200,
    },
    arrow:{
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: '0.1em',
        background: 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABIwAAAAECAMAAADbJFQ7AAAA3lBMVEVHcEyV0OKSz+GTz+GTz+GU0eSTz+GU0OKSz+GW0+STz+GTz+Gg5OyTzuGX1uWTz+Gf2O6Y0+OSz+GV0uOTz+GTz+GTz+CW0eOU0OOT0OGT0OKUz+GTz+GU0OOTz+GTz+GU0OKTz+GUz+KTz+KTz+GUz+KTz+GTz+HG//+r4v+Sz+CTz+Ga0+eY0uSTz+GU0eKTz+GT0OGTz+GTz+GU0OGTz+GT0OGTzuGSz+GSz+GUz+GSz+GUz+GTz+CY1eOV0eWc1eqSz+GTz+KU0OOTz+GTz+GT0OKTz+GTz+GSzuDJon4XAAAASXRSTlMAOsW84C7KQ+8g1qYJ9hiIDiTrMrXkripIbU+Eez7BqlOMWnGAaZboAwb50hUczlddZpmfTHWQ/LixY5x42REnDPOTNqLbYP7dBUf55QAAAn1JREFUWMPt111LG1EUheEnWtpEEtVQBTR+oUKuRFCB3oo/u/RWoArilaDiVxRQSawGTUW1wJzMZIzRFtK7bCCT4czmwOGsd+2V0auPq0wGp6xg2yKqOME09kGWRXaFRYMswQ8owQUYgRLO+QyGuMUgY6hzT53wM4AivnAEWdxDHUUwSh4V8sjRwAg24GtomGMP5vkJJlABn0AZT3DIMln6fYcRKHLJHfiGTSYpMNzn+Zrb+IQ2wACjVKEG655osMUs9GMXPIISzsAq+7DAAXK4gm+oIcs96pRQ5xJUkRcaGjDD77BwB3nIkyOPC25Q4Bd4YBwVqIExqMAabHMDRSizQwPM4xhTYXHHUnxCXtgFvXq3MmVkOMVKU2eqnMB0Wmd239SZUlpnSpzjMwzhlkGMUY9vUaIzxbTO4i8UYRR5KvEt0mAENvAV7pnDHubxEyakhVaGJxxiWVZTaC06S4QWblHBsL7eJelVV+rZtdvY02Jgp4i97gkNW5hFP+xCAmxnsIp9LOCAHFzhG9Riy6qjRB2XUIU8ctLErmoldvgizwVuKOAXPGCcCkiIXQFtxC5LE/sYpihqEnsTk7wEGGVeeX53WBR7fmBR4vlpFnX0/A4savP8wKJ2z1eBxPPTLOr3NosSz++xqFf/kUY2oJ1Gnmhop5FHSGj0an6MafRqfuxIo/fnx4RGYX6MaRTmx67RKKjthQx69S8pbdvbKS0rndIGsYQE2C4gBnaHlFaXTmktw6Oj1uHxg5QWD49dSmlF6ZQWHK3AsD7P4pyWsv1RVNHFnBZs/8OcpoEZUrbfktOC7XfMaWqQ5DRr2MZNOqdpQHtOC7bfy2l/XX8ACrYiZGZgGQ8AAAAASUVORK5CYII=") no-repeat 50% 50%',
        backgroundSize: 'contain',
        opacity: 0.6,
    },
    indexMenu:{
        position: 'absolute',
        left: 0,
        top: '2em',
        zIndex: 50,
    },
    customMenu:{
        position: 'absolute',
        right: 0,
        top: '2em',
        zIndex: 50,
    },
    bigMag: {
        position: 'relative',
        display: 'inline-block',
    },
    imgMag: {
        position: 'relative',
        zIndex: 20,
        maxWidth: '20em',
        maxHeight: '9.4em',
        margin: '0.5em auto',
        boxShadow: 'rgba(0, 0, 0, 0.5) 0.1em 0.1em 0.3em -0.2em, rgba(255, 255, 255, 0.15) -1em -0.8em 1.5em -0.1em',
        borderRadius: '0.1em',
    },
    imgMagMask: {
        position: 'absolute',
        zIndex: 10,
        left: 0,
        right: 0,
        maxWidth: '20em',
        maxHeight: '9.4em',
        margin: '0.5em auto',
        boxShadow: 'rgba(0, 0, 0, 0.5) 0.1em 0.1em 0.3em -0.2em, rgba(255, 255, 255, 0.15) -1em -0.8em 1.5em -0.1em',
        borderRadius: '0.1em',
        transform: 'rotate(3deg)',
        opacity: 0.6,
    },
    leftMag: {
        display: 'block',
        position: 'absolute',
        left: 0,
        top: '50%',
        transform: 'translate(-30%, -50%)',
        opacity: '.6',
    },
    rightMag: {
        display: 'block',
        position: 'absolute',
        right: 0,
        top: '50%',
        transform: 'translate(30%, -50%)',
        opacity: '.6',
    },
    butMag: {
        position: 'relative',
        maxWidth: '15em',
        maxHeight: '7em',
        borderRadius: '0.1em',
        zIndex: 20,
    },
    butMagMask: {
        position: 'absolute',
        zIndex: 10,
        left: 0,
        right: 0,
        maxWidth: '15em',
        maxHeight: '7em',
        borderRadius: '0.1em',
        boxShadow: 'rgba(0, 0, 0, 0.5) 0.1em 0.1em 0.3em -0.2em, rgba(255, 255, 255, 0.15) -1em -0.8em 1.5em -0.1em',
        transform: 'rotate(3deg)',
        opacity: 0.6,
    },
    h3: {
        color: '#FFF',
        opacity: 0.8,
        fontSize: '1em',
        fontWeight: 400,
        letterSpacing: '0.15em',
    },
    button: {
        display: 'block',
        width: '60%',
        margin: '0.7em auto 1.45em',
        maxWidth: '25em',
        fontSize: '1em',
        color: '#FFF',
        lineHeight: 2.8,
        letterSpacing: 1,
        fontWeight: 200,
        padding: '0.3em 0 0.1em',
        textTransform: 'uppercase',
        border: '0.1em solid #FFF',
        textDecoration: 'none',
        borderRadius: '3em',
    },
};
class IssueHeader extends Component {

    constructor(props){
        super(props);
    }


    prev = issues => {
        let prev = null;
        issues.map((issue, i) => {
            if(parseInt(issue.id) === parseInt(this.props.self_id))
                if(i > 0)
                    prev = issues[i - 1];
        });

        return prev ?   <Link to={`/issue/${prev.id}`} style={styles.leftMag}>
                            <img style={styles.butMag} src={prev.image_path} alt={prev.journal_name} />
                            <img style={styles.butMagMask} src={prev.image_path} alt={prev.journal_name} />
                        </Link> : null;
    };

    next = issues => {
        let next = null;
        issues.map((issue, i) => {
            if(parseInt(issue.id) === parseInt(this.props.self_id))
                if(i < issues.length - 1)
                    next = issues[i + 1];
        });

        return next ?   <Link to={`/issue/${next.id}`} style={styles.rightMag}>
                            <img style={styles.butMag} src={next.image_path} alt={next.journal_name} />
                            <img style={styles.butMagMask} src={next.image_path} alt={next.journal_name} />
                        </Link> : null;
    };

    cur = issues => {
        let cur = null;
        issues.map((issue, i) => {
            if(parseInt(issue.id) === parseInt(this.props.self_id))
                cur = issue;
        });

        return cur ? <Link to={`/issue/${cur.id}`} style={styles.bigMag}>
                        <img style={styles.imgMag} src={cur.image_path} alt={cur.journal_name} />
                        <img style={styles.imgMagMask} src={cur.image_path} alt={cur.journal_name} />
                    </Link> : null;
    };

    index = issues => {
        let index = 0;
        if(SUtils.any(issues)) {
            issues.map((issue, i) => {
                if(parseInt(issue.id) === parseInt(this.props.self_id))
                    index = i;
            });
        }
        return index;
    };

    render() {
        const bundle = this.props.data.bundle ? this.props.data.bundle : null;
        const issues = this.props.data.all_issues;
        const index = issues ? this.index(issues) : null;
        const first_article_id = this.props.data.first_article_id ? this.props.data.first_article_id.id : 0;

        return (
            <div style={styles.header}>
                <div style={styles.mask}>
                    <div style={styles.bg} />
                    <div style={styles.colorOne} />
                    <div style={styles.colorTwo} />
                    <div style={styles.colorThree} />
                </div>
                <div style={styles.inner}>
                    <div style={styles.indexMenu}>
                        <IndexMenu payment_trigger={this.props.payment_trigger} auth_data={this.props.auth_data} data={this.props.data} />
                    </div>
                    {/*<div style={styles.customMenu}>*/}
                        {/*<CustomMenu data={this.props.data} />*/}
                    {/*</div>*/}
                    {SUtils.any(issues) ? <div>
                        {bundle ?
                            <Link to={`/bundle/${bundle.id}`} style={styles.h1}>
                                {bundle.name}<span style={styles.arrow}/>
                            </Link> : null}
                        <p style={styles.date}>{index ? SUtils.toRuMonthYearLocale(issues[index].content_date).toUpperCase() : ''}</p>
                        {this.prev(issues)}
                        {this.cur(issues)}
                        {this.next(issues)}
                        {issues[index] ?  <Link style={styles.button} key={issues[index].id} to={`/article/${first_article_id}`}>
                            открыть и читать
                        </Link> : null}
                    </div> : null }
                </div>
            </div>
        );
    }
}

export default IssueHeader;