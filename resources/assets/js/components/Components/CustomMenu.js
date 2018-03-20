import React from 'react';
import { MuiThemeProvider, withStyles, createMuiTheme } from 'material-ui/styles';
import Drawer from 'material-ui/Drawer';
import Button from 'material-ui/Button';
import CustomMenuTabs from './CustomMenuTabs';

const theme = createMuiTheme({
    palette: {
        type: 'dark',
        background: {
            default: 'rgba(0,0,0,0.8)',
            paper: 'rgba(0,0,0,0.8)',
            appBar: 'rgba(0,0,0,0.8)',
            contentFrame: 'rgba(0,0,0,0.8)',
            chip:'rgba(0,0,0,0.8)',
        },
    },
});
const styles = {
    button: {
        display: 'block',
        minWidth: '2.8em',
        padding: '0.8em 0.7em',
    },
    list: {
        color: '#FFF',
        width: '100vw',
    },
    listFull: {
        width: '100vw',
    },
    line: {
        width: '100%',
        height: 1,
        backgroundColor: '#FFF',
        borderRadius: '0.3em',
        display: 'block',
        margin: '0.4em auto',
    },
    top: {
        textAlign: 'center',
        overflow: 'hidden',
        position: 'relative',
    },
    inner: {
        maxWidth: '50em',
        margin: '0 auto',
        position: 'relative',
        width: '100%',
    },
    topText: {
        fontSize: '1.55em',
        letterSpacing: '0.25em',
        textTransform: 'uppercase',
        color: '#FFF',
        fontWeight: 300,
        display: 'inline-block',
        lineHeight: 2.7,
        marginTop: '0.8em'
    },
    closet: {
        position: 'absolute',
        right: 0,
        top: 0,
        bottom: 0,
        width: '4.2em',
    },
    closetLineOne: {
        width: '1.8em',
        height: '0.2em',
        position: 'absolute',
        top: '50%',
        bottom: '50%',
        margin: '-0.1em 0.3em 0.3em -1em',
        backgroundColor: '#FFF',
        borderRadius: '0.1em',
        transform: 'rotate(45deg)',
        zIndex: 20,
    },
    closetLineTwo: {
        width: '1.8em',
        height: '0.2em',
        position: 'absolute',
        top: '50%',
        bottom: '50%',
        margin: '-0.1em 0.3em 0.3em -1em',
        backgroundColor: '#FFF',
        borderRadius: '0.1em',
        transform: 'rotate(-45deg)',
        zIndex: 20,
    },
    colorTwo: {
        position: 'absolute',
        bottom: '-40%',
        right: '-20%',
        width: '15em',
        height: '15em',
        background: 'radial-gradient(ellipse at center, rgba(172,168,165,1) 0%, rgba(115,112,110,1) 20%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0) 70%)',
        opacity: 0.4,
        zIndex: '-1',
    },
    drawerPaper: {
        position: 'relative',
        height: '100%',
        width: '100vw',
        boxShadow: 'inset 0 25em 4em -4em rgba(0,0,0,1)'
    },
    icon: {
        width: '1.2em',
        padding: '0.2em 0.5em 0',
    },
};

class CustomMenu extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            top: false,
            left: false,
            bottom: false,
            right: false,
        };
    }

    toggleDrawer = (side, open) => () => {
        this.setState({
            [side]: open,
        });
    };

    render() {
        const { classes } = this.props;

        return (
            <MuiThemeProvider theme={theme}>
                <div>
                    <Button color="primary" className={classes.button} onClick={this.toggleDrawer('right', true)}>
                        <img className={classes.icon} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIgAAACYCAMAAAAIslH7AAAApVBMVEVHcEz///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+IJwP4AAAANnRSTlMA0/7d9Ri8/AIF6Q4cmu3DKBX42QmpI47iWiA4Uwu2Zk2iPvFHbUJ3h8rlEX6TL3JfxjMsr87+5sWRAAAHUElEQVQYGe3A1WKr2gIF0Ik7gRB3aZS4zP//tGt7l0WatoEA9+UM5OT0Bp5kz1WDfxjq3Ja8Qc9BhazrQq/zK1mmqo+vFqoRL0Y+f2CPxjHK1zid6/yFWutaKJc1q9X5AlXvWyiR1lb5InWtoTQDiRncJyiHefSZib1AGRqewYwMz0LhhntmJsvtBgoW3phLM0ahLI85eRYKZK5lPlG3pVv7OO52x8f2SPLrfMJYmyjOQOVX0nQcQHAdNyN+IasTFOaw5SOjOdDwhTZoynzUuaIg1oiP9EmMp+JJjY9uFoqxMpjm7xx8K177TDMWKMShwzTpAz+aRExTAhTAajKt6eIXvSbTpibed5kzRQ/xq7DGFP+At1l7ppxdvKC3YUrbwrsCn6LOAS+5bCmQ7RbetaZoPsGLBipFO7wp7lDUNvEis02R4uA9XYMCpYWXBQoFxgDvaVJgtJFB26Bgirf0FAoiDRloCgWRi3eMVQrWyKRNwfyEd3gUqAEyudYp2OMNlk7ByEImlk7ByEJ+LYWCMTIaUxD1kJvZrzMxPyAb86AyofaR34CCmoaM3DMFE+S3oGDfQEYNj4IxcrPaFIyR2YKCtYm8nCYFE2Q2oGA6RF5xjQl1icyWdSb0GHmFdybsAzK72ExsQuSlRUx0AmR27TAhacjL7TChtJBZoDChaMjLtZmIesisFzGxdZGXazMR9ZBZL2Ki4yIvTWFCCZBZ0GEi0pCXJjHRCZDZdcvEPURe4YYJ+4LMLj4T5xB5xToT9SUyW9b5SdZj5DWcUjBAZgMKpg3kZa0pGCOzBQU7E7mNKWhbyMjaUzBGbuaEglGIjDSdggny66tM2AEyCuZMqH3k11IomCCjARNy1EN+DZ2CtolMrD0FuoX8TI8CqYFMhhEFHt6xqDNhLJHJh8GEOsY7Dh0KPGQypUC54i06BR0NGfQ6FOh4z8pgor5CBjuDCeOI9wQqBZKGl2kSBfMW3mPqFNS7eNnJoGCEd3UpOrt4kbuhaIB3aQpFK7xoR5EU4l3miqL5DC9Zzik6mnjb1aaoFuMF4YaibYACTGWK9iZ+ZXkUyR6K0LcpUrv41UmlaHtBIdoyRf4Av+j6FBlrFMNVmGIP8KOBz5RIQ0G6BlP8E75njn2mGF0UZdhkmnps4BvDY51p0yEKE3T4YNTHUzOdD5QWCrRQ+WC7c/BFvN4yTVbHKJK55yM5WvQaEDRax0jmozaK5ej8quMNLpoFAJZ7GXhbfqU7KJir8xlf0m/N5kiXfD4z0lC4QOITMn8itVCCZcSMpBlKMZOYyb2PkvRuzKDpojRh0+CLjGmMEllHmy/ZLiyUa1nj7+TaDKVzxhF/IY0dVKG39vk92V67qIjprqM6n6pLaw1V0hbNiI/kqLkIUbnex9HbzPmHf/aOHz38nzS01mE26XYns0NLa+Af//jLtKzGMHav/dny49Ny1r+68bBhWaiC4wbL026qS3b934wH9bot6dPdaRa4DsoTXyar6WbO78j85G+mq8klRgkOi+bGZib2prm4okhWa1fb1plDfVtbtSwUo3UaqTJzk9VRt4W3mf2dwrcpqz7eYp5GcxbCH3WRm/WhqyzMfLS0kEu/abBQxrSP7NzVnIXzjxoyOkkshdRFFuFUZTlk1Yvxsv6ZvzDmdieS7vfNufbHeXO/S1HHnhv8Ra2P15jdLX9gRLWbt+p+XHqOhRTL6V0+uivvVlMM/qAzwCsa+zq/Y9T2p1nLwS+c1vK0P8v8Tn3fwK9iT+ZThq8vDqGFF1nh4ajPDT4l72P8IrzxKb921ExkZLqrs8+nmjF+5N74TLSfmMjFmngKn2lq+EGo84n7uIU3tBYSnxjF+NbQ41fKScObtHGHX+0b+Ia55hf+3kUBXM/nFzt8o1vnI32Cgkx0PlIHeGri84G6GqIww5XKB/YHntA2fBB9mCiOaU4UPjiH+GrNB7cWChaM+GCHL2Yq00YhCqfpTJv38SC+M82LUYLQY9rGQdqOKfLeQSliT6ZIXiHloDClGaIk4Y0pSgCBuWdK1EJpAoUpbQgCm6JtHyWa2RRtW0ismDJGqRZMOeKTplA0aqBUjRFFUYi/uhTIdh/lMvs2RQP8taFoYaJk5pGiGv7oqxRELkrXUyiYH/A/bZkJY48KeDITxhr/NdxQYB9QgYtPQa2B/5jYFOxRCY+C7RL/sZaZMPqoxExmwtgBgHmjQHJQCUehoGkC0O4UtC1UwtpTsAkBXOZMGEtU5IMC/wDgg4J7DxXpSUzISwALCqYOKuI0KRgD1p6CHapi7ihoW3BGFHRRmRMFtyFCiQl1icosVSbuMTSfiU6Ayly3TGw1uAYTkYvK9CIm6i6uFEghKqNJFLTQp2DjoDLxnYILlhScLVSmcaagjw8KdFSoRsEMSwp0VEinYIZAZsJDhaZMGC04Z36qD1ChrsFPugOcDP5VG6JCzpl/GV0Alsc/pACVukb8w7MAmI2dbZBUmwEqFtxUkoa9agD/AhfTQfhIf4XcAAAAAElFTkSuQmCC" />
                    </Button>
                    <Drawer classes={{ paper: classes.drawerPaper, }} open={this.state.right} onClose={this.toggleDrawer('right', false)}>
                        <div className={classes.inner} >
                            <div className={classes.top}>
                                <div className={classes.colorTwo} />
                                <div className={classes.closet} onClick={this.toggleDrawer('right', false)}>
                                    <span className={classes.closetLineOne} />
                                    <span className={classes.closetLineTwo} />
                                </div>
                                <p className={classes.topText}>Моя коллекция</p>
                                <div>
                                    <span />
                                </div>
                            </div>
                            <CustomMenuTabs data={this.props.data} />
                        </div>
                    </Drawer>
                </div>
            </MuiThemeProvider>
        );
    }
}

export default withStyles(styles)(CustomMenu);