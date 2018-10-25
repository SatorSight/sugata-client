import React, { Component } from 'react'

const style = {
    input: {
        backgroundColor: '#FFFFFF',
        border: 'solid 1px #8C8C8C',
        fontSize: '18px',
        color: '#000000',
        borderRadius: '1px',
        padding: '0.5em',
        width: '70%',
        marginBottom: '1em',
    },
    container: {
        display: 'flex',
        justifyContent: 'center',
    },
};

export default class TagSearch extends Component {
    constructor(props){
        super(props);
    }

    change = e => this.props.set_phrase(e.target.value);

    render() {
        return (
            <div style={style.container}>
                <input
                    placeholder="Начните, а мы подскажем"
                    style={style.input}
                    onChange={this.change}
                    type="text"
                    value={this.props.phrase}
                />
            </div>
        );
    }
}