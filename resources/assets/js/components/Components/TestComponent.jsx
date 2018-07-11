import React, { PureComponent } from "react";
// import { withStyles } from 'material-ui/styles';

import ProgressiveImage from 'react-progressive-image';

const styles = {
    imageStyle: {
        width: '600px',
        transition: 'filter 1s ease',
    },

};


export default class TestComponent extends PureComponent {
    constructor(props){
        super(props);
    }

    render() {
        const src = '/images/test/o.jpg';
        const preview = '/images/test/o2.jpg';
        return (
            <ProgressiveImage src={src} placeholder={preview}>
                {(image, loading) => (
                    <img style={
                        Object.assign({},
                            styles.imageStyle,
                            {filter: loading ? 'blur(10px)' : 'blur(0.3px)',}
                        )
                    } src={image}/>
                )}
            </ProgressiveImage>
        );
    }
}