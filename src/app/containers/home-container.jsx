import React, { Component } from 'react';
import { AddTransaction } from '../components/add-transactions/add-transaction';
import { ListTransactions } from '../components/list-transactions/list-transactions';
import { BalanceTransactions } from '../components/balance-transactions/balance-transactions';
import { transactionService } from '../../services/transactions-service';
import './home-container.css'

class HomeContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      description: '',
      value: undefined,
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
      this.setState( { transactions }, () => 
      this.sum()
      );
    }
  }
  
  setDescription = (e) => {
      this.setState({
        description: e.target.value
      })
  }

  setValue = (e) => {
    this.setState({
      value: Number(e.target.value)
    })
  }
  
  submitTransaction = (e) => {
    e.preventDefault();

    const { description, value } = this.state;

    if (description === null || description === undefined || description <= 0) {
      alert('Por favor preencha a descrição');
      return;
    }

    if (value === null ||value === undefined || value <= 0) {
      alert('Por favor preencha o valor da transação');
      return;
    }

    let nova = [
      ...this.state.transactions,{
      description: this.state.description,
      value: this.state.value,
      date: new Date()
    }];

   nova = this.order(nova);

   console.log(nova);

    this.setState({
      transactions: nova
    }, () => {
        this.sum();
        transactionService.setTransaction(this.state.transactions);
    })
  }

  sum = () => {
    const sum = this.state.transactions.reduce((currentValue, item) => {
      return currentValue += item.value
    }, 0);
    this.setState({
      sum 
    })
  }

  cleanTransactions = () => {
    transactionService.clearTransaction();
  }

  removeTransaction = (index) => {
    const { transactions } = this.state;
    transactions.splice(index, 1);
    this.setState({
      transactions: transactions
    })
    transactionService.setTransaction(transactions);
    this.sum();
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