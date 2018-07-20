import React, { PureComponent } from "react";
import _ProgressiveImage from 'react-progressive-image';
import PropTypes from 'prop-types';

const styles = {
    imageStyle: {
        transition: 'filter 1s cubic-bezier(0.25, 0.1, 0.59, 2.06)',
        // transformStyle: 'preserve-3d',
        // '-webkit-transition': 'filter 0.5s ease',
    },
    imageContainer: {
        // backfaceVisibility: 'hidden',
        overflow: 'hidden',
        // transformStyle: 'preserve-3d',
        // transform: 'translate3d(0,0,0)',
    },
};

class ProgressiveImage extends PureComponent {
    constructor(props){
        super(props);
    }

    render() {
        const { src, preview, alt, className, style, type } = this.props;
        return (
            <_ProgressiveImage src={src} placeholder={preview}>
                {(image, loading) => (
                    type !== 'div'
                        ? <div style={styles.imageContainer}>
                            <img style={Object.assign({},
                                    style,
                                    styles.imageStyle,
                                    // {filter: loading ? 'blur(10px)' : 'blur(0.3px)'}
                                    {filter: loading ? 'blur(1rem)' : 'blur(0)'}
                                )}
                                src={image}
                                alt={alt}
                                className={className}
                            />
                        </div>
                        : <div style={Object.assign({},
                                    style,
                                    styles.imageStyle,
                                    // {filter: loading ? 'blur(10px)' : 'blur(0.3px)'},
                                    {filter: loading ? 'blur(1rem)' : 'blur(0)'},
                                    {backgroundImage:`url('${src}')`},
                                )}
                            className={className}
                        ></div>
                )}
            </_ProgressiveImage>
        );
    }
}

ProgressiveImage.propTypes = {
    src: PropTypes.string.isRequired,
    preview: PropTypes.string,
    className: PropTypes.string,
    alt: PropTypes.string,
    style: PropTypes.object,
    type: PropTypes.string, //default is <img>, set div for <div style="background: '...'">
};

export default ProgressiveImage;