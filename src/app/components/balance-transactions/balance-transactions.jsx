import React from 'react';
import './balance-transaction.css';
import PropTypes from 'prop-types';

const BalanceTransactions = (props) => (
    <div id='balance-container'>
        <form>
            <h1>Total {
                props.sum.toLocaleString("pt-BR", {
                    style: "currency",
                currency: "BRL"
                })
            }
            </h1>
            <button onClick={props.cleanTransactions}>Limpar transações</button>
        </form>
    </div>
);

BalanceTransactions.propTypes = {
    sum: PropTypes.number,
    cleanTransactions: PropTypes.func
}

export { BalanceTransactions };
