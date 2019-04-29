import React from 'react';
import './list-transaction.css';
import PropTypes from 'prop-types';
import { distanceInWords } from 'date-fns';
import pt from 'date-fns/locale/pt';

const ListTransactions = (props) => (
    <React.Fragment>
        <div id="list-container">
            <h1>Transações efetuadas</h1>
            <div id="teste">
            <ul>
                {props.transactions.map((t, index) => (
                    <li key={index}>
                        <strong>{t.description} - {t.value}</strong>
                        <span>há{""} {distanceInWords(t.date, new Date(), { locale: pt })}</span>
                        <button onClick={() => props.removeTransaction(index)}>x</button>
                    </li>
                ))}
            </ul>
            </div>
        </div>
    </React.Fragment>
);

ListTransactions.propTypes = {
    transactions: PropTypes.array,
    removeTransaction: PropTypes.func
}

export { ListTransactions };
