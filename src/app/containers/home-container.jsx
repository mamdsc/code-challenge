import React, { Component } from 'react';
import { AddTransaction } from '../components/add-transactions/add-transaction';
import { ListTransactions } from '../components/list-transactions/list-transactions';
import { BalanceTransactions } from '../components/balance-transactions/balance-transactions';
import { transactionService } from '../../services/transactions-service';
import './home-container.css';
import currency from 'currency.js';

class HomeContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      description: "",
      value: "",
      sum: 0,
      transactions: []
    }
  }

  componentDidMount() {
   this.getTransactions()
  }

  getTransactions = () => {
    const transactions = transactionService.getTransaction();
    if (transactions) {
      const sum = this.sum(transactions);
      this.setState({ transactions, sum });
    }
  }
  
  setDescription = (e) => {
      this.setState({
        description: e.target.value
      })
  }

  setValue = (e) => {
    this.setState({
      value: e.target.value
    })
  }
  
  submitTransaction = (e) => {
    const { transactions, description, value } = this.state;

    e.preventDefault();
    if (this.validate() === false) return;

    let newTransactions = [
      ...transactions,
      {
        description: description,
        value: value,
        date: new Date()
      }
    ];

    newTransactions = this.order(newTransactions);
    const sum = this.sum(newTransactions);

    this.setState({
      transactions: newTransactions,
      sum
    }, () => {
        transactionService.setTransaction(this.state.transactions);
    })
  }

  validate = () => {
    const { description, value } = this.state;

    if (description === null || description === undefined || description <= 0) {
      alert("Por favor preencha a descrição");
      return false;
    }

    if (value === null || value === undefined || value <= 0) {
      alert("Por favor preencha o valor da transação");
      return false;
    }
  };

  sum = (transactions) => {
    var x = transactions.map(t => currency(t.value, {separator: '.', decimal: ','}).value);
    return x.reduce((currentValue, item) => {
      return currentValue += item
    }, 0);
  }

  cleanTransactions = (e) => {
    e.preventDefault();
    transactionService.clearTransaction();
    this.setState({
      sum: 0,
      transactions: []
    });
  }

  removeTransaction = (index) => {
    const { transactions } = this.state;
    transactions.splice(index, 1);
    const sum = this.sum( transactions );

    this.setState({
      transactions,
      sum
    },
      () => transactionService.setTransaction(transactions)
    );
  }

  order = (transactions) => {    
   return transactions.sort((a, b) => {
      return new Date(b.date) - new Date(a.date);
    });
  }

  render() {
    const { value, description, sum, transactions } = this.state;
    return (
        <div id='body-container'>
        <div id='left-container'>
            <AddTransaction
              description={description}
              value={value}
              setDescription={this.setDescription}
              setValue={this.setValue}
              submitTransaction={this.submitTransaction}
            />
          </div>
          <div id='right-container'>
            <BalanceTransactions
              sum={sum}
              cleanTransactions={this.cleanTransactions}
            />
          </div>
          <div id='right-container'>
            <ListTransactions
              transactions={transactions}
              removeTransaction={this.removeTransaction}
            />
          </div>
        </div>
    );
  }
}

export { HomeContainer };