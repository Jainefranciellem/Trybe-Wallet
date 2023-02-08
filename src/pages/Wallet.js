import React from 'react';
import Header from '../components/Header';
import WalletForm from '../components/WalletForm';
import Table from '../components/Table';
import '../style/Wallet.css';

class Wallet extends React.Component {
  render() {
    return (
      <div className="mainWallet">
        <div className="containerBranco">
          <Header />
          <WalletForm />
        </div>
        <div className="containerAzul">
          <Table />
        </div>
      </div>
    );
  }
}

export default Wallet;
