// import paypal from 'paypal-checkout';
import React from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import './App.css';

const paypal = window.paypal;
let PayPalButton = paypal.Button.driver('react', { React, ReactDOM });

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      client: {
        sandbox: 'ATk7Mdlwfm7mGgvwxwVe18UAV3F3HmnhPcXSFdFnhNTAPDQ5cCE9MkiaXi7Gi8-ooUfeuZM4PgeN3gvd'
      },
      env: 'sandbox',
      funding: { disallowed: [paypal.FUNDING.CARD, paypal.FUNDING.CREDIT] },
      commit: true,
      style: {
        layout: 'vertical',
        maxbuttons: 2,
        size: 'responsive',
        shape: 'rect'
      }
    };
  }

  payment = (data, actions) => {
    return actions.payment.create({
      payment: {
        transactions: [
          {
            amount: { total: '1.00', currency: 'USD' }
          }
        ]
      }
    });
  };

  onAuthorize = (data, actions) => {
    return actions.payment.execute().then(function() {
      window.alert('Payment Complete!');
    });
  };

  onCancel = (data, actions) => {
    window.alert('Payment Cancelled');
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div className="App-intro">
          <PayPalButton
            commit={this.state.commit}
            env={this.state.env}
            client={this.state.client}
            style={this.state.style}
            funding={this.state.funding} // - commented out due to bug in paypal
            payment={this.payment}
            onAuthorize={this.onAuthorize}
            onCancel={this.onCancel}
          />
        </div>
      </div>
    );
  }
}

export default App;
