import React, { PureComponent } from "react";
import _ProgressiveImage from 'react-progressive-image';

const styles = {
    imageStyle: {
        transition: 'filter 1s ease',
    },
};

export default class ProgressiveImage extends PureComponent {
    constructor(props){
        super(props);

        /*
        * src
        * preview
        * className
        * alt
        * style
        * type
        * */
    }

    render() {
        const { src, preview, alt, className, style, type } = this.props;

        return (
            <_ProgressiveImage src={src} placeholder={preview}>
                {(image, loading) => (
                    type !== 'div' ? <img style={
                        Object.assign({},
                            style,
                            styles.imageStyle,
                            {filter: loading ? 'blur(10px)' : 'blur(0.3px)'}
                        )
                    }
                         src={image}
                         alt={alt}
                         className={className}
                    />
                        : <div
                        style={
                            Object.assign({},
                                style,
                                styles.imageStyle,
                                {filter: loading ? 'blur(10px)' : 'blur(0.3px)'},
                                {backgroundImage:`url('${src}')`},
                            )
                        }
                        className={className}
                    ></div>
                )}
            </_ProgressiveImage>
        );
    }
}