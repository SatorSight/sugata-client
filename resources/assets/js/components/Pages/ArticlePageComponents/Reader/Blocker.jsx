import React, { PureComponent } from 'react';
import { getResource } from '../../../Helpers/dataComposer';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

const styles = {
    blockerContainer: {
        height: '100%',
        position: 'absolute',
        width: '100%',
    },
    firstHalf: {
        height: '40vh',
        background: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(255,255,255,1) 100%)'
    },
    secondHalf: {
        background: 'white',
        height: 'calc(100% - 30vh)',
    },
    readMore: {
        color: 'black',
        fontFamily: 'Montserrat!important',
        fontWeight: 'bold',
        fontSize: '1.2rem!important',
        height: '40px',
        border: '1px solid black',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }
};

const mapStateToProps = state => ({
    auth_data: getResource(state, 'auth_data'),
    height: state.pageHeight.height,
});

class Blocker extends PureComponent {
    constructor(props){
        super(props);
    }

    render() {
        // const screen_height = screen.height;
        const { height, classes } = this.props;
        const half_of_article_height = height / 2;
        console.log('this.props.auth_data.not_full');
        console.log(this.props.auth_data.not_full);

        return (
            <div
                className={classes.blockerContainer}
                style={{marginTop: half_of_article_height}}
            >
                <div className={classes.firstHalf}></div>
                <div className={classes.secondHalf}>
                    <div className={classes.subLabel}>
                        <a href={(this.props.auth_data.sub_url + '/?' + this.props.auth_data.all_params_string)}>
                            <div className={classes.readMore}>
                                Подписаться и читать далее
                            </div>
                        </a>
                    </div>
                </div>
                <div>hello</div>

            </div>
        );
    }
}

Blocker.propTypes = {
    auth_data: PropTypes.object,
    height: PropTypes.number,
};

export default withStyles(styles)(connect(mapStateToProps)(Blocker));