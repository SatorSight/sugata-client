import React, { Component } from 'react'
import { connect } from 'react-redux';
import Header from '../Components/Header';
import { withStyles } from 'material-ui/styles';
import Footer from '../Components/Footer';
import Button from 'material-ui/Button';

const mapStateToProps = state => ({
    loading: state.server.loading,
});

const font = {
    fontFamily: 'Montserrat',
    fontSize: '1em',
};

const styles = {
    container: {
        display: 'flex',
        justifyItems: 'center',
        margin: '1em 0 1em 0'
    },
    product: {
        ...font,
        textAlign: 'center',
    },
    product_title: {
        ...font,

    },
    product_price: {
        ...font,

    },
    product_button: {
        height: '100px',
        width: '100px'
    },
};

class PayPage extends Component {
    constructor(props){
        super(props);

        this.state = {
            products: [],
        };

        const bundle_id = props.match.params.bundle_id;

        fetch(`/api/pay/get/${bundle_id}`, {credentials: 'include'})
            .then(r => r.json())
            .then(products => this.setState({ products }));

    }

    pay = product_id => {
        alert('//todo Redirect to payment system here...')

        // const payload = {
        //     apikey: 'd706daed7af9895a95356e72570496d5',
        //     login: '79167353880',
        //     amount: '1',
        //     description: 'desc',
        // };
        //
        // fetch(`https://api.life-pay.ru/v1/bill`,
        //     {
        //         method: 'POST',
        //         body: payload,
        //         credentials: 'include'
        //     })
        //     .then(res => res.json())
        //     .then(data => {
        //         console.log('---');
        //         console.log(data);
        //         console.log('---');
        //     });
    };

    render() {
        const { classes } = this.props;

        return (
            !this.props.loading && <div>
                <Header />
                <div className={classes.container}>
                    {this.state.products.map(product =>
                        <div className={classes.product} key={`product_${product.id}`}>
                            <div className={classes.product_title}>{product.title}</div>
                            <br/>
                            <div className={classes.product_price}>{product.price} руб.</div>
                            <Button onClick={() => this.pay(product.id)}>
                                Оплатить
                            </Button>
                        </div>
                    )}
                </div>
                <Footer />
            </div>
        );
    }
}

export default connect(mapStateToProps)(withStyles(styles)(PayPage));