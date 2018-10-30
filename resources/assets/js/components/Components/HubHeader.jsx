import React, { PureComponent } from "react";
import { withStyles } from 'material-ui/styles';

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '1em',
    },
    image: {
        height: '15em',
        backgroundRepeat: 'no-repeat',
        width: '100%',
        backgroundPosition: 'center',
    },
    inner: {
        width: '100%',
        height: '100%',
        background: 'linear-gradient(top, rgba(0,0,0,0) 0%, rgba(0,0,0,0.65) 100%)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    tag: {
        color: 'white',
        fontFamily: 'Montserrat',
        fontSize: '3em',
        marginBottom: '0.5em',
    }
};

class HubHeader extends PureComponent {
    constructor(props){
        super(props);
    }

    render() {
        const { classes, tag } = this.props;

        return (
            <div className={classes.container}>
                <div className={classes.image} style={{
                    backgroundImage: `url(${tag.image_path})`,
                }}>
                    <div className={classes.inner}>
                        <div className={classes.tag}>
                        123 {tag.name}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(HubHeader);